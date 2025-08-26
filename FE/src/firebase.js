// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-dyDXwc3-KSesEi6Jouf_t0jUeoQTvSg",
  authDomain: "my-job-react-with-node.firebaseapp.com",
  projectId: "my-job-react-with-node",
  storageBucket: "my-job-react-with-node.appspot.com",
  messagingSenderId: "774668644719",
  appId: "1:774668644719:web:6ea0ad3ca69777caf5b89a",
  measurementId: "G-J0GC6P88Z4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
