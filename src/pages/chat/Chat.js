import React, { useEffect, useRef } from 'react'
import DesktopView from './desktopView/Index/DesktopView'
import {io} from 'socket.io-client';
import { useSelector } from 'react-redux';

const Chat = () => {
  return (
    <DesktopView/>
  )
}

export default Chat