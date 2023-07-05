import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import {Peer} from 'peerjs';

import TopBar from "../TopBar/TopBar";
import VideoFeed from "../VideoFeed/VideoFeed";
import Sidebar from "../SideBar/Sidebar";

import styles from "./desktopView.module.css";
import { useDispatch } from "react-redux";
import { setSocketID } from "../../../features/socketDetails/socketDetails";

const VideoConferencing = (props) => {
    const {roomID} = useParams();

    const socket = useRef();

    const [userStream , setUserStream] = useState(); 
    const [otherVideoStream , setOtherVideoStream] = useState([]);
    const [chatMessages , setChatMessages] = useState([]);
    const [chatOption , setChatOption] = useState(false);

    const dispath = useDispatch();

    let callList = [];

    useEffect(() => {
        socket.current = io('https://socketserver-9w11.onrender.com');

        socket.current.on("connect", () => {
            dispath(setSocketID(socket.current.id));
            const peer = new Peer(socket.current.id);
            peer.on("open" , () => {
                navigator.mediaDevices.getUserMedia({audio:true , video:true}).then(stream => {

                    setUserStream(stream);

                    peer.on("call" , (call) => {
                        call.answer(stream);
                        call.on("stream" , (remoteStream) => {
                            if (!callList[call.peer]){
                                setOtherVideoStream(oldVideoStream => [...oldVideoStream , {stream:remoteStream , peer:call.peer}]);
                                callList[call.peer] = call;
                            }
                        })
                    })

                    socket.current.on("userLeft" , (userID) => { 
                        console.log("user left " , userID);
                        callList[userID] = undefined;
                        setOtherVideoStream(oldVideoStream => oldVideoStream.filter(stream => stream.peer !== userID))
                    })

                    socket.current.emit("joinRoom" , roomID);
                    socket.current.on('restUsersInRoom' , (restUsersInRoom) => {
                        restUsersInRoom.forEach((userID) => {
                            const call = peer.call(userID , stream);
                            call.on("stream" , (remoteStream) => {
                                if (!callList[call.peer]){
                                    setOtherVideoStream(oldVideoStream => [...oldVideoStream , {stream:remoteStream , peer:call.peer}]);
                                    callList[call.peer] = call;
                                }
                            })
                        })
                    })

                    socket.current.on("messageRecievedInRoom" , (msgDetails) => {
                        setChatMessages(prevMessages => [...prevMessages , {message:msgDetails.message , senderID:msgDetails.senderID , senderName:msgDetails.senderName}])
                    })

                }).catch(err => console.log(err))
                
            })

        })

    }, []);

    useEffect(() => {
        console.log(otherVideoStream);
    }, [callList])



    return (
        <div>
            <TopBar/>
            <div className={styles.flex}>
                <VideoFeed userStream={userStream} setUserStream={setUserStream} otherVideoStream={otherVideoStream} socket={socket} chatOption={chatOption} setChatOption={setChatOption} className={styles.flex1}/>
                {chatOption === true && <Sidebar socket={socket} chatMessages={chatMessages} setChatMessages={setChatMessages}/>}
            </div>
        </div>
    )

};

export default VideoConferencing



