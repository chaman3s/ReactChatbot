import React, { useState } from 'react'
import Chatbot from './components/chatbot/Chatbot'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Faq from './components/Faq'
import Help from './components/Help'
import './App.css'
import Slider from './components/Slider'
import LoginSignup from './components/LoginSignup/LoginSignup.jsx'
import Forget from './components/LoginSignup/Forget.js'
const App = () => {
  return (
    <Router>
      <Route path="/" component={LoginSignup}  />
      <Header />

      <main className="py-3">
        <Container>
          
            
     
          <Route path="/faq" component={Faq} />
          <Route path="/help" component={Help} />
          <Route path="/Forget" component={Forget} />
          <Route path="/chatbot" component={Slider} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
