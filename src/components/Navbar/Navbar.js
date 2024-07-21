import React, { useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Image, Dropdown, Container } from 'react-bootstrap';
import { AuthContext } from '../../services/AuthServices/AuthContext';
import { ProfileContext } from '../../services/UserServices/ProfilePictureContext';
import './Navbar.css';
import AccountDropDown from './AccountDropDown/AccountDropDown';
import MobileNavigationBar from './MobileNavbar';

const NavigationBar = () => {
  const { user } = useContext(AuthContext);
  const { profilePicture } = useContext(ProfileContext);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleProfileClick = () => {
    setShowProfileSettings(!showProfileSettings);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
        {isMobile ? (
        <MobileNavigationBar />
      ) : (
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
            <Nav.Link as={Link} to="/" className="custom-hover rounded">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop" className="custom-hover rounded">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about" className="custom-hover rounded">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="custom-hover rounded">Contact</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="custom-hover rounded">Cart</Nav.Link>
            <Nav.Link as={Link} to="/support" className="custom-hover rounded">Support</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          
          <Nav className="ml-auto order-3 order-lg-2 navigation-section-2 margin-2vw">
            {user ? (
              <Dropdown alignRight show={showProfileSettings} onToggle={handleProfileClick} className='drop-down-margin-desktop' >
                <Dropdown.Toggle id="dropdown-basic" className="background-transparent">
                  <Image
                    src={profilePicture || `${process.env.PUBLIC_URL}/account.png`}
                    alt="Profile"
                    roundedCircle
                    width="40"
                    height="40"
                  />
                </Dropdown.Toggle>
                <AccountDropDown/>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar> )}
    </>
  );
};

export default NavigationBar;
