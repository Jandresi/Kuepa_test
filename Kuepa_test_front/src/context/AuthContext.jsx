import { createContext, useCallback, useState, useEffect } from "react";
import { apiUrl, postData } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Variables de sección de registro
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Variables de sección de login
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    // Asignamos constantemente la variable del localStorage a la que leemos en los componentes por si hay recargas
    useEffect(() => {
        const user = localStorage.getItem('User');
        setUser(JSON.parse(user));
    }, [])

    // Actualizamos el formulario de registro cuando sea el caso
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    // Actualizamos el formulario de login cuando sea el caso
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);


    // Función de crear usuario nuevo. Nos asigna inmediatamente los datos al localstorage
    const registerUser = useCallback(async(event) => {
        event.preventDefault();
    
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postData(
            `${apiUrl}/login/createUser`,
            registerInfo
        );
        setIsRegisterLoading(false);
        
        if(response.error) return setRegisterError(response.message);

        localStorage.setItem('User', JSON.stringify(response));
        setUser(response);
        resetFormsLogin();
    }, [registerInfo]);


    // Función para iniciar sesión
    const loginUser = useCallback(async (event) => {
        event.preventDefault();
    
        setIsLoginLoading(true);
        setRegisterError(null);

        const response = await postData(
            `${apiUrl}/login/loginUser`,
            loginInfo
        );

        setIsLoginLoading(false);
        if(response.error) return setLoginError(response.message);

        localStorage.setItem('User', JSON.stringify(response));
        setUser(response);
        resetFormsLogin();
        
    }, [loginInfo])


    // Función que cierra la sesión. Elimina los datos del usuario del navegador
    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
    });

    // Reiniciar los formularios de login y de registro
    const resetFormsLogin = () => {
        setRegisterInfo({
            name: '',
            email: '',
            password: '',
        });
        setLoginInfo({
            email: '',
            password: '',
        });
        setRegisterError(null);
        setLoginError(null);
    }

    // Objeto del AuthContext con los datos de usuario que se puede leer desde todos los componentes
    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            logoutUser,
            loginError,
            isLoginLoading,
            loginInfo,
            updateLoginInfo,
            loginUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}