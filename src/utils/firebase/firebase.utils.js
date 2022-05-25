import { initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBwj4LxCTHv5Lp2Qbd1rAY2XdY52GXRJVM",
    authDomain: "practice-crown-db.firebaseapp.com",
    projectId: "practice-crown-db",
    storageBucket: "practice-crown-db.appspot.com",
    messagingSenderId: "281817003295",
    appId: "1:281817003295:web:86f966a1876ad9fe322c2a"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);


  
  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInwithGooglePopup = () => signInWithPopup(auth, provider);





  export const db = getFirestore();


  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users' , userAuth.uid);
      console.log(userDocRef);
      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());

      
      if (!userSnapshot.exists()) {

        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
        await setDoc(userDocRef, {displayName, email, createdAt});
        }
        catch(error) {
            console.log('error creating the user' , error.message);
        }
      }
      return userDocRef;


  }



