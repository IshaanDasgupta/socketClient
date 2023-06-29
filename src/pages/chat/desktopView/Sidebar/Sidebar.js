import React, { useEffect, useState } from 'react'
import styles from './Sidebar.module.css';
import ChatTab from '../../../../components/chatTab/ChatTab';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const [chats , setChats] = useState([]);

  const userId = useSelector((state) => state.userDetails.userId);

  useEffect(()=>{
    const getChat = async (id) =>{
      const res = await axios.get(`https://socketserver-9w11.onrender.com/api/chat/${id}`);
      setChats(res.data);
    }

    if (userId.length !== 0){
      getChat(userId);
    }
  },[])

  return (
    <div className={styles.container}>
        <div className={styles.heading}>Your Chats</div>
        {chats.map((chat, index)=>{
          return(
           <ChatTab chatData={chat} key={index}/>
          )
        })}
    </div>
  )
}


export default Sidebar