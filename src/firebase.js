import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIBAlV01fVS8WBpeC6RZjYkMEUa7-D4do",
  authDomain: "merchant-app-7f92f.firebaseapp.com",
  projectId: "merchant-app-7f92f",
  storageBucket: "merchant-app-7f92f.appspot.com",
  messagingSenderId: "350461071222",
  appId: "1:350461071222:web:7b1a5a61d5203f54897457"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;