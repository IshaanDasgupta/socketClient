import React, { useEffect, useState } from 'react'
import styles from "./topBar.module.css";
import Icon from "../../../static/videoConferencing/Icon.svg";
import ProfilePic from '../../../static/tempProfile.png';
import CopyButton from '../../../static/videoConferencing/CopyButton.svg';
import { useNavigate, useParams } from 'react-router-dom';
import multiavatart from "@multiavatar/multiavatar";
import { useSelector } from 'react-redux';
import axios from 'axios';

const TopBar = (props) => {

  console.log("other IDs " ,props.otherMongoID);
  const [otherPfp , setOtherPfp] = useState([]);

  const {roomID} = useParams();

  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  let svgCode  = useSelector((state) => state.userDetails.profilePic);
  if (svgCode.length === 0){
    svgCode = multiavatart("Guest");
  }

  useEffect(() => {
    console.log(props.otherMongoID);
    setOtherPfp([]);
    props.otherMongoID.forEach((id) => {
      const addPfp = async(id) => {
        const res = await axios.get(`https://socketserver-9w11.onrender.com/api/user/${id}`);
        setOtherPfp((prevUsers) => [...prevUsers , res.data.profilePic]);
      }
      if (id.length > 0){
        addPfp(id);
      }
      else{
        setOtherPfp((prevUsers) => [...prevUsers , multiavatart("Guest")]); 
      }
    })
  } , [props.otherMongoID]);

  const handleNavigation = () => {
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div onClick={handleNavigation} className={styles.centerFlex}>
          <img src={Icon} alt="" className={styles.logo}/>
        </div>
        <div>
          <h1 className={styles.name}>{props.roomName}</h1>
          <p className={styles.date}>{props.roomTimestamp}</p>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.iconFlex}>
          {otherPfp.map((svgCode) => {
            return (
              <div className={styles.iconContainer} dangerouslySetInnerHTML={{__html: svgCode}}/>
            );
          })}
          <div className={styles.iconContainer} dangerouslySetInnerHTML={{__html: svgCode}}/>
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