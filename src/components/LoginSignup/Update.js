import React , {useState} from "react";
import "./LoginSignup.css";
import fi from './firebaseCon';
import { getAuth,updatePassword } from "firebase/auth";

import {getDatabase ,ref,set,onValue, push } from 'firebase/database'

const Update=()=>{
    const[password,setpassword]= useState("");
    const[onpassword,setConpassword]= useState("");

    let value= event => {
        setpassword(event.target.value);
    
        console.log('value is:', event.target.value);
      };
      let convalue= event => {
        setConpassword(event.target.value);
    
        console.log('value is:', event.target.value);
      };
      let upvalue= () => {

       const auth = getAuth();

        const user = auth.currentUser;
        const newPassword = getASecureRandomPassword();

         updatePassword(user, newPassword).then(() => {
          // Update successful.
        }).catch((error) => {
          // An error ocurred
         // ...
        });
        
      };
return(

    <div className='container'>
    <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
    </div>
    <div className="inputs">
        
        
         <div className="input">
            <img src={password_icon} alt="" />
            <input type="email"onChange={value} placeholder="password"/>
         </div>
         <div className="input">
            <img src={password_icon} alt="" />
            <input type="password"onChange={valuepasswd} placeholder="Confirm Password"/>
         </div>
    </div>
   
    <div className="submit-container">
        
        <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login");LoginCheck()}}>Login</div>
    </div>
</div>



)



}
export default Update;