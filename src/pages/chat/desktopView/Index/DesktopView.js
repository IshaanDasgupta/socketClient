import React from 'react'
import styles from './desktopview.module.css';
import Chatbox from '../Chatbox/Chatbox';
import Sidebar from '../Sidebar/Sidebar';

const DesktopView = () => {
  return (
    <div className={styles.container}>
        <Sidebar/>
        <Chatbox/>
    </div>
  )
}

export default DesktopView