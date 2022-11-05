import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import iconSvg from './iconSvg.png';
import './Header.css'
import Button from 'react-bootstrap/Button';

export const Header=()=> {
  let Headerstyle={
    
    color:"white",
    font: "16px Montserrat, sans-serif"
  }
  let Headerhead={
    color:"white",
    font: "30px Montserrat, sans-serif"
  }
  let HeaderButton={
    color:"red",
    font: "16px Montserrat, sans-serif"
  }

  return (
    <html>
      <head>
        <link rel="stylesheet" href="styles.css"></link>
      </head>
      <body>
      <Navbar collapseOnSelect expand="lg" className="color-nav" sticky="top"> 
      <Container>
        <img src={iconSvg} alt="Icon SVG" width="5%" height="5%"/>
        <Navbar.Brand className="navbar-brand" href="#home" color="white" style={Headerhead}>BloodX</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav >
          <Nav.Link className="navbar-link" href="#home" style={Headerstyle}>Home</Nav.Link>
          <Nav.Link className="navbar-link" href="#about" style={Headerstyle}>About Us</Nav.Link>
          <Nav.Link className="navbar-link" href="#contact" style={Headerstyle}>Contact Us</Nav.Link>
          <Nav.Link className="navbar-link" href="#donorlist" style={Headerstyle}>Donor List</Nav.Link>
          <Nav.Link className="navbar-link" href="#searchdonor" style={Headerstyle}>Search Donor</Nav.Link>
          <Nav.Link className="navbar-link" href="#admin" style={Headerstyle}>Admin</Nav.Link>
          <Button className="button" variant="light" style={HeaderButton}> Login</Button>{' '}
            {/* <NavDropdown className="navbar-dropdown" title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item className="navbar-dropdown-item" href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item color="red" className="navbar-dropdown-item" href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="navbar-dropdown-item" href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </body>
    
    </html>
    
  )
}

export default Header;




