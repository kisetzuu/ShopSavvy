import { deleteUser, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth } from './FirebaseConfig';
import { accountCreation } from './UserServices';
import { getAdditionalUserInfo } from 'firebase/auth';


export const handleAuthStateChange = async (setUser, setProfilePicture) => {
  const db = getFirestore();

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().profilePicture) {
        setProfilePicture(userDoc.data().profilePicture);
      } else {
        setProfilePicture(null);
      }
    } else {
      setUser(null);
      setProfilePicture(null);
    }
  });

  return unsubscribe;
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


