import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NavBar = () => {
    const {user, logoutUser} = useContext(AuthContext);

    const getOptionsMenu = () => {
        let options = <>
            <Link to={"/login"} className="link-light text-decoration-none">Iniciar sesión</Link>
            <Link to={"/register"} className="link-light text-decoration-none">Registrarse</Link>
        </>
        if(user) options = <Link to={"/login"} onClick={() => logoutUser()} className="link-light text-decoration-none">Cerrar sesión</Link>

        return options;
    }

    return (
        <Navbar bg="dark" className="mb-3" style={{height: '7vh'}}>
            <Container>
                <h2><Link to={"/"} className="link-light text-decoration-none">Kuepa</Link></h2>
                {user && <span className="text-warning">¡Hola {user?.name.split(' ')[0] || 'estudiante'}!</span>}
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {getOptionsMenu()}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;