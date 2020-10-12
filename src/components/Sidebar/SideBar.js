import React, { useState, useEffect, useContext } from "react";

import { GlobleContext } from "./../../context/GlobleContext";
import { Avatar, IconButton } from "@material-ui/core";
import { DonutLarge, Chat, MoreVert, SearchOutlined } from "@material-ui/icons";
import db from "./../../config/firebase_config";
import "./SideBar.css";
import SideBarChat from "./SideBarChat";
function SideBar() {
	const [rooms, setRooms] = useState([]);
	const [user, setUser] = useContext(GlobleContext);
	useEffect(() => {
		const unsubscribe = db
			.collection("rooms")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				setRooms(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});

		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebar_header">
				<Avatar src={user.avatar} />
				<div className="sidebar_headerRight">
					<IconButton>
						<DonutLarge />
					</IconButton>
					<IconButton>
						<Chat />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="sidebar_search">
				<div className="sidebar_searchContainer">
					<SearchOutlined />
					<input placeholder="Search or start a new chat" type="text" />
				</div>
			</div>
			<div className="sidebar_chats">
				<SideBarChat addNewChat />
				{rooms.map((room) => (
					<SideBarChat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}

export default SideBar;
