import React from "react";
import { GlobleProvider } from "./context/GlobleContext";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<GlobleProvider>
			<App />
		</GlobleProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
