import FormInput from "../form-input/form-input.component"
import Button from "../Button/button.components"
import { useState } from "react"
import './sign-in-form.style.scss'
import { signInwithGooglePopup  , SignInAuthUserwithEmailandPassword} from "../../utils/firebase/firebase.utils";


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
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with you email and password </span>


            <form onSubmit={handleSubmit}>
            <FormInput label="Email" type='email' required onChange={formhandlechange} name='email' value={email} />
            <FormInput label="Password" type='password' required onChange={formhandlechange} name='password' value={password} />

            <div className="buttons-container">
            <Button  type="submit">SIGN IN</Button>
            <Button  type = 'button' buttonType='google' onClick={SignInwithGoogle}> Google sign in</Button>
            </div>
            </form>
            





        </div>




    )


    
}



export default SignInForm