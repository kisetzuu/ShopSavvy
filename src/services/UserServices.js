import { getFirestore, doc, setDoc } from "firebase/firestore"; 

export const profileCreation = async (userCredential) => {
    const db = await getFirestore();
   
    try {
        const uid = await userCredential.user.uid;
        const profileData = {
            address: "",
            fullName: "",
            phoneNumber: "",
            profilePicture: "",
            username: ""
        };

        const userDoc = doc(db, "users", uid);
        await setDoc(userDoc, profileData);
        console.log("Profile created successfully");
    } catch (error) {
        console.error("Error creating profile: ", error);
    }
};