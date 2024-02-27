import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCAufB4Jz2AW0uWOnMVf_99ddD4kEAzZHQ",

    authDomain: process.env.REACT_APP_AuthDomain,
    databaseURL: "https://chatbot-e77e0-default-rtdb.firebaseio.com",
    projectId: process.env.REACT_APP_ProjectId,
    storageBucket:process.env.REACT_APP_StorageBucket,
    messagingSenderId: process.env.REACT_APP_MessagingSenderId,
    appId: process.env.REACT_APP_AppId,
    measurementId: process.env.REACT_APP_MeasurementId,
  };
  
  // Initialize Firebase
let fi=initializeApp(firebaseConfig);
export default fi;

