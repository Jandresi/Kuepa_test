import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Button, Card, CardBody, CardFooter, CardHeader, Container, Form, FormControl, Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import MessageCard from "../../components/MessageCard";

const Chat = () => {
    const {user} = useContext(AuthContext);
    const {messages, isMessagesLoading, sendTextMessage} = useContext(ChatContext);
    const [textMessage, setTextMessage] = useState('');

    useEffect(() => {
        const card = document.getElementById('cardMensajes');
        card.scrollTop = card.scrollHeight;
    }, [messages])
    
    return (
        <Card className="w-100 h-100" style={{maxHeight: '400px'}}>
            <CardHeader><Card.Title>Chat grupal</Card.Title></CardHeader>
            <CardBody style={{overflowY: 'auto'}} id="cardMensajes">
                {isMessagesLoading && 'Cargando mensajes...'}
                {(!messages.length && !isMessagesLoading)  && 'Aún no hay mensajes'}
                {messages.map((message,idx) => <MessageCard
                    name={message.userId.name}
                    timestamp={message.createdAt}
                    message={message.textMessage}
                    moderator={message.userId.moderator}
                    key={'mensaje'+idx} />)}
            </CardBody>
            <CardFooter>
                <Form className="row g-3" onSubmit={(event) => sendTextMessage(event, textMessage, user.id, setTextMessage)}>
                    <FormControl type="text" placeholder="Escriba un mensaje..." className="col" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
                    <Button type="submit" variant="primary" className="col-3 col-lg-2">Enviar</Button>
                </Form>
            </CardFooter>
        </Card>
    );
}
 
export default Chat;