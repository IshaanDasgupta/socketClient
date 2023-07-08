import React, { useEffect, useRef, useState } from 'react'
import styles from './Chatbox.module.css';
import ChatBubble from '../../../../components/chatBubble/ChatBubble';
import ProfilePic from '../../../../static/tempProfile.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client';


const Chatbox = () => {

  const [currMessage , setCurrMessage] = useState("");
  const [recievedMessage , setRecievedMessage] = useState("");
  const [chat , setChat] = useState([]);
  const [chatID , setChatID] = useState("");
  const [friendName , setFriendName] = useState("");
  const [friendImg , setFriendImg] = useState("");

  const selectedFriendId = useSelector((state) => state.chatSelection.selectedFriend);
  const userId = useSelector((state) => state.userDetails.userId);
  
  const socket = useRef();

  useEffect(()=>{
    socket.current = io('https://socketserver-9w11.onrender.com');
    socket.current.emit('addUser' , userId);
  }, [userId])


  useEffect(() => {
    const fetchChatID = async(id1 , id2) =>{
      const res = await axios.get(`https://socketserver-9w11.onrender.com/api/chat/${id1}/${id2}`);
      setChatID(res.data[0]._id);
    }

    if (userId !== null && userId.length !== 0 && selectedFriendId !== null && selectedFriendId.length !== 0){
      fetchChatID(userId , selectedFriendId);
    }
  });


  useEffect(() => {
    const fetchChat = async() => {
      const res = await axios.get(`https://socketserver-9w11.onrender.com/api/message/${chatID}`);
      setChat(res.data);
    }

    if (chatID != null && chatID.length !== 0){
      fetchChat();
    }

  },[chatID])


  useEffect(()=>{
    const getFriendData = async(id)=>{
      const res = await axios.get(`https://socketserver-9w11.onrender.com/api/user/${id}`);
      setFriendName(res.data.name);
      setFriendImg(res.data.profilePic);
    }

    if (selectedFriendId != null && selectedFriendId.length){
      getFriendData(selectedFriendId);
    }
  }, [selectedFriendId])


  useEffect(()=>{
    socket.current.on('recieveMessage' , (message) => {
      setRecievedMessage(message);
    }) 
  } , []);

  useEffect(() => {
    setChat([...chat , recievedMessage]);
  } , [recievedMessage])


  const handleSend = async(e) => {
      e.preventDefault();
      if (currMessage != null && currMessage.length > 0){
      try{
        const {data} = await axios.post('https://socketserver-9w11.onrender.com/api/message' , {chatID : chatID , senderID: userId , text : currMessage});
        setCurrMessage("");
        setChat([...chat , data]);
        // console.log({chatID : chatID , senderID: userId , text : currMessage , reciverID : selectedFriendId , createdAt:data.createdAt});
        socket.current.emit('sendMessage' ,  {chatID : chatID , senderID: userId , text : currMessage , reciverID : selectedFriendId , createdAt:data.createdAt});
      }
      catch(err){
        console.log(err);
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      handleSend();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          {chatID !== null && chatID.length ? 
            <>
              <div className={styles.profilePic} dangerouslySetInnerHTML={{__html:friendImg}}/>
              <div className={styles.name}>{friendName}</div>
            </>
          : 
            <>
            </>
          }

        </div>
        <div className={styles.chatContainer}>
          {chatID !== null && chatID.length ? 
            <div className={styles.chats}>
              {chat.map((data) => {
                return <ChatBubble senderID={data.senderID} text={data.text} createdAt={data.createdAt} key={data._id}/>
              })}
            </div>
          :
            <>
            </>
          }

        </div>
        <div className={styles.inputContainer}>
          <input type="text" className={styles.input} value={currMessage} onChange={(e)=> setCurrMessage(e.target.value)} onKeyDown={handleKeyPress}/>
          <button className={styles.button} onClick={handleSend}>Send</button>
        </div>
      </div>


    </div>
  )
}

export default Chatbox