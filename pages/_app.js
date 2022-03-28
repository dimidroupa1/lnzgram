import '../styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../firebase"
import Login from '../components/Login';
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user){
      db.collection("users").doc(user.uid).set({
        email: user.email,
        photoURL: user.photoURL,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }, 
      {
        merge: true
      });
    }
    
  }, [user]);

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Login />
  }

  return <Component {...pageProps} />
}

export default MyApp
