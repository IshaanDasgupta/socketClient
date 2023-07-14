import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import io from "socket.io-client";
import {Peer} from 'peerjs';

import TopBar from "../TopBar/TopBar";
import VideoFeed from "../VideoFeed/VideoFeed";
import Sidebar from "../SideBar/Sidebar";

import styles from "./desktopView.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSocketID } from "../../../features/socketDetails/socketDetails";

const VideoConferencing = (props) => {
    const {roomID} = useParams();

    const socket = useRef();

    const [userStream , setUserStream] = useState(); 
    const [otherVideoStream , setOtherVideoStream] = useState([]);
    const [chatMessages , setChatMessages] = useState([]);
    const [chatOption , setChatOption] = useState(false);
    const [otherMongoID , setOtherMongoID] = useState([]);
    const [roomName , setRoomName] = useState("");
    const [roomTimestamp , setRoomTimestamp] = useState("");

    const navigate = useNavigate();

    const dispath = useDispatch();

    const userMongoID = useSelector((state) => state.userDetails.userId);


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

                    socket.current.on("userLeft" , (userDetails) => { 
                        callList[userDetails.socketID] = undefined;
                        setOtherVideoStream(oldVideoStream => oldVideoStream.filter(stream => stream.peer !== userDetails.socketID))
                        setOtherMongoID(prevMongoID => prevMongoID.filter(id => id !== userDetails.mongoID));
                    })

                    socket.current.on("receivingMongoID" , (mongoID) => {
                        console.log("receiving id " , mongoID);
                        setOtherMongoID((prevID) => [...prevID , mongoID]);
                    })

                    socket.current.on("roomDetails" , (roomDetails) => {
                        setRoomName(roomDetails.roomName);
                        setRoomTimestamp(roomDetails.roomTimestamp);
                    })

                    socket.current.emit("joinRoom" , {roomID , userMongoID});
                    socket.current.on('restUsersInRoom' , (restUsersInRoom) => {
                        restUsersInRoom.forEach((userObj) => {
                            console.log("userobj " , userObj);
                            setOtherMongoID((prevID) => [...prevID , userObj.mongoID]);
                            socket.current.emit("sendingMongoID" , { targetSocketID:userObj.socketID , senderMongoID:userMongoID});
                            const call = peer.call(userObj.socketID , stream);
                            call.on("stream" , (remoteStream) => {
                                if (!callList[call.peer]){
                                    setOtherVideoStream(oldVideoStream => [...oldVideoStream , {stream:remoteStream , peer:call.peer}]);
                                    callList[call.peer] = call;
                                }
                            })
                        })
                    })

                    socket.current.on("messageRecievedInRoom" , (msgDetails) => {
                        setChatMessages(prevMessages => [...prevMessages , {message:msgDetails.message , senderID:msgDetails.senderID , senderPfp:msgDetails.senderPfp , senderName:msgDetails.senderName}])
                    })

                }).catch(err => navigate("/"))
                
            })

        })

    }, []);

    return (
        <div>
            <TopBar otherMongoID={otherMongoID} roomName={roomName} roomTimestamp={roomTimestamp}/>
            <div className={styles.flex}>
                <VideoFeed userStream={userStream} setUserStream={setUserStream} otherVideoStream={otherVideoStream} otherMongoID={otherMongoID} socket={socket} chatOption={chatOption} setChatOption={setChatOption} className={styles.flex1}/>
                {chatOption === true && <Sidebar socket={socket} chatMessages={chatMessages} setChatMessages={setChatMessages}/>}
            </div>
        </div>
    )

};

export default VideoConferencing



