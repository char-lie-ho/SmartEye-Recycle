//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBc6obyqANIJRgG-XTp-udJ800c2Qg3Dzo",
    authDomain: "smart-eye-app.firebaseapp.com",
    projectId: "smart-eye-app",
    storageBucket: "smart-eye-app.appspot.com",
    messagingSenderId: "270058954076",
    appId: "1:270058954076:web:230d50338489787196f599"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();