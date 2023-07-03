import React, { useEffect, useRef } from 'react'
import styles from "./video.module.css";

const Video = (props) => {
    const videoRef = useRef();
    const width = props.width;
    const height = props.height;
    useEffect(()=> {
        videoRef.current.srcObject = props.stream;
    }, [props])
    return (
        <div className={styles.videoContainer} style={{width: ` ${width}px` , height: ` ${height}px`}}>
            {props.muted === true ? <video className={styles.video} ref={videoRef} autoPlay muted/> : <video className={styles.video} ref={videoRef} autoPlay/>}
        </div>
    )
}

export default Video