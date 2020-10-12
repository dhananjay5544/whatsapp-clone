import React, { useContext } from "react";
import { GlobleContext } from "./context/GlobleContext";
import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import Chat from "./components/Chat/Chat";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";

function App() {
	const [user, setUser] = useContext(GlobleContext);
	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className="app_body">
					<Router>
						{/* sidebar */}
						<SideBar />
						<Switch>
							<Route path="/rooms/:roomId">
								{/* chat */}
								<Chat />
							</Route>
							<Route path="/">{/* chat */}</Route>
						</Switch>
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
