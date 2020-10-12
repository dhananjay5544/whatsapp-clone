import React, { useState, useEffect } from "react";
import "./SideBarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./../../config/firebase_config";
import { Link } from "react-router-dom";
import moment from "moment";

function SideBarChat({ addNewChat, id, name }) {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (id) {
			db.collection("rooms")
				.doc(id)
				.collection("messages")
				.orderBy("timeStamp", "desc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, []);

	const createChat = () => {
		const roomName = prompt("Please enter the room name for the chat");

		if (roomName) {
			//add to databse
			db.collection("rooms").add({ name: roomName, createdAt: new Date() });
		}
	};

	return !addNewChat ? (
		<Link to={`/rooms/${id}`} style={{ textDecoration: "none" }}>
			<div className="sidebarChat">
				<Avatar>{name.slice(0, 1).toUpperCase()}</Avatar>
				<div className="sidebarChat_info">
					<h2 style={{ textTransform: "capitalize" }}>{name}</h2>
					<p>{messages[0]?.message}</p>
				</div>
				<p>{moment(messages[0]?.timeStamp?.toDate()).format("hh:mm A")}</p>
			</div>
		</Link>
	) : (
		<div className="sidebarChat" onClick={createChat}>
			<h2>Add new chat</h2>
		</div>
	);
}

export default SideBarChat;
