import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { FIREBASE_CONFIG } from "../prod.env";

const firebaseSetup = firebase.initializeApp(FIREBASE_CONFIG);
export default firebaseSetup;
