import React, { useEffect, useState } from 'react'
import styles from './ChatTab.module.css';
import ProfilePic from '../../static/tempProfile.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '../../features/chatSelections/chatSelection';

const ChatTab = (props) => {

  const [friend , setFriend] = useState({});
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userDetails.userId);
  const friendId = props.chatData.members[0] === userId ? props.chatData.members[1] : props.chatData.members[0];
  const selectedFriend = useSelector((state) => state.chatSelection.selectedFriend);

  useEffect(()=>{
    const getFriendData = async(id)=>{
      const res = await axios.get(`https://socketserver-9w11.onrender.com/api/user/${id}`);
      setFriend(res.data);
    }

    getFriendData(friendId);
  }, [props.chatData])

  const handleSelection = () =>{
    dispatch(setSelection(friendId));
  }

  return (
    <>
    <div className={selectedFriend === friendId ?  `${styles.container} ${styles.selected}` : styles.container} onClick={handleSelection}>
        <img src={ProfilePic} alt="" className={styles.imgContainer}/>
        <div>
            <div className={styles.name}>{friend.name}</div>
            {props.online !== undefined ? <div className={styles.online}>Online</div> : <></>}
        </div>
    </div>
    <div className={styles.seperation}/>
    </>
  )
}

export default ChatTab