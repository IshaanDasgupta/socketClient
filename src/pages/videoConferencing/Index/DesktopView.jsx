import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import {Peer} from 'peerjs';

import TopBar from "../TopBar/TopBar";
import VideoFeed from "../VideoFeed/VideoFeed";
import Sidebar from "../SideBar/Sidebar";

import styles from "./desktopView.module.css";

const VideoConferencing = (props) => {
    const {roomID} = useParams();

    const socket = useRef();
    const [userStream , setUserStream] = useState(); 
    const [otherVideoStream , setOtherVideoStream] = useState([]);

    const callList = [];

    useEffect(() => {
        socket.current = io('https://socketserver-9w11.onrender.com');

        socket.current.on("connect", () => {
            // console.log("my socket id ", socket.current.id);
            const peer = new Peer(socket.current.id);
            peer.on("open" , () => {
                navigator.mediaDevices.getUserMedia({audio:true , video:true}).then(stream => {

                    // userStream.current.srcObject = stream;
                    setUserStream(stream);

                    peer.on("call" , (call) => {
                        // console.log("call recived from " , socket.current.id);
                        call.answer(stream);
                        call.on("stream" , (remoteStream) => {
                            
                            if (!callList[call.peer]){
                                setOtherVideoStream(oldVideoStream => [...oldVideoStream , remoteStream]);
                                callList[call.peer] = call;
                            }
                            // console.log("remoteStream recived " , remoteStream);
                        })
                    })

                    socket.current.emit("joinRoom" , roomID);
                    socket.current.on('restUsersInRoom' , (restUsersInRoom) => {
                        console.log(restUsersInRoom);
                        restUsersInRoom.forEach((userID) => {
                            // console.log("calling " , userID);
                            const call = peer.call(userID , stream);
                            call.on("stream" , (remoteStream) => {
                                if (!callList[call.peer]){
                                    setOtherVideoStream(oldVideoStream => [...oldVideoStream , remoteStream]);
                                    callList[call.peer] = call;
                                }
                                // console.log("remoteStream recived " , remoteStream);
                            })
                        })
                    })

                }).catch(err => console.log(err))
                
            })

        })

    }, []);

    useEffect(() => {
        console.log(otherVideoStream);
    } , [otherVideoStream])

    return (
        <div>
            <TopBar/>
            <div className={styles.flex}>
                <VideoFeed userStream={userStream} otherVideoStream={otherVideoStream}  className={styles.flex1}/>
                <Sidebar/>
            </div>
            {/* <div>
                <video ref={userStreamRef} autoPlay muted/>

            </div>
            {otherVideoStream.map((videoStream , index) => {
                return (
                    <Video stream={videoStream} />
                )
            })} */}
        </div>
    )

};

export default VideoConferencing



