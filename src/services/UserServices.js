import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "./FirebaseConfig";

//Account Creation
export const accountCreation = async (user) => {
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
export const fetchProfilePicture = async (user, setProfilePicture) =>{
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

//export const profileEdit = async () h