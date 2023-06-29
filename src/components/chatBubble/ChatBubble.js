import React, { useEffect, useRef } from 'react'
import styles from './chatBubble.module.css';
import {format} from 'timeago.js';
import { useSelector } from 'react-redux';


const ChatBubble = (props) => {
  const userId = useSelector((state) => state.userDetails.userId);

  const scroll = useRef();

  useEffect(()=>{
    scroll.current?.scrollIntoView({behaviour : "smooth"});
  },)

  return (
    <div className={props.senderID === userId ? styles.ownContainer : styles.otherContainer} ref={scroll}>
        <div className={styles.text}>
            {props.text}
        </div>
        <div className={styles.time}>
            {format(props.createdAt)}
        </div>
    </div>
  )
}

export default ChatBubble