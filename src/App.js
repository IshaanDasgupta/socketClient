import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Chat from './pages/chat/Chat';
import Login from './pages/login/Login';
import VideoConferencing from './pages/videoConferencing/VideoConferencing';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/videoConferencing/:roomID" element={<VideoConferencing/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
