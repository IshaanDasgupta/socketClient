import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import multiavatart from "@multiavatar/multiavatar";
import SendButton from "../../../static/videoConferencing/SendButton.svg";
import ChatBubble from '../../../components/chatBubble/ChatBubble';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styles from "./sideBar.module.css";

const Sidebar = (props) => {

  const socket = props.socket;
  const chatMessages = props.chatMessages;
  const setChatMessages = props.setChatMessages;

  const [msg , setMsg] = useState("");

  const {roomID} = useParams();

  const userID = useSelector((state) => state.userDetails.userId);
  const userProfilePic = useSelector((state) => state.userDetails.profilePic);

  const handleSend = async() => {
    if (userID.length > 0){
      const res = await axios.get(`https://socketserver-9w11.onrender.com/api/user/${userID}`);
      socket.current.emit("sendMessageInRoom" , {roomID , senderID:userID , senderName:res.data.name , senderPfp:userProfilePic , message:msg});
      setChatMessages(prevMessages => [...prevMessages , {senderID:userID , senderName:res.data.name , senderPfp:userProfilePic , message:msg}]);
      setMsg("");
    }
    else{
      const guestPfp = multiavatart("Guest");
      socket.current.emit("sendMessageInRoom" , {roomID , senderID:socket.current.id , senderName:"Guest "+socket.current.id.substr(0,4) , senderPfp:guestPfp , message:msg});
      setChatMessages(prevMessages => [...prevMessages , {senderID:socket.current.id , senderName:"Guest "+socket.current.id.substr(0,4) , senderPfp:guestPfp , message:msg}]);
      setMsg("");
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      handleSend();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.chats}>
          {chatMessages.map((messageDeatils) => {
            return (
              <ChatBubble senderID={messageDeatils.senderID} senderPfp={messageDeatils.senderPfp} text={messageDeatils.message} name={messageDeatils.senderName}/>
            )
          })}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.inputContainer}>
          <input type="text" className={styles.input} placeholder='Type Something...' value={msg} onChange={(e)=> setMsg(e.target.value)} onKeyDown={handleKeyPress}/>
          <div className={styles.sendButton}>
            <img src={SendButton} alt="" className={styles.sendIcon} onClick={handleSend}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar