import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Image, Button } from 'react-bootstrap';
import { auth } from '../../../services/FirebaseConfig';
import { AuthContext } from '../../../services/AuthServices/AuthContext';
import { ProfileContext } from '../../../services/UserServices/ProfilePictureContext';
import { CartContext } from '../../../CartContext';

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
        /> {user.email} <strong>Balance:</strong> ${balance}
      </Dropdown.ItemText>
      <Dropdown.Item onClick={() => handleNavigation('/account/general')}>Settings</Dropdown.Item>
      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  );
}

export default AccountDropDown;