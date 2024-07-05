import './output.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import UploadSongComponent from "./routes/UploadSong";
import MyMusicComponent from "./routes/MyMusic";
import SearchComponent from "./routes/Search";
import LibraryComponent from "./routes/Library";
import SinglePlaylistView from "./routes/SinglePlaylist";
import songContext from './contexts/songContext';
import { useState } from 'react';

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);    

  return (
    <div className="w-screen h-screen App font-lexend">
      <BrowserRouter>
        {
          cookie.token ? (
            //Logged in
            <songContext.Provider value={{currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused}}>
              <Routes>
                  <Route path="/" element={<HelloComponent />} />
                  <Route path="/home" element={<LoggedInHomeComponent />} />
                  <Route path="/uploadSong" element={<UploadSongComponent />} />
                  <Route path="/mymusic" element={<MyMusicComponent />} />
                  <Route path="/search" element={<SearchComponent />} />
                  <Route path="/library" element={<LibraryComponent />} />
                  <Route path="/playlist/:playlistId" element={<SinglePlaylistView />} />
                  <Route path="*" element={<LoggedInHomeComponent />} />
              </Routes>
            </songContext.Provider>
          ) :
            (
              //Logged out
              <Routes>
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signup" element={<SignupComponent />} />
                <Route path="*" element={<LoginComponent />} />
              </Routes>
            )
        }
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () => {
  return <div>Hello</div>
};

export default App;
