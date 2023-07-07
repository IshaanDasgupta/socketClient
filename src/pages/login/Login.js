import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePic, setUserId } from '../../features/userDetails/userDetailsSlice';
import styles from './Login.module.css';
import LoginImg from '../../static/login/loginSVG.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email , setEmail] =useState("");
    const [password , setPassword] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const sumbit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('https://socketserver-9w11.onrender.com/api/user/login' , {email : email , password: password});
            dispatch(setUserId(res.data._id));
            dispatch(setProfilePic(res.data.profilePic));
            navigate("/");
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.contentContainer}>
            <img src={LoginImg} alt="" className={styles.loginSVG}/>
            <input type="text" onChange={handleNameChange} className={styles.input} placeholder="Enter your email"/>
            <input type="text" onChange={handlePasswordChange} className={styles.input} placeholder="Enter your password"/>
            <div onClick={sumbit} className={styles.button}>Get Started &gt;</div>
        </div>
    </div>
  )
}

export default Login