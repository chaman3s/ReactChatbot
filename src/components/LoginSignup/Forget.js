import React, { useState } from "react";
import "./LoginSignup.css";
import fi from "./firebaseCon";
import {
  getAuth,
  sendPasswordResetEmail
} from "firebase/auth";

import { getDatabase, ref, set, onValue, push } from "firebase/database";

const Forget = () => {
  let email_icon = require("./Assets/email.png");
  let action = "Forget Password";
  const auth = getAuth();
  let value = (event) => {
    setemail(event.target.value);

    console.log("value is:", event.target.value);
  };

  const [email, setemail] = useState("");

  const Click = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" onChange={value} placeholder="Email Id" />
        </div>
      </div>

      <div className="submit-container">
        <div style={{color: "black"}} className={action === "Forget Password"} onClick={() => {Click()}}>
          Forget password
        </div>
      </div>
    </div>
  );
};
export default Forget;
