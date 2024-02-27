import React, { useState } from "react";
import Chatbot from "./components/chatbot/Chatbot.js";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Faq from "./components/Faq.js";
import Help from "./components/Help.js";
import "./App.css";
import Slider from "./components/Slider.js";
import Model from "react-model";
import LoginSignup from "./components/LoginSignup/LoginSignup.jsx";
import Forget from "./components/LoginSignup/Forget.js";
// const Loginsessions=()=>{
//   if(localStorage.getItem('user')==null){
//     return()
//   }
//   else {return(

//   )
// }
// }

const App = () => {
  //   React.useEffect(() => {{}
  //      if(localStorage.getItem('user')==null){document.getElementById("main").innerHTML=`<div className='popup'>
  //      <Route path="/" component={LoginSignup} exact />
  //      <Route path="/Forget" component = {Forget} exact/>
  //  </div> `}
  //       else{
  //         document.getElementById("main").innerHTML=``
  //       }
  //   }, []);

  return (
    <Router id="main">
       <div style={{display:(!localStorage.getItem('user'))?"block":"none"}} className='popup'>
          <Route path="https://chaman3s.github.io/ReactChatbot/" component={LoginSignup} exact />
          <Route path="/Forget" component = {Forget} exact/>
       </div>   
       <>
       <div style={{display:(localStorage.getItem('user'))?"block":"none"}} >
        <Header />

        <main className="py-3">
          <Container>
            <div className="bot">
              <Route path="/" component={Chatbot} exact />
            </div>
            <Route path="/faq" component={Faq} />
            <Route path="/help" component={Help} />

            <Route path="/" component={Slider} exact />
          </Container>
        </main>
        <Footer />
        </div>
       </>
    </Router>
  );
};

export default App;
