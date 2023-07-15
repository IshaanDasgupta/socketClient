import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Logo from "../../../../static/videoConferencing/Icon.svg";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'

import styles from "./topbar.module.css";
import axios from 'axios';

const Topbar = (props) => {

    const [username , setUsername] = useState("");

    const userProfilePic = useSelector((state) => state.userDetails.profilePic);
    const userId = useSelector((state) => state.userDetails.userId);

    useEffect(() => {
        const fetchUsername = async() => {
            try{
                const res = await axios.get(`https://socketserver-9w11.onrender.com/api/user/${userId}`);
                // console.log(`https://socketserver-9w11.onrender.com/api/user/{${userId}}`);
                setUsername(res.data.name);
            }   
            catch(err){
                console.log(err);
            }
        }

        fetchUsername();
    })

    const navigate = useNavigate();

    const toggleFriends = () => {
        props.setDisplayFriends((prev) => !prev);
    }

    return (
        <div className={styles.container}>
            <img src={Logo} alt="" className={styles.logo} onClick={() => navigate("/")}/>     
            <div className={styles.userFlex}>
                <p className={styles.username}>{username}</p>
                <div className={styles.profilePic} dangerouslySetInnerHTML={{__html:userProfilePic}} />
            </div>
            <div className={styles.friendsToggle}>
                <FontAwesomeIcon icon={faBars} size="xl" className={styles.icon} onClick={toggleFriends} />
            </div>
        </div>
    )
}

export default Topbar