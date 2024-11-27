import { useContext } from 'react';
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from '../../context/AuthContext';

const Register = () => {

    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
    return (
    <>
    <Form onSubmit={registerUser}>
        <Row style={{height: '90vh', justifyContent: 'center', alignItems: 'center'}}>
            <Col xs={6}>
                <Stack gap={3}>
                    <h2 className="text-center mb-3">Crear una cuenta</h2>
                    <Form.Control type="email" placeholder="Correo electrónico" onChange={(e)=>updateRegisterInfo({...registerInfo, email: e.target.value})} />
                    <Form.Control type="text" placeholder="Nombre completo" onChange={(e)=>updateRegisterInfo({...registerInfo, name: e.target.value})} />
                    <Form.Control type="password" placeholder="Contraseña" onChange={(e)=>updateRegisterInfo({...registerInfo, password: e.target.value})} />

                    <Button variant="primary" type="submit">{isRegisterLoading ? 'Estamos creando tu cuenta' : 'Registrarse'}</Button>

                    {registerError && <Alert variant="danger"><p>{registerError}</p></Alert>}
                </Stack>
            </Col>
        </Row>
    </Form>
    </>
    );
}
 
export default Register;