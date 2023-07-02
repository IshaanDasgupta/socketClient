import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import {Peer} from 'peerjs';
import Video from "./Video";

const VideoConferencing = (props) => {
    const {roomID} = useParams();

    const socket = useRef();
    const userStreamRef = useRef(); 
    const [otherVideoStream , setOtherVideoStream] = useState([]);

    const callList = [];

    useEffect(() => {
        socket.current = io('https://socketserver-9w11.onrender.com');

        socket.current.on("connect", () => {
            // console.log("my socket id ", socket.current.id);
            const peer = new Peer(socket.current.id);
            peer.on("open" , () => {
                navigator.mediaDevices.getUserMedia({audio:true , video:true}).then(stream => {

                    userStreamRef.current.srcObject = stream;

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
            <div>
                <video ref={userStreamRef} autoPlay muted/>

            </div>
            {otherVideoStream.map((videoStream , index) => {
                console.log("here" ,index);
                return (
                    <Video stream={videoStream} />
                )
            })}
        </div>
    )

};

export default VideoConferencing



