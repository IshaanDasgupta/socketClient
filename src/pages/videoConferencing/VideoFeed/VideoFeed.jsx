import React, { useEffect, useRef, useState } from 'react'
import styles from "./videoFeed.module.css";

import Video from "../../../components/Video/Video"

import VideoIcon from "../../../static/videoConferencing/VideoIcon.svg";

const VideoFeed = (props) => {

  const containerRef = useRef();
  const [videoFeedWidth , setVideoFeedWidth] = useState();
  const [videoFeedHeight , setVideoFeedHeight] = useState();

  const [widthPerVid , setWidthPerVid] = useState();
  const [heightPerVid , setHeightPerVid] = useState();

  const userStream = props.userStream;
  const otherVideoStream = props.otherVideoStream;

  const count = 1 + otherVideoStream.length;
  const col = Math.ceil(Math.sqrt(count));
  const row = Math.ceil(count/col);

  const arrayOfVideos = [[]];
  arrayOfVideos[0].push(userStream);
  otherVideoStream.forEach((videoStream) => {
    if (arrayOfVideos[arrayOfVideos.length-1].length === col){
      const temp = [];
      temp.push(videoStream);
      arrayOfVideos.push(temp);
    }
    else{
      arrayOfVideos[arrayOfVideos.length-1].push(videoStream);
    }
  })

  const option = [
    {
      icon: VideoIcon,

    },
    {
      icon: VideoIcon,
    },
    {
      icon: VideoIcon,
    },
    {
      icon: VideoIcon,
    },
    {
      icon: VideoIcon,
    }
  ];

  useEffect(() => {
    setVideoFeedWidth(containerRef.current.clientWidth - 40);
    setVideoFeedHeight(containerRef.current.clientHeight - 40);
  }, [containerRef])

  useEffect(()=>{
    setWidthPerVid(Math.ceil((videoFeedWidth- (col-1)*20)/col));
    setHeightPerVid(Math.ceil((videoFeedHeight - 80 - (row-1)*20)/row));

    console.log("width ", widthPerVid);
    console.log("height " , heightPerVid);
    console.log("row " , row);
  }, [containerRef , props]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.videoFeed}>
        { 
          arrayOfVideos.map((rowVideos , index) => {
            return(
              <div className={styles.row} style={{height: ` ${heightPerVid}px`}}>
                {rowVideos.map((videoStream ,indx) => {
                  return (
                    index === 0 && indx === 0 ? 
                      <Video stream={videoStream} width={widthPerVid} heightPerVid={heightPerVid} muted={true}/>
                    : 
                      <Video stream={videoStream} width={widthPerVid} heightPerVid={heightPerVid} />
                  )
                })}
              </div>
            )
          })
        }
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.optionContainer}>
          {option.map((optionObj) => {
            return (
              <div className={styles.option}>
                <img src={optionObj.icon} alt="" className={styles.optionIcon}/>
              </div>
            );
          })}
          <div className={styles.endCallButton}>
            <p className={styles.endCallText}>End Call</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoFeed