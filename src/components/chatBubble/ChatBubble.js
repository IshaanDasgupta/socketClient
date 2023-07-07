import React, { useEffect, useRef } from 'react'
import styles from './chatBubble.module.css';
import {format} from 'timeago.js';
import { useSelector } from 'react-redux';


const ChatBubble = (props) => {
  console.log(props.createdAt);
  const userId = useSelector((state) => state.userDetails.userId);
  const socketID = useSelector((state) => state.socketDetails.socketID);
  const scroll = useRef();

  useEffect(()=>{
    scroll.current?.scrollIntoView({behaviour : "smooth"});
  },)

  return (
    <div className={props.senderID === userId || props.senderID === socketID ? styles.ownContainer : styles.otherContainer} ref={scroll}>
        {props.name && 
          <div className={styles.flex}>
            <div className={styles.profilePic} dangerouslySetInnerHTML={{__html:props.senderPfp}} ></div>
            <div className={styles.name}>
              {props.name}
            </div> 
          </div>
        }
        <div className={styles.text}>
            {props.text}
        </div>
        {props.createdAt && 
          <div className={styles.time}>
              {format(props.createdAt)}
          </div>
        }
    </div>
  )
}

export default ChatBubble