import React from 'react'
import { useSelector } from 'react-redux';
import Logo from "../../../static/videoConferencing/Icon.svg";

import styles from "./topbar.module.css";

const Topbar = () => {

    const userProfilePic = useSelector((state) => state.userDetails.profilePic);

    return (
        <div className={styles.container}>
            <img src={Logo} alt="" className={styles.logo}/>     
            {userProfilePic.length > 0 ?       
                    <div className={styles.profilePic} dangerouslySetInnerHTML={{__html:userProfilePic}} />
                :
                <div className={styles.flex}>
                    <div className={styles.button1}>Sign Up</div>
                    <div className={styles.button2}>Login</div>
                </div>
            }
        </div>
    )
}

export default Topbar