import React, { useEffect, useRef, useState } from 'react'
import styles from "./video.module.css";
import { useSelector } from 'react-redux';

const Video = (props) => {

    const [videoStatus , setVideoStatus] = useState(true);

    const userProfilePic = useSelector((state) => state.userDetails.profilePic);

    const videoRef = useRef();

    const width = props.width;
    const height = props.height;
    useEffect(()=> {
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
                        <div className={styles.profilePic} dangerouslySetInnerHTML={{__html: userProfilePic}}></div>
                    </div> 
                </div>
            }
        </div>
    )
}

export default Video