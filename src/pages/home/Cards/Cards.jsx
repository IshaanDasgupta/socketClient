import React, { useEffect, useRef, useState } from 'react'

import styles from "./cards.module.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';

const Cards = () => {
  const [roomName , setRoomName] = useState("");

  const socket = useRef();

  const userID = useSelector((state) => state.userDetails.userId);
  console.log(userID);

  const navigate = useNavigate();

  useEffect(() => {
    socket.current = io('https://socketserver-9w11.onrender.com');
  }, []);

  const randomASCII = () => {
      return Math.floor(Math.random() * (122 - 97 + 1)) + 97;
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const getDateAsStr = (num) => {
    if (num === 1){
      return 1 + "st";
    }
    if (num === 1){
      return 2 + "nd";
    }
    if (num === 1){
      return 3 + "rd";
    }
    return num + "th";
  }

  const getTime = (hour , minutes) => {
    let temp = "AM"
    if (hour > 12){
      hour -= 12;
      temp = "PM";
    }

    return hour + ":" + minutes + " " + temp;
  }

  const handleGeneratingRoom = () => {
    if (roomName.length > 0){
      const roomID = String.fromCharCode(randomASCII() , randomASCII() , randomASCII() , 45 , randomASCII() , randomASCII() , randomASCII() , randomASCII() , 45 , randomASCII() , randomASCII() , randomASCII() , randomASCII());
      const currDate = new Date();
      const dateAndTime = months[currDate.getMonth()] + " " + getDateAsStr(currDate.getDate()) + ", " + currDate.getFullYear() + " | " + getTime(currDate.getHours() , currDate.getMinutes());
      socket.current.emit("createRoom" , {roomID: roomID , roomName: roomName , roomTimestamp: "Started at : " + dateAndTime})
      navigate(`/videoConferencing/${roomID}`);
    }
  }

  const handleChat = () => {
    navigate("/chat");
  }

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <h2 className={styles.heading}>CREATE A NEW ROOM</h2>
            <p className={styles.description}>Create your own meeting room to effortlessly connect with anyone by sharing the meet link.</p>
            <div className={styles.flex}>
              <input type="text" placeholder='Enter your room name...' onChange={(e) => setRoomName(e.target.value)} className={styles.input}/>
              <div onClick={handleGeneratingRoom} className={styles.button}>New Room</div>
            </div>
        </div>

        {userID.length > 0 ? 
          <div className={styles.card}>
              <h2 className={styles.heading}>CHAT WITH YOUR FRIEDNS</h2>
              <p className={styles.description}>Add your friends through thier email and chat with them in real-time !</p>
              <div className={styles.button} onClick={handleChat}>Chat with your friends</div>
          </div>
        :

          <div className={styles.disabledCard}>
              <h2 className={styles.disabledHeading}>CHAT WITH YOUR FRIEDNS</h2>
              <p className={styles.disabledDescription}>Add your friends through thier email and chat with them in real-time !</p>
              <div className={styles.button} onClick={handleLogin}>You need to Login to start chatting</div>
          </div>
        }
    </div>
  )
}

export default Cards