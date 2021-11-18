import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBm6NW58vW1vEfFbc9nvsus7-lXLF3HcnI",
  authDomain: "taugor-teste.firebaseapp.com",
  projectId: "taugor-teste",
  storageBucket: "taugor-teste.appspot.com",
  messagingSenderId: "534786422640",
  appId: "1:534786422640:web:f7a30946cfa6c511ee41b5"
};

const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();
const store = fire.firestore()
const storage = fire.storage()

export { auth, store, fire, storage };
export default firebase

