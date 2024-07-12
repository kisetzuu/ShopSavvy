import { getFirestore, doc, setDoc } from "firebase/firestore"; 

//Account Creation
export const accountCreation = async (user) => {
    const db = await getFirestore();
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

//export const profileEdit = async ()