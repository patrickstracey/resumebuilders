import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSzb_2lQUzPrgDdFB3-eKXWCtniyr3LIc",
  authDomain: "resume-builders.firebaseapp.com",
  projectId: "resume-builders",
  storageBucket: "resume-builders.appspot.com",
  messagingSenderId: "694646641747",
  appId: "1:694646641747:web:cf80df4d67811401b722a6",
  measurementId: "G-Q7G1QLZTE9",
};

const firebaseSetup = firebase.initializeApp(firebaseConfig);
export default firebaseSetup;
