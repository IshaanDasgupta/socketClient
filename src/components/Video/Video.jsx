import React, { useEffect, useRef, useState } from 'react'
import styles from "./video.module.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
import multiavatar from '@multiavatar/multiavatar';

const Video = (props) => {

    const [videoStatus , setVideoStatus] = useState(true);
    const [pfp , setPfp] = useState(multiavatar("Guest"));

    // const userProfilePic = useSelector((state) => state.userDetails.profilePic);

    const videoRef = useRef();

    const width = props.width;
    const height = props.height;
    useEffect(()=> {
        const fetchPfp = async() => {
            try{
                console.log("id is " ,props.id);
                const res = await axios.get(`https://socketserver-9w11.onrender.com/api/user/${props.id}`);
                setPfp(res.data.profilePic);
            }
            catch(e){
                console.log(e);
            }
        }
        fetchPfp();

        videoRef.current.srcObject = props.stream;
        if (props.stream){
            const temp = props.stream.getTracks().find((track) => track.kind === 'video');
            setVideoStatus(temp.enabled);
        }
    }, [props])
    return (
        <div className={styles.videoContainer} style={{width: ` ${width}px` , height: ` ${height}px`}}>
            {props.muted === true ? <video className={styles.video} ref={videoRef} autoPlay muted/> : <video className={styles.video} ref={videoRef} autoPlay/>}
            {videoStatus === false && 
                <div className={styles.background}>
                    <div className={styles.profilePicBg} >
                        <div className={styles.profilePic} dangerouslySetInnerHTML={{__html: pfp}}></div>
                    </div> 
                </div>
            }
        </div>
    )
}

export default Video