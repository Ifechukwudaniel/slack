import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/database'



var firebaseConfig = {
    apiKey: "AIzaSyCm4juU4yOtCLcRiy5sstQA9fnK6FsHq4E",
    authDomain: "react-slack-clone-92250.firebaseapp.com",
    databaseURL: "https://react-slack-clone-92250.firebaseio.com",
    projectId: "react-slack-clone-92250",
    storageBucket: "react-slack-clone-92250.appspot.com",
    messagingSenderId: "845121867867",
    appId: "1:845121867867:web:4c1989ee4c26d40f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase