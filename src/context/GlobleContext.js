import React, { useState } from "react";

export const GlobleContext = React.createContext();

export function GlobleProvider(props) {
	const [user, setUser] = useState(null);

	return (
		<GlobleContext.Provider value={[user, setUser]}>
			{props.children}
		</GlobleContext.Provider>
	);
}
