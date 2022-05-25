import { signInwithGooglePopup , createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const Signin = () => {

   


    const logGooglePopupUser = async () => {
        const {user} = await signInwithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return (
        <div>
            <h1>This is sign in page</h1>
            <button onClick={logGooglePopupUser}>Sign in with google popup</button>
        
        <SignUpForm/>
        </div>
    )   




}

export default Signin;