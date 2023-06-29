import React, { useState , useEffect, useRef } from 'react'
import {Peer} from 'peerjs'
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';

const VideoConferencing = () => {

    let { roomID } = useParams();

    const [peerID , setPeerID] = useState();
    const [myStream , setMyStream] = useState({});

    const [arrayOfVideos , setArrayOfVideos] = useState([]);

    // let tempArr = [];
    // tempArr.push(<h1>init hello</h1>)

    // setArrayOfVideos([]);

    const peer = new Peer();
    
    useEffect(() => {
        peer.on('open' , (id) => {
            setPeerID(id);
        })

        const getMediaStream = () => {
            navigator.mediaDevices.getUserMedia({audio:true , video:true}).then((stream) => setMyStream(stream)).catch((err) => console.log(err));
        }
        
        getMediaStream();
    }, []);
  
    const socket = useRef();

    useEffect(()=>{
        socket.current = io('https://socketserver-9w11.onrender.com');
        if (peerID){
            socket.current.emit('joinRoom' , {userId:peerID , roomId:roomID})
        }
        console.log("peer ID : " , peerID)
    }, [roomID , peerID])

    useEffect(()=>{
        const handelUserAddition = (newUserId) => {
            console.log("got the event");
            console.log("adding : " , newUserId , " to " , peerID);
            if (peerID !== newUserId && newUserId){
                const call = peer.call(newUserId , myStream);
                console.log("calling" , newUserId);
                call.on('stream' , (userVideoStream) => {
                    console.log("herehhah");
                    setArrayOfVideos((arrayOfVideos) => {
                        // return arrayOfVideos.concat(<ReactPlayer url={userVideoStream} playing muted />)
                        return arrayOfVideos.concat(<h1>hii</h1>)
                    })
                })
            };

        
        }

        socket.current.on('userAddedToRoom' , handelUserAddition);
        peer.on('call' , (call) => {
            console.log("call recieved with stream " , myStream);
            call.answer(myStream);
        })
    }, [peerID])
    
    return (
        <div>
            <ReactPlayer url={myStream} playing muted />
            {arrayOfVideos}
        </div>
    )
}

export default VideoConferencing