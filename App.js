import { StatusBar } from "expo-status-bar";
import React from "react";
import Main from "./Navigator/Src/Main";
import * as firebase from "firebase";
import { Provider as StoreProvider } from "react-redux";
import store from "./Redux/Store";

const firebaseConfig = {
  apiKey: "AIzaSyCPe0aJZ4cBh9ap15kaVHQpr_d6pfz2ysY",
  authDomain: "pet-manager-12.firebaseapp.com",
  projectId: "pet-manager-12",
  storageBucket: "pet-manager-12.appspot.com",
  messagingSenderId: "40179172410",
  appId: "1:40179172410:web:32744a7c0b9685da9a2103",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <Main />
    </StoreProvider>
    
  );
}
