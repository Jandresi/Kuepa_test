import { createContext, useCallback, useState, useEffect } from "react";
import { apiUrl, postData, getData } from "../utils/services";
import { io } from 'socket.io-client'

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatError, setUserChatError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(true);
    const [messagesError, setMessagesError] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    // Inicializamos el socket
    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])

    // Añadimos el usuario a la lista del socket
    useEffect(() => {
        if(!socket) return;
        socket.emit('addNewUser', user?._id);
    }, [socket])

    // Obtenemos el chat que tiene moderador
    useEffect(() => {
        const getUserChats = async() => {
            if(user?.id) {
                setIsUserChatLoading(true);
                const response = await getData(`${apiUrl}/chat/getUserChats/${user.id}`);
                if(response.error) return setUserChatError(response.error);
                setUserChats(response[0]);
                setIsUserChatLoading(false);
            }
        }
        getUserChats();
    }, [user])

    // Obtenemos los mensajes de dicho chat
    useEffect(() => {
        const getMessages = async() => {
            if(userChats?._id) {
                setIsMessagesLoading(true);
                const response = await getData(`${apiUrl}/chat/getMessages/${userChats._id}`);
                if(response.error) return setMessagesError(response.error);
                setMessages(response);
                setIsMessagesLoading(false);
            }
        }
        getMessages();
    }, [userChats])

    useEffect(() => {
        if(!socket) return;
        socket.on('getMessages', (message) => {
            if(message) setMessages((prev) => [...prev, message]);
        });
    }, [socket])

    // Enviamos el mensaje y actualizamos el socket
    const sendTextMessage = useCallback(async(event, textMessage, userId, setTextMessage) => {
        event.preventDefault();
        if(!textMessage) return;
        const response = await postData(`${apiUrl}/chat/sendMessage`, {textMessage, userId, chatId: userChats._id});
        if(response.error) return setMessagesError(response.error);
        
        setNewMessage(response[0]);
        setTextMessage('');
    }, [messages])

    useEffect(() => {
        if(!socket) return;
        socket.emit('sendMessage', newMessage);
    }, [newMessage]);

    return (
        <ChatContext.Provider
        value={{
            userChats,
            isUserChatLoading,
            userChatError,
            messages,
            isMessagesLoading,
            messagesError,
            sendTextMessage,
        }}>
            {children}
        </ChatContext.Provider>
    )
}