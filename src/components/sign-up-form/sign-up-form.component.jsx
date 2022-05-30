import { useState } from "react";
import { createAuthUserwithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer } from "./sign-up-form.style";
import Button from "../Button/button.components";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmpassword: ''
}


const SignUpForm = () => {



    const [formfields, setformfields] = useState(defaultFormFields);
    const { displayName, email, password, confirmpassword } = formfields;


    const resetFormfields = () => {
        setformfields(defaultFormFields);
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmpassword) {
            console.log('passowrds didnt match');
            alert("password donot match");
            return;
        }
        try {
            const { user } = await createAuthUserwithEmailandPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
        
            resetFormfields();

        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            }
            else {
                console.log('error creating user with email and id', error);
            }
        }


    }


    const formhandlechange = (event) => {

        const { name, value } = event.target;

        setformfields({ ...formfields, [name]: value });

    };



    return (
        <SignUpContainer >
            <h2>Don't have an account? Sign up!</h2>
            <span>Sign up with you email and password </span>
            <form onSubmit={handleSubmit}>
              
                <FormInput label="Display Name" type='text' required onChange={formhandlechange} name='displayName' value={displayName} />
                <FormInput label="Email" type='email' required onChange={formhandlechange} name='email' value={email} />
                <FormInput label="Password" type='password' required onChange={formhandlechange} name='password' value={password} />
                <FormInput label="Confirm Password" type='password' required onChange={formhandlechange} name='confirmpassword' value={confirmpassword} />

                <Button  type="submit">Sign Up</Button>

            </form>
        </SignUpContainer>
    )
}

export default SignUpForm; 