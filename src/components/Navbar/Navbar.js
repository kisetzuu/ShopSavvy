import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Image, Dropdown, Container } from 'react-bootstrap';
import { auth } from '../../services/FirebaseConfig';
import { CartContext } from '../../CartContext';
import { AuthContext } from '../../services/AuthServices/AuthContext';
import { ProfileContext } from '../../services/UserServices/ProfilePictureContext';
import './Navbar.css';
import AccountDropDown from './AccountDropDown/AccountDropDown';

const NavigationBar = () => {
  const { user } = useContext(AuthContext);
  const { profilePicture } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const handleProfileClick = () => {
    setShowProfileSettings(!showProfileSettings);
  };

  return (
    <Navbar expand="lg" fixed="top" className="navigation-main-div">
      <Container fluid>
        <Navbar.Brand className="order-2 order-lg-1 ml-lg-auto margin-p5vw">
          <Image
            src={`${process.env.PUBLIC_URL}/ShopSavvy_Logo.png`}
            alt="ShopSavvy Logo"
            width="64"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-1 margin-2vw" />
        <Navbar.Collapse id="basic-navbar-nav" className="order-3 order-lg-1 margin-2vw">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/support">Support</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        
        <Nav className="ml-auto order-3 order-lg-2 navigation-section-2 margin-2vw">
          {user ? (
            <Dropdown alignRight show={showProfileSettings} onToggle={handleProfileClick}>
              <Dropdown.Toggle id="dropdown-basic" className="background-transparent">
                <Image
                  src={profilePicture || `${process.env.PUBLIC_URL}/account.png`}
                  alt="Profile"
                  roundedCircle
                  width="40"
                  height="40"
                />
              </Dropdown.Toggle>
              <AccountDropDown />
            </Dropdown>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
