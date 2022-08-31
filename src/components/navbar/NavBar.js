import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../cart/CartWidget';
import Logo from "../../assets/logoplanb.png"

const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
          <img
            alt= "logo"
            src= {Logo}
            width="100"
              height="100"
              className="d-inline-block align-top"
          />{' '}
          </Navbar.Brand>
          <CartWidget />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#vinos">Vinos</Nav.Link>
            <Nav.Link href="#cervezas">Cervezas</Nav.Link>
            <Nav.Link href="#bebidas">Bebidas</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

// const NavBar = () =>{
//     return (
//         <nav>
//             <img src= '/assets/logoplanb.jpg'/>
//             <a>Vinos</a>
//             <a>Cervezas</a>
//             <a>Bebidas</a>
//         </nav>
//     )
// }

// export default NavBar