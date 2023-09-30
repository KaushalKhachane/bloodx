import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import iconSvg from './iconSvg.png';
import './Header.css'
import Button from 'react-bootstrap/Button';
import AdminDashboard from './AdminDashboard';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRightOnRectangleIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon  } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/solid";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate("");
  let Headerstyle={
    paddingRight:"50px",
    color:"white",
    font: "16px Montserrat, sans-serif"
  }
  let Headerhead={
    color:"white",
    font: "30px Montserrat, sans-serif",
    cursor: "pointer"
  }
  let HeaderButton = {
    color: "white",
    font: "16px Montserrat, sans-serif",
    backgroundColor: "transparent",
    boxShadow:"0px 0px 0px 0px white",
    borderColor:"white",
  };

  return (
    <html>
      <head>
        <link rel="stylesheet" href="styles.css"></link>
      </head>
      <body>
        <Navbar
          collapseOnSelect
          expand="lg"
          className="color-nav"
          sticky="top"
          style={{
            boxShadow: "inset 0px -5px 5px -5px rgba(0, 0, 0, 1.0)",
            position: "fixed",
            width: "100%",
            marginBottom: "20px",
            background:
              "linear-gradient(to bottom right,rgba(100,0,0,1), rgba(255,0,0,1) ,rgba(100,0,0,1))",
          }}
        >
          <Container>
            <img src={iconSvg} alt="Icon SVG" width="5%" height="5%" />
            <Navbar.Brand
              className="navbar-brand"
              color="white"
              style={Headerhead}
              onClick={() => navigate("/")}
            >
              BloodX
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link
                  className={`navbar-link ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  style={Headerstyle}
                  onClick={() => navigate("/")}
                >
                  <HomeIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      marginTop: "-5px",
                      marginRight: "10px",
                    }}
                  />
                  Home
                </Nav.Link>
                {/* <Nav.Link className={`navbar-link ${location.pathname === '/' ? 'active-link' : ''}`} href="#about" style={Headerstyle}>About Us</Nav.Link>
          <Nav.Link className={`navbar-link ${location.pathname === '/' ? 'active-link' : ''}`} href="#contact" style={Headerstyle}>Contact Us</Nav.Link> */}
                <Nav.Link
                  className={`navbar-link ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => navigate("/about_us")}
                  style={Headerstyle}
                >
                  <InformationCircleIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      marginTop: "-5px",
                      marginRight: "10px",
                    }}
                  />
                  About Us
                </Nav.Link>
                <Nav.Link
                  className={`navbar-link ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => navigate("/contact_us")}
                  style={Headerstyle}
                >
                  <PhoneIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      marginTop: "-5px",
                      marginRight: "10px",
                    }}
                  />
                  Contact
                </Nav.Link>
                {/* <Nav.Link className={`navbar-link ${location.pathname === '/' ? 'active-link' : ''}`} href="#searchdonor" style={Headerstyle}>Search Donor</Nav.Link> */}
                {/* <Nav.Link
                  className={`navbar-link ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => navigate("/adminlogin")}
                  style={Headerstyle}
                >
                  <UserCircleIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      marginTop: "-5px",
                      marginRight: "10px",
                    }}
                  />
                  Admin
                </Nav.Link> */}
                <Button
                  className="button"
                  onClick={() => navigate("/login_options")}
                  style={HeaderButton}
                >
                  <ArrowRightOnRectangleIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      marginTop: "-5px",
                      marginRight: "10px",
                    }}
                  />
                  Login
                </Button>
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
  );
}

export default Header;




