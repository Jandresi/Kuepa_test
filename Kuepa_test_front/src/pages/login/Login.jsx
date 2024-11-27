import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";


const Login = () => {

    const {loginError, isLoginLoading, loginInfo, updateLoginInfo, loginUser} = useContext(AuthContext);
    return (
    <>
    <Form onSubmit={loginUser} autoComplete="on">
        <Row style={{height: '90vh', justifyContent: 'center', alignItems: 'center'}}>
            <Col xs={6}>
                <Stack gap={3}>
                    <h2 className="text-center mb-3">Iniciar sesión</h2>
                    <Form.Control type="email" placeholder="Correo electrónico" onChange={(e)=>updateLoginInfo({...loginInfo, email: e.target.value})} />
                    <Form.Control type="password" placeholder="Contraseña" onChange={(e)=>updateLoginInfo({...loginInfo, password: e.target.value})} />

                    <Button variant="primary" type="submit">{isLoginLoading ? 'Iniciando sesión...' : 'Ingresar'}</Button>

                    {loginError && <Alert variant="danger"><p>{loginError}</p></Alert>}
                </Stack>
            </Col>
        </Row>
    </Form>
    </>
    );
}
 
export default Login;