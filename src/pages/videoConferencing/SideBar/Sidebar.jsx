import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from "./sideBar.module.css";

import SendButton from "../../../static/videoConferencing/SendButton.svg";
import ChatBubble from '../../../components/chatBubble/ChatBubble';
import { useSelector } from 'react-redux';

const Sidebar = (props) => {

  const socket = props.socket;
  const chatMessages = props.chatMessages;
  const setChatMessages = props.setChatMessages;

  const [msg , setMsg] = useState("");

  const {roomID} = useParams();

  const userID = useSelector((state) => state.userDetails.userId);

  const handleSend = () => {
    socket.current.emit("sendMessageInRoom" , {roomID , senderID:userID , message:msg});
    setChatMessages(prevMessages => [...prevMessages , {message:msg , senderID:userID}]);
    setMsg("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.chats}>
          {chatMessages.map((messageDeatils) => {
            return (
              <ChatBubble senderID={messageDeatils.senderID} text={messageDeatils.message}/>
            )
          })}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.inputContainer}>
          <input type="text" className={styles.input} placeholder='Type Something...' value={msg} onChange={(e)=> setMsg(e.target.value)}/>
          <div className={styles.sendButton}>
            <img src={SendButton} alt="" className={styles.sendIcon} onClick={handleSend}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar