import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

// firebase---------------------------------------
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyB5V1RfEew4LmWPHL5arAHBTMwUNZayxTk",
  authDomain: "chun-midterm-aws.firebaseapp.com",
  projectId: "chun-midterm-aws",
  storageBucket: "chun-midterm-aws.appspot.com",
  messagingSenderId: "812055616888",
  appId: "1:812055616888:web:c9aca1f1f03a8781797c8d",
  measurementId: "G-FJCB16N3NZ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// firebase---------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
