import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, fbAuth } from './FirebaseConfig';
import { profileCreation } from './UserServices';
import { getAdditionalUserInfo } from 'firebase/auth';

const handleFacebook = async () => {
  try{
    const userCredential = await signInWithPopup(auth, fbAuth)
    const additionalUserInfo = await getAdditionalUserInfo(userCredential);
    return { userCredential, additionalUserInfo };
  }
  catch(error){
    console.log("handle fb" + error);
  }
};

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

export const handleRegister = async (e, auth, db, email, password, confirmPassword, name, setError, setMessage, navigate) => {
  e.preventDefault();

  if (!email || !password || !confirmPassword) {
    setError('Please fill in all fields.');
    return;
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    await signOut(auth);
    setMessage('Registration successful');
    await navigate('/login');
  } catch (error) {
    setError('Registration failed: ' + error.message);
    console.error('Error during registration:', error);
  }
};

export const handleFBAuth = async (navigate, setError) => {
  try {
    const { userCredential, additionalUserInfo } = await handleFacebook();
    if (additionalUserInfo.isNewUser) {
      await profileCreation(userCredential);
      await navigate('/account');
      window.location.reload();
    } else {
      await navigate('/shop');
    }
  } catch (error) {
    setError('Registration failed: ' + error.message);
  }
};

