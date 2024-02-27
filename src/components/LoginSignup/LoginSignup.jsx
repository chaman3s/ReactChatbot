import React , {useState} from "react";
import "./LoginSignup.css";
import fi from './firebaseCon';
import { useHistory } from "react-router-dom";


import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile } from "firebase/auth";

import {getDatabase ,ref,set,onValue, push } from 'firebase/database'
import Forget from "./Forget";

let email_icon = require('./Assets/email.png');
let password_icon = require('./Assets/password.png');
let user_icon = require('./Assets/person.png');



const auth = getAuth();

const LoginSignup = () => {

 const[action,setAction] = useState("Login"); 
 const[email,setemail]= useState("");
 const[name,setname]= useState("");
 const[passwd,setpasswd]= useState("");  
 const[Message, setMessage]= useState({
       message: "",
       style: "none",
       color: "red"
 }); 
 const history = useHistory();

let Forget=()=>{
  history.push('/Forget');
}

 let SignUpCheck=() =>{
    
        createUserWithEmailAndPassword(auth, email, passwd)
  .then(async(res ) => {
    // Signed up 
    const user = res.user;
    console.log(user);
    await updateProfile (user,{ 
      displayName: name
    });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setMessage({
      message: errorMessage,
      style:"block"
    });
    console.log(errorMessage);
    // ..
  });
      
}
let LoginCheck=() =>{
  
  signInWithEmailAndPassword(auth, email, passwd)
  .then(async(res) => {
    const user = res.user;
    if(user.uid){
      localStorage.setItem('user', JSON.stringify({
        userid: user.uid,
        name: user.displayName,
        email: user.email
      }));
      history.push('/');
      console.log(localStorage.getItem('user'));

    }
    console.log(user.uid);  // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  setMessage(errorMessage);
   
    console.log(errorMessage);
  });
}

let db = getDatabase(fi);

 let value= event => {
    setemail(event.target.value);

    console.log('value is:', event.target.value);
  };
  let valuename= event => {
    setname(event.target.value);

    console.log('value is:', event.target.value);
  };
  let valuepasswd= event => {
    setpasswd(event.target.value);

    console.log('value is:', event.target.value);
  };

  return (
    <div className='containers'>
      
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div style={{display:Message.style}}className="error">{Message.message}</div>

        <div className="inputs">
            
            {action==="Login"?<div></div>:<div className="input"><img src={user_icon} alt="" />
                <input type="text"onChange={valuename} placeholder="Name" />
             </div>}
               
             <div className="input">
                <img src={email_icon} alt="" />
                <input type="email"onChange={value} placeholder="Email Id"/>
             </div>
             <div className="input">
                <img src={password_icon} alt="" />
                <input type="password"onChange={valuepasswd} placeholder="Password"/>
             </div>
        </div>

        {action==="Sign Up"?<div></div>:<div className="forgot-password" onClick={()=>{setAction("Sign Up");Forget()}}>Forgot Password? <span>Click Here!</span></div>}
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"}onClick={()=>{setAction("Sign Up");SignUpCheck()}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login");LoginCheck()}}>Login</div>
        </div>
    </div>
  )
}

export default LoginSignup