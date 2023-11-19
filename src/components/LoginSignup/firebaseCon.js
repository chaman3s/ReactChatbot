import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyCAufB4Jz2AW0uWOnMVf_99ddD4kEAzZHQ",
    authDomain: "chatbot-e77e0.firebaseapp.com",
    databaseURL: "https://chatbot-e77e0-default-rtdb.firebaseio.com",
    projectId: "chatbot-e77e0",
    storageBucket: "chatbot-e77e0.appspot.com",
    messagingSenderId: "77018580396",
    appId: "1:77018580396:web:8ba49db06346f0e05be609",
    measurementId: "G-FGNHVH7GNN"
  };
  
  // Initialize Firebase
let fi=initializeApp(firebaseConfig);
export default fi;

