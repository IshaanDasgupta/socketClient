import React, { useEffect, useState } from 'react'
import Topbar from '../Topbar/Topbar';
import Chatbox from '../Chatbox/Chatbox';
import Sidebar from '../Sidebar/Sidebar';

import styles from './desktopview.module.css';

const DesktopView = () => {

  const [displayFriends , setDisplayFriends] = useState(false);

	const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }

  useEffect(() => {
      if (screenSize && screenSize.width>1024){
        setDisplayFriends(true);
      }
      const updateDimension = () => {
          setScreenSize(getCurrentDimension())
      }
      window.addEventListener('resize', updateDimension);
  
  
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
  }, [screenSize])

  return (
    <div className={styles.container}>
      <Topbar setDisplayFriends={setDisplayFriends}/>
      <div className={styles.mainContent}>
          {displayFriends === true && <Sidebar/>}
          <Chatbox/>
      </div>
    </div>
  )
}

export default DesktopView