import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import { auth } from '../../services/FirebaseConfig';
import { AuthContext, CartContext, ProfileContext } from '../../services/Contexts';
import './Navbar.css';

const MobileNavigationBar = () => {
  const { user } = useContext(AuthContext);
  const { profilePicture } = useContext(ProfileContext);
  const { balance } = useContext(CartContext);
  const navigate = useNavigate();
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleToggle = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="navigation-main-div">
      <Container fluid>
        <Navbar.Brand>
          <Image
            src={`${process.env.PUBLIC_URL}/ShopSavvy_Logo.png`}
            alt="ShopSavvy Logo"
            width="64"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav" className={showNavLinks ? 'show' : ''}>
        <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/account" className="custom-hover rounded">
                <Image
                    src={profilePicture || `${process.env.PUBLIC_URL}/default-profile.png`}
                    alt="Profile"
                    roundedCircle
                    className="mobile-margin-custom"
                    width="32"
                    height="32"
                />
                <span className="mobile-margin-custom">{user.email}</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/payment-portal" className="custom-hover rounded"><strong>Current Balance: </strong>${balance}</Nav.Link>
              </>
            ) : (
              <>
              </>
            )}
        </Nav>
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className="custom-hover rounded">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop" className="custom-hover rounded">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about" className="custom-hover rounded">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="custom-hover rounded">Contact</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="custom-hover rounded">Cart</Nav.Link>
            <Nav.Link as={Link} to="/support" className="custom-hover rounded">Support</Nav.Link>
        </Nav>
        <Nav>
            {user ? (
              <>
                <Nav.Link onClick={handleLogout} className="custom-hover rounded">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="custom-hover">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="custom-hover">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MobileNavigationBar;
