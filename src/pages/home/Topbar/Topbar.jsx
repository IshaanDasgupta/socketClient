import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Logo from "../../../static/videoConferencing/Icon.svg";
import {useNavigate} from "react-router-dom";

import styles from "./topbar.module.css";
import axios from 'axios';

const Topbar = () => {

    const [username , setUsername] = useState("");

    const userProfilePic = useSelector((state) => state.userDetails.profilePic);
    const userId = useSelector((state) => state.userDetails.userId);

    useEffect(() => {
        const fetchUsername = async() => {
            try{
                const res = await axios.get(`https://socketserver-9w11.onrender.com/api/user/${userId}`);
                setUsername(res.data.name);
            }   
            catch(err){
                console.log(err);
            }
        }

        fetchUsername();
    }, []);

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <img src={Logo} alt="" className={styles.logo} onClick={() => navigate("/")}/>     
            {userProfilePic && userProfilePic.length > 0 ?       
                    <div className={styles.userFlex}>
                        <p className={styles.username}>{username}</p>
                        <div className={styles.profilePic} dangerouslySetInnerHTML={{__html:userProfilePic}} />
                    </div>
                :
                    <div className={styles.flex}>
                        <div className={styles.button1} onClick={() => {navigate("/register")}} >Sign Up</div>
                        <div className={styles.button2} onClick={() => {navigate("/login")}} >Login</div>
                    </div>
            }
        </div>
    )
}

export default Topbar