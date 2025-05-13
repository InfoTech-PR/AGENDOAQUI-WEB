import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMXl5NEyqQQFGY2rnXLllfLbZg2FsNr48",
  authDomain: "agendoaqui-web.firebaseapp.com",
  projectId: "agendoaqui-web",
  storageBucket: "agendoaqui-web.firebasestorage.app",
  messagingSenderId: "657465072392",
  appId: "1:657465072392:web:e0aa3a279145b50e24aabd",
  measurementId: "G-DG051P35WT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
