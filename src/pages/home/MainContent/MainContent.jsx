import React from 'react'
import GithubIcon from "../../../static/home/githubIcon.svg";
import LinkedinIcon from "../../../static/home/linkedinIcon.svg";

import styles from "./mainContent.module.css";

const MainContent = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>Welcome to My Project !</h1>
        <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit consequuntur architecto deleniti nam porro, repellat excepturi! Reiciendis sapiente ipsam, enim repudiandae culpa amet! Molestiae alias eveniet in quos officiis? Laudantium.</p>
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