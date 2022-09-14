import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../cartWidget/CartWidget';
import Logo from "../../assets/logoplanb.png"
import {Link} from 'react-router-dom'

const NavBar = () => {

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/">
          <img
            alt= "logo"
            src= {Logo}
            width="100"
              height="100"
              className="d-inline-block align-top"
          />{' '}
          </Link>
          
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Link className='nav-link' to="/">home</Link>
            <Link className='nav-link' to="/productos/vino">vinos</Link>
            <Link className='nav-link' to="/productos/cerveza">cervezas</Link>
            <Link className='nav-link' to="/productos/bebida">bebibas</Link>
            <Link className='nav-link' to="/contacto">contacto</Link>
          </Nav>
        </Navbar.Collapse>
        <CartWidget />
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