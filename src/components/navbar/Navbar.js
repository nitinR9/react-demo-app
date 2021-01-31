import React, { Component } from 'react' ;
import { Navbar, Nav, Container, Image } from 'react-bootstrap' ;
import { CaretDownFill } from 'react-bootstrap-icons' ;
import logo from '../../images/logo192.png' ;

class NavbarComponent extends Component{
    render(){
        return (
            <Navbar collapseOnSelect className="Navbar" expand="sm" variant="dark" fixed="top">
                <Navbar.Brand className="Text-Style ml-2">AI Playground</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-nav" />
                <Navbar.Collapse id="responsive-nav">
                    <Nav className="ml-auto Text-Style-2">
                        <Container className="pr-0">
                            <Nav.Link>Learn AI</Nav.Link>
                            <Nav.Link>Docs</Nav.Link>
                            <Nav.Link><Image src={logo} className="navbar-avatar" rounded />Account <CaretDownFill /></Nav.Link>
                        </Container>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        ) ;
    }
}
    
export default NavbarComponent ;