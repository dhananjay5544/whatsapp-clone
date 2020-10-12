import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDuMs7OTdDsSe5P0VD8PLuExbHvhBNmMe0",
	authDomain: "whatsapp-clone-5b28c.firebaseapp.com",
	databaseURL: "https://whatsapp-clone-5b28c.firebaseio.com",
	projectId: "whatsapp-clone-5b28c",
	storageBucket: "whatsapp-clone-5b28c.appspot.com",
	messagingSenderId: "498645932901",
	appId: "1:498645932901:web:2b8d37deca9da56ee01f8c",
	measurementId: "G-DX7JGNV065",
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;
