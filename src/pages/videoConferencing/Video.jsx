import React, { useEffect, useRef } from 'react'

const Video = (props) => {
    const videoRef = useRef();

    useEffect(()=> {
        videoRef.current.srcObject = props.stream;
    }, [props])
    return (
        <div>
            <video ref={videoRef} autoPlay></video>
        </div>
    )
}

export default Video