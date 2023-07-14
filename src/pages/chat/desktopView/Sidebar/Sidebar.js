import React, { useEffect, useState } from 'react'
import ChatTab from '../../../../components/chatTab/ChatTab';
import Modal from '../../../../components/modal/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'

import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [chats , setChats] = useState([]);
  const [showModal , setShowModal] = useState(false);

  const userId = useSelector((state) => state.userDetails.userId);

  useEffect(()=>{
    const getChat = async (id) =>{
      const res = await axios.get(`https://socketserver-9w11.onrender.com/api/chat/${id}`);
      setChats(res.data);
    }

    if (userId.length !== 0){
      getChat(userId);
    }
  },[])

  const handleShowModal = () => {
    setShowModal(true);
  }

  return (
    <div className={styles.container}>
        <div className={styles.heading}>Your Chats</div>
        <div className={styles.friendsContainer}>
          {chats.map((chat, index)=>{
            return(
            <ChatTab chatData={chat} key={index}/>
            )
          })}
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.addFriendContainer} onClick={handleShowModal}> 
            <h2 className={styles.text}>Add your Friends</h2>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}


export default Sidebar