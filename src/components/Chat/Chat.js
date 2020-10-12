import React, { useState, useEffect, useContext } from "react";

// Context and firebase imports
import { GlobleContext } from "./../../context/GlobleContext";
import { useParams } from "react-router-dom";
import db from "../../config/firebase_config";
import firebase from "firebase";

// styling and and icons import
import ScrollToBottom from "react-scroll-to-bottom";
import { Avatar, IconButton } from "@material-ui/core";
import {
	SearchOutlined,
	AttachFile,
	MoreVert,
	InsertEmoticon,
	Mic,
	SendSharp,
} from "@material-ui/icons";
import moment from "moment";
import "./Chat.css";

function Chat() {
	const { roomId } = useParams();
	const [input, setInput] = useState("");
	const [user, setUser] = useContext(GlobleContext);
	const [roomName, setRoomName] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (roomId) {
			db.collection("rooms")
				.doc(roomId)
				.onSnapshot((snapshot) => setRoomName(snapshot.data().name));

			db.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy("timeStamp", "asc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [roomId]);
	const sendMessage = (e) => {
		e.preventDefault();
		db.collection("rooms").doc(roomId).collection("messages").add({
			name: user.userName,
			message: input,
			timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput("");
	};
	return (
		<div className="chat">
			<div className="chat_header">
				<Avatar />
				<div className="chat_headerInfo">
					<h3 style={{ textTransform: "capitalize" }}>{roomName}</h3>
					<p>
						Last Seen{" "}
						{moment(
							messages[messages.length - 1]?.timeStamp?.toDate()
						).fromNow()}
					</p>
				</div>
				<div className="chat_headerRight">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<ScrollToBottom className="chat_container">
				<div className="chat_body">
					{messages.map((message) => (
						<p
							className={`chat_message ${
								user.userName === message.name && "chat_reciever"
							}`}
						>
							{user.userName !== message.name && (
								<span className="chat_name">{message.name}</span>
							)}
							{message.message}
							<span className="chat_timeStamp">
								{moment(message.timeStamp?.toDate()).format("hh:mm A")}
							</span>
						</p>
					))}
				</div>
			</ScrollToBottom>
			<div className="chat_footer">
				<InsertEmoticon />
				<form onSubmit={sendMessage}>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder="Type a massage"
					/>
					{input !== "" ? (
						<IconButton type="submit">
							<SendSharp fontSize="small" />
						</IconButton>
					) : (
						<Mic />
					)}
				</form>
			</div>
		</div>
	);
}

export default Chat;
