import React, { useContext } from "react";
import { GlobleContext } from "./../../context/GlobleContext";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./../../config/firebase_config";

function Login() {
	const [user, setUser] = useContext(GlobleContext);
	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				console.log(result);
				var userData = {
					userName: result.user.displayName,
					email: result.user.email,
					avatar: result.user.photoURL,
				};
				setUser(userData);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	return (
		<div className="login">
			<div className="login_container">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
					alt="logo whatsapp"
				/>
				<div className="login_text">
					<h1>Sign In to WhatsApp</h1>
				</div>
				<Button onClick={signIn}>Sign in with Google</Button>
			</div>
		</div>
	);
}

export default Login;
