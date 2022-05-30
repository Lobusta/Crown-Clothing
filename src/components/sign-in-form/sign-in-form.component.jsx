import FormInput from "../form-input/form-input.component"
import Button , {Button_type_classes} from "../Button/button.components"
import { useState } from "react"
import { signInwithGooglePopup  , SignInAuthUserwithEmailandPassword} from "../../utils/firebase/firebase.utils";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.style";


const defaultFormFields = {
    email: '',
    password: '',   
}

const SignInForm = () => {

    const [formfields, setformfields] = useState(defaultFormFields);
    const {  email, password } = formfields;

  




    const SignInwithGoogle = async () => {
         await signInwithGooglePopup();
        

    }


    
    const resetFormfields = () => {
        
        setformfields(defaultFormFields);
    } 



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
         await SignInAuthUserwithEmailandPassword(email, password);
         resetFormfields();
        }
        catch (error) {
            switch (error.code) {
              case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
              case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
              default:
                console.log(error);
            }
        }


    }


    const formhandlechange = (event) => {

        const { name, value } = event.target;

        setformfields({ ...formfields, [name]: value });

    };


    return(
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with you email and password </span>


            <form onSubmit={handleSubmit}>
            <FormInput label="Email" type='email' required onChange={formhandlechange} name='email' value={email} />
            <FormInput label="Password" type='password' required onChange={formhandlechange} name='password' value={password} />

            <ButtonsContainer>
            <Button  type="submit">SIGN IN</Button>
            <Button  type = 'button' buttonType={Button_type_classes.google} onClick={SignInwithGoogle}> Google sign in</Button>
            </ButtonsContainer>
            </form>
            





        </SignInContainer>




    )


    
}



export default SignInForm