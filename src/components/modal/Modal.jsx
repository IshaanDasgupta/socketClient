import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./modal.module.css";
import axios from 'axios';
import { useSelector } from 'react-redux';

const Modal = (props) => {

    const [email , setEmail] = useState("");

    const userId = useSelector((state) => state.userDetails.userId);

    const showModal = props.showModal;
    const setShowModal = props.setShowModal;

    const closeModal = () => {
        setShowModal(false);
    } 

    const addChat = async() => {
        try{
            console.log(email);
            console.log({email:email});
            const res = await axios.post("https://socketserver-9w11.onrender.com/api/user/fetchUserByEmail" , {email:email})
            if(res.data.length > 0){
                toast.success('User added to your friend list!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                const otherID = res.data[0]._id;
                await axios.post("https://socketserver-9w11.onrender.com/api/chat" , {user1:userId , user2:otherID});
                closeModal();
                window.location.reload(true);
            }
            else{
                toast.error('Please enter a valid email', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        catch(e){
            toast.error('Please enter a valid email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // console.log(e);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter'){
            addChat();
        }
    }

    if (showModal === false){
        return null;
    }

    return (
        <>
            <ToastContainer/>
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <div className={styles.modalHeading}>
                        <h1 className={styles.heading}>Add your Friends</h1>
                        <div className={styles.iconContainer}>
                            <FontAwesomeIcon icon={faTimes} size="2xl" className={styles.icon} onClick={closeModal} />
                        </div>
                    </div>
                    <div className={styles.mainContent}>
                        <input type="text" placeholder="Enter your friends's email address" className={styles.input} onKeyDown={handleKeyPress} onChange={(e) => setEmail(e.target.value)}/>
                        <div className={styles.button} onClick={addChat}>ADD</div>
                    </div>
                </div>
            </div>
        
        </>
  )
}

export default Modal