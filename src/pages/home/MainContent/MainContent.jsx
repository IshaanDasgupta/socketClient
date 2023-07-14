import React from 'react'
import GithubIcon from "../../../static/home/githubIcon.svg";
import LinkedinIcon from "../../../static/home/linkedinIcon.svg";

import styles from "./mainContent.module.css";

const MainContent = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>Welcome to My Project !</h1>
        <p className={styles.description}>
This plarform was made by using web-sockets, React, Node, and Express. With real-time, high-quality video communication, users can engage in seamless virtual meetings. The dynamic user interface built on React ensures an interactive experience, while integrated chat functionality enhances collaboration.</p>
        {/* <div className={styles.linkFlex}>
          <div className={styles.linkContainerBlue}>
            <img src={GithubIcon} alt="" className={styles.icon}/>
            <p className={styles.link}>/aquiem</p>
          </div>
          <div className={styles.linkContainerWhite}>
            <img src={LinkedinIcon} alt="" className={styles.icon}/>
            <p className={styles.link}>/ishaandasgupta</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default MainContent