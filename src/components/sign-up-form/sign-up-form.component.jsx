import { useState } from "react";
import { createAuthUserwithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmpassword: ''
}


const SignUpForm = () => {
  
  const [formfields, setformfields] = useState(defaultFormFields);
  const {displayName, email, password, confirmpassword} = formfields;
  
  
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
            const {user} = await createAuthUserwithEmailandPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormfields();
            
        }
        catch(error) {
        if (error.code == 'auth/email-already-in-use') {
            alert ('Cannot create user, email already in use')
        }
        else {
        console.log ('error creating user with email and id', error);
        }
    }


    }


    const formhandlechange = (event) => {

        const {name, value} = event.target;
    
        setformfields({ ...formfields, [name]: value});
    
        };


  
    return (
    <div> 
    <h1>Sign up with you email and passowrd </h1>
    <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type='text' required onChange={formhandlechange} name='displayName' value={displayName}/>

        <label>Email</label>
        <input type='email' required onChange={formhandlechange} name='email' value={email}/>

        <label>Password</label>
        <input type= 'password' required onChange={formhandlechange} name='password' value={password}/>

        <label>Confirm Password</label>
        <input type= 'password' required onChange={formhandlechange} name='confirmpassword' value={confirmpassword}/>
        
        <button type="submit">Sign Up</button>
    
    </form>
    </div> 
  )
}

export default SignUpForm; 