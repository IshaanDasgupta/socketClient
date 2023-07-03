import React from 'react'
import styles from "./sideBar.module.css";

import SendButton from "../../../static/videoConferencing/SendButton.svg";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
      </div>
      <div className={styles.bottom}>
        <div className={styles.inputContainer}>
          <input type="text" className={styles.input} placeholder='Type Something...'/>
          <div className={styles.sendButton}>
            <img src={SendButton} alt="" className={styles.sendIcon}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar