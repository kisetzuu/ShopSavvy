import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Image } from 'react-bootstrap';
import { auth } from '../../../services/FirebaseConfig';
import { AuthContext, ProfileContext, CartContext } from '../../../services/Contexts';
import './AccountDropDown.css'; // Make sure to import the CSS file

const AccountDropDown = () => {
  const { user } = useContext(AuthContext);
  const { profilePicture } = useContext(ProfileContext);
  const { balance } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Dropdown.Menu show>
      <Dropdown.ItemText>
        <Image
          src={profilePicture || `${process.env.PUBLIC_URL}/account.png`}
          alt="Profile"
          roundedCircle
          fluid
        /> {user.email}
      </Dropdown.ItemText>
      <Dropdown.Item onClick={() => handleNavigation('/payment-portal')}><strong>Current Balance: </strong>${balance}</Dropdown.Item>
      <Dropdown.Item onClick={() => handleNavigation('/account/general')}>Settings</Dropdown.Item>
      <Dropdown.Item className="dropdown-item-user-listings" onClick={() => handleNavigation('/user-listings')}>User Listings</Dropdown.Item>
      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  );
}

export default AccountDropDown;
