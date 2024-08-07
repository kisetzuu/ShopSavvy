import { deleteUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, getAdditionalUserInfo, EmailAuthProvider, reauthenticateWithCredential, updatePassword  } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { accountCreation } from './UserServices';

export const handleLogin = async (e, auth, email, password, setError, setMessage, navigate) => {
  e.preventDefault();
  if (!email || !password) {
    setError('Please fill in both fields.');
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setMessage('Login successful');
    navigate('/shop');
  } catch (error) {
    setError('Login failed: ' + error.message);
    console.error('Error during login:', error);
  }
};

export const handleRegister = async (e, auth, email, password, confirmPassword, setError, setMessage, navigate) => {
  e.preventDefault();
  if (!email || !password || !confirmPassword) {
    setError('Please fill in all fields.');
    return;
  }  if (password !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await  accountCreation(user);
    setMessage('Registration successful');
    await sendEmailVerification(user);
    await navigate('/account');
    window.location.reload();
  } catch (error) {
    await setError('Registration failed: ' + error.message);
    console.error('Error during registration:', error);
  }
};

export const handleOtherAuth = async (navigate, setError, currentPage, otherAuth) => {  try {
  const result = await signInWithPopup(auth, otherAuth);
  const user = result.user;
  const additionalUserInfo = getAdditionalUserInfo(result);

  if (currentPage === '/register') {
    if (additionalUserInfo.isNewUser) {
      await accountCreation(user);
      await navigate('/account');
      window.location.reload();
    } else {
      await setError('Registration Failed: Account Already Registered');
      await navigate('/register-error'); 
    }
  } else if (currentPage === '/login') {
    if (!additionalUserInfo.isNewUser) {
      await navigate('/shop');
      window.location.reload();
    } else {
      await navigate('/login-error'); 
      await setError('Login Failed: Account Not Registered');
      await deleteUser(result);
    }
  } 
} catch (error) {
  setError('Authentication failed: ' + error.message);
  await navigate('/' + error.message);
}
};

export const isThirdPartyProvider = (user) => {
  if (!user) return false;

  const providers = user.providerData.map((provider) => provider.providerId);
  return providers.includes('google.com') || providers.includes('facebook.com');
};

export const checkEmailVerification = async (user) => {
  if (!user) return false;

  if (isThirdPartyProvider(user)) {
    return true;
  }

  await user.reload();
  return user.emailVerified;
};

export const handleChangePassword = async (user, currentPassword, newPassword, setError, setCurrentPassword, setNewPassword) => {
  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    setCurrentPassword('');
    setNewPassword('');
    setError(null);
  } catch (error) {
    console.error('Error changing password:', error);
    setError(error.message);
  }
};