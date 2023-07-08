import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setUserId , setProfilePic } from '../../features/userDetails/userDetailsSlice';
import LoginImg from '../../static/login/loginSVG.svg';
import multiavatart from "@multiavatar/multiavatar";


import styles from "./register.module.css";

const Register = () => {

    const navigate = useNavigate();

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [profilePic , setProfilePicLocal] = useState();
    const [buffering , setBuffering] = useState(false);

    const [state , setState] = useState(1);

    const dispatch = useDispatch();

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const [svg1 , setSgv1] = useState(multiavatart(randomNumberInRange(1, 10000)));
    const [svg2 , setSgv2] = useState(multiavatart(randomNumberInRange(1, 10000)));
    const [svg3 , setSgv3] = useState(multiavatart(randomNumberInRange(1, 10000)));
    const [svg4 , setSgv4] = useState(multiavatart(randomNumberInRange(1, 10000)));


    const changeIcon = () => {
        setSgv1(multiavatart(randomNumberInRange(1, 10000)));
        setSgv2(multiavatart(randomNumberInRange(1, 10000)));
        setSgv3(multiavatart(randomNumberInRange(1, 10000)));
        setSgv4(multiavatart(randomNumberInRange(1, 10000)));
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const sumbit = async (e) => {
        e.preventDefault();
        if (state === 1){
            setState(2);
        }
        else{
            setBuffering(true);
            try{
                const res = await axios.post('https://socketserver-9w11.onrender.com/api/user/register' , {name:name , email : email , password: password , profilePic: profilePic});
                dispatch(setUserId(res.data._id));
                dispatch(setProfilePic(res.data.profilePic));
                await axios.post('https://socketserver-9w11.onrender.com/api/user/login' , {email:email , password:password});
                navigate("/");
            }
            catch(err){
                setState(1);
            }
            setBuffering(false);
        }
    }



    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                {state === 1 && 
                    <>
                        <img src={LoginImg} alt="" className={styles.loginSVG}/>
                        <input type="text" onChange={handleNameChange} className={styles.input} placeholder="Enter your name"/>
                        <input type="text" onChange={handleEmailChange} className={styles.input} placeholder="Enter your email"/>
                        <input type="text" onChange={handlePasswordChange} className={styles.input} placeholder="Enter your password"/>
                    </>
                }
                {state === 2 && 
                    <>
                        <h1 className={styles.heading}>Select your profile picture !</h1>
                        <div className={styles.iconFlex}>
                            <div className={profilePic !== svg1 ? styles.icon : styles.selectedIcon} dangerouslySetInnerHTML={{__html: svg1}} onClick={() => {setProfilePicLocal(svg1)}}></div>
                            <div className={profilePic !== svg2 ? styles.icon : styles.selectedIcon} dangerouslySetInnerHTML={{__html: svg2}} onClick={() => {setProfilePicLocal(svg2)}}></div>
                            <div className={profilePic !== svg3 ? styles.icon : styles.selectedIcon} dangerouslySetInnerHTML={{__html: svg3}} onClick={() => {setProfilePicLocal(svg3)}}></div>
                            <div className={profilePic !== svg4 ? styles.icon : styles.selectedIcon} dangerouslySetInnerHTML={{__html: svg4}} onClick={() => {setProfilePicLocal(svg4)}}></div>
                        </div>
                    </>
                }
                {state === 2 ? 
                    <div className={styles.flex}>
                        <div onClick={changeIcon} className={styles.refreshButton}>Refresh</div>
                        {buffering === false ?
                            <div onClick={sumbit} className={styles.button}>Sign Up &gt;</div>
                        :
                            <div className={styles.disabledButton}>Sign Up &gt;</div>
                        }
                    </div>
                :
                    <div onClick={sumbit} className={styles.button}>Next &gt;</div>
  
                }
            </div>
        </div>
    )
}

export default Register