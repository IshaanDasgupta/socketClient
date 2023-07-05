import React from 'react'
import styles from "./topBar.module.css";
import Icon from "../../../static/videoConferencing/Icon.svg";
import ProfilePic from '../../../static/tempProfile.png';
import CopyButton from '../../../static/videoConferencing/CopyButton.svg';
import { useLocation, useParams } from 'react-router-dom';

const TopBar = () => {

  const {roomID} = useParams();
  const location = useLocation();

  const handleCopy = () => {
    console.log(location);
    navigator.clipboard.writeText(location.pathname);
  }

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div>
          <img src={Icon} alt="" className={styles.logo}/>
        </div>
        <div>
          <h1 className={styles.name}>Unnamed</h1>
          <p className={styles.date}>June 12th , 2023 | 11:10 AM</p>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.iconContainer}>
          <img src={ProfilePic} alt="" className={styles.icon}/>
        </div>
        <div className={styles.copyButton} onClick={handleCopy}>
          <img src={CopyButton} alt="" className={styles.copyIcon}/>
          <p className={styles.copyText}>{roomID}</p>
        </div>
      </div>
    </div>
  )
}

export default TopBar