import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Video from "../../../components/Video/Video";
import CopyIcon from "../../../static/videoConferencing/CopyIcon.svg";
import VideoIcon from "../../../static/videoConferencing/VideoIcon.svg";
import AudioIcon from "../../../static/videoConferencing/AudioIcon.svg";
import ChatIcon from "../../../static/videoConferencing/ChatIcon.svg";
import DisableVideoIcon from "../../../static/videoConferencing/DisableVideoIcon.svg";
import DisableAudioIcon from "../../../static/videoConferencing/DisableAudioIcon.svg";
import DisableChatIcon from "../../../static/videoConferencing/DisableChatIcon.svg";

import styles from "./videoFeed.module.css";
import { useSelector } from 'react-redux';

const VideoFeed = (props) => {

  const navigate = useNavigate();

  const containerRef = useRef();

  const [videoFeedWidth , setVideoFeedWidth] = useState();
  const [videoFeedHeight , setVideoFeedHeight] = useState();
  const [widthPerVid , setWidthPerVid] = useState();
  const [heightPerVid , setHeightPerVid] = useState();
  const [videoOption , setVideoOption] = useState(true);
  const [audioOption , setAudioOption] = useState(true);

  const userMongoID = useSelector((state) => state.userDetails.userId);

  const socket = props.socket;;
  const chatOption = props.chatOption;
  const setChatOption = props.setChatOption;
  const userStream = props.userStream;
  const setUserStream = props.setUserStream;
  const otherVideoStream = props.otherVideoStream;
  const otherMongoID = props.otherMongoID;

  const count = 1 + otherVideoStream.length;
  const col = Math.ceil(Math.sqrt(count));
  const row = Math.ceil(count/col);

  const arrayOfVideos = [[]];
  arrayOfVideos[0].push(userStream);
  otherVideoStream.forEach((videoStream) => {
    if (arrayOfVideos[arrayOfVideos.length-1].length === col){
      const temp = [];
      temp.push(videoStream.stream);
      arrayOfVideos.push(temp);
    }
    else{
      arrayOfVideos[arrayOfVideos.length-1].push(videoStream.stream);
    }
  })

  useEffect(() => {
    setVideoFeedWidth(containerRef.current.clientWidth - 40);
    setVideoFeedHeight(containerRef.current.clientHeight - 40);
    window.addEventListener('resize', setDimension);
    return () => {
      window.removeEventListener('resize', setDimension)
    }
  }, [])

  const setDimension = () => {
    setVideoFeedWidth(containerRef.current.clientWidth - 40);
    setVideoFeedHeight(containerRef.current.clientHeight - 40);
  }

  useEffect(()=>{
    setWidthPerVid(Math.min( Math.ceil((videoFeedWidth- (col-1)*20)/col) ,  Math.ceil( 2 *Math.ceil((videoFeedHeight - 74 - (row-1)*20)/row))));
    setHeightPerVid(Math.ceil((videoFeedHeight - 74 - (row-1)*20)/row));
  }, [containerRef , videoFeedHeight , videoFeedWidth ,col , row]);

  const handleEndCall = () => {
    socket.current.emit("forceDisconnect" , socket.current.id);
    navigate("/");
  }

  const triggerVideo = () => {
    setUserStream(userStream => {
      const videoTrack = userStream.getTracks().find((track) => track.kind === 'video');
      if (videoTrack.enabled === true){
          videoTrack.enabled = false;
      }
      else{
          videoTrack.enabled = true;
      }
      return userStream;
    })
    setVideoOption(prevState => !prevState);
  }

  const triggerAudio = () => {
    setUserStream(userStream => {
      const videoTrack = userStream.getTracks().find((track) => track.kind === 'audio');
      if (videoTrack.enabled === true){
          videoTrack.enabled = false;
      }
      else{
          videoTrack.enabled = true;
      }
      return userStream;
    })
    setAudioOption(prevState => !prevState);
  }

  const triggerChat = () => {
    setChatOption(prevState => !prevState);
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to Clipboard", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const option = [
    {
      icon: VideoIcon,
      function: triggerVideo,
      disableIcon: DisableVideoIcon,
      state: videoOption
    },
    {
      icon: AudioIcon,
      function: triggerAudio,
      disableIcon: DisableAudioIcon,
      state: audioOption
    },
    {
      icon: ChatIcon,
      function: triggerChat,
      disableIcon: DisableChatIcon,
      state: chatOption
    },
    {
      icon: CopyIcon,
      function: copyLink,
      disableIcon: CopyIcon,
      state: true,
    }
  ];

  return (
    <>
      <ToastContainer/>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.videoFeed}>
          { 
            arrayOfVideos.map((rowVideos , index) => {
              return(
                <div className={styles.row} style={{height: ` ${heightPerVid}px`}}>
                  {rowVideos.map((videoStream ,indx) => {
                    return (
                      index === 0 && indx === 0 ? 
                        <Video stream={videoStream} id={userMongoID} width={widthPerVid} heightPerVid={heightPerVid} muted={true}/>
                      : 
                        <Video stream={videoStream} id={otherMongoID[indx-1]} width={widthPerVid} heightPerVid={heightPerVid} />
                    )
                  })}
                </div>
              )
            })
          }
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.optionContainer}>
            {userStream ?  
                option.map((optionObj , index) => {
                  return (

                    index === 3 ?
                    <div className={styles.copyOption} onClick={optionObj.function}>
                      <img src={optionObj.icon} alt="" className={styles.optionIcon} />
                    </div>

                    :

                    optionObj.state === true ? 
                      <div className={styles.option} onClick={optionObj.function}>
                        <img src={optionObj.icon} alt="" className={styles.optionIcon} />
                      </div>
                    :

                      <div className={styles.disabledOption} onClick={optionObj.function}>
                        <img src={optionObj.disableIcon} alt="" className={styles.optionIcon} />
                      </div>
                  );
                })
              :
                option.map((optionObj) => {
                  return (
                    <div className={styles.disable}>
                      <img src={optionObj.icon} alt="" className={styles.optionIcon} />
                    </div>
                  );
                })
            }
            <div className={styles.endCallButton} onClick={handleEndCall}>
              <p className={styles.endCallText}>End Call</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoFeed