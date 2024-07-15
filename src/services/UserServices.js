import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db, storage } from "./FirebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//Account Creation
export const accountCreation = async (user) => {
    await sendEmailVerification(user);
    try {
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            address: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            profilePicture: "",
            username: "",
            createdAt:  new Date().toISOString()
        });

        console.log("Profile created successfully");
    } catch (error) {
        console.error("Error creating profile: ", error);
        throw new Error(error);
        
    }
};

//Fetch Profile Picture
export const fetchProfilePicture = async (user, setProfilePicture) => {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().profilePicture) {
        setProfilePicture(userDoc.data().profilePicture);
      } else {
        setProfilePicture(null);
      }
    } else {
      setProfilePicture(null);
    }
  }

export const fetchProfileData = async (user, setProfileData) => {
  if(user) {
    const userDoc = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDoc);
    if (userDocSnapshot.exists()) {
    setProfileData(userDocSnapshot.data()); }
  } else {
    setProfileData(null);
  }
}

export const editProfilePicture = async (user, editPicture, setProfilePicture) => {
  const storageRef = ref(storage, `profilePictures/${user.uid}`); 
  const uploadTask = uploadBytesResumable(storageRef, editPicture);

  try {
    await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await setDoc(doc(db, 'users', user.uid), { profilePicture: downloadURL }, { merge: true });
              setProfilePicture(downloadURL);
              console.log('File available at', downloadURL);
              resolve();
            } catch (error) {
              reject(error);
            }
          });
        }
      );
    });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    throw new Error(error);
  }
};