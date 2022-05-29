
import { initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {getFirestore,collection,writeBatch, doc, getDoc, setDoc, query,getDocs} from 'firebase/firestore'


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



  export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd,
    
  ) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
    
    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });
  
    await batch.commit();
    console.log('done');
  };


  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=> {
      const {title, items} = docSnapshot.data()
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
    
    return categoryMap;

   }








  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
      const userDocRef = doc(db, 'users' , userAuth.uid);
      console.log(userDocRef);
      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());

      
      if (!userSnapshot.exists()) {

        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
        await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        }
        catch(error) {
            console.log('error creating the user' , error.message);
        }
      }
      return userDocRef;


  }



  export const createAuthUserwithEmailandPassword = async (email, password) => {

    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

    

  }


  
  export const SignInAuthUserwithEmailandPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);

  }



  export const signOutUser  = async () => await signOut(auth);



  export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback );
  }






