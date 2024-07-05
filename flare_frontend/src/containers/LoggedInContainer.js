import { Link } from "react-router-dom";
import IconText from "../components/shared/IconText";
import { useState, useEffect, useContext, useLayoutEffect, useRef} from "react";
import {Howl, Howler} from "howler";
import songContext from "../contexts/songContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import LogoutModal from "../modals/LogoutModal";

const LoggedInContainer = ({children, currentActiveScreen}) => {
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const {currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused} = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(()=>{
        if(firstUpdate.current){
            firstUpdate.current = false;
            return;
        }
        if(!currentSong){
            return;
        }
        changeSong(currentSong.track);
    }, [currentSong && currentSong.track]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song", payload);
        console.log(response);

        if(response._id){
            setAddToPlaylistModalOpen(false);
        }
        
    }

    const playSound = () => {
        if(!soundPlayed){
            return;
        }
        soundPlayed.play();
    }

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        })
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () =>{
        if (isPaused) {
            playSound();
            setIsPaused(false);
        }
        else { 
            pauseSound();
            setIsPaused(true);
        }
    }

    return (
        <div className="w-full h-full">
            {logoutModalOpen && <LogoutModal closeModal={() => {setLogoutModalOpen(false)}}/> }
            {createPlaylistModalOpen && <CreatePlaylistModal closeModal={() => {setCreatePlaylistModalOpen(false)}}/>}
            {addToPlaylistModalOpen && <AddToPlaylistModal closeModal={() => {setAddToPlaylistModalOpen(false)}}
        addSongToPlaylist ={addSongToPlaylist} />}
            <div className={`${currentSong? "h-9/10" : "h-full"}  w-full flex`}>
                {/* left panel */}
                <div className="h-full bg-flare-light-blue w-1/5 p-2.5">
                    <div class="flex justify-center items-center p-6 pt-16">
                        <img class="h-14 items-center" src="/logo-no-background.png"></img>
                    </div>
                    <div className="w-full py-5">
                        <IconText iconName={"mdi:home"} iconText={"Home"} active={currentActiveScreen === "home"} targetLink={"/home"}/>
                        <IconText iconName={"iconamoon:search-bold"} active={currentActiveScreen === "search"} targetLink={"/search"} iconText={"Search"}/>
                        <IconText iconName={"bx:library"} iconText={"Library"} active={currentActiveScreen === "library"} targetLink={"/library"}/>
                        <IconText iconName={"ic:baseline-library-music"} iconText={"My Songs"}  active={currentActiveScreen === "mymusic"} targetLink={"/mymusic"}/>

                    </div>
                    <div className="pl-2 py-5">
                        <IconText iconName={"fluent:add-12-filled"} iconText={"Create Playlist"} onClick={()=> setCreatePlaylistModalOpen(true)}/>
                        {/* <IconText iconName={"mdi:favourite"} iconText={"Liked Songs"} /> */}
                    </div>
                </div>

                {/* main panel */}
                <div className="h-full w-full bg-gray-300 overflow-auto">
                    <div className="w-full h-1/10 bg-white shadow-sm flex p-4 justify-end">
                        <div className="cursor-pointer px-6 py-1 mx-8 border-4 border-yellow-500 text-yellow-600 font-semibold rounded-full hover:shadow-lg flex justify-center items-center"><Link to="/uploadSong">Upload Song</Link></div>
                        <div className="p-1 flex justify-center items-center cursor-pointer bg-flare-dark-blue text-white font-semibold mr-12 rounded-full hover:shadow-lg" onClick={()=> setLogoutModalOpen(true)}>
                            <Icon icon="mingcute:user-4-line" width="2rem" height=" 2rem" />
                        </div>
                    </div>
                    <div className="content p-6 w-full h-full">
                        {children}
                    </div>
                    
                </div>
            </div>
            {
                currentSong && 
            
                <div className="bg-yellow-600 w-full h-1/10 pt-2 px-16 flex">
                    <div className="w-1/4 flex space-x-4 text-white justify-center items-center">
                        <img src={currentSong.thumbnail} className="w-20 h-14 rounded"></img>
                        <div>
                            <div className="font-semibold">{currentSong.name}</div>
                            <div className="text-xs">{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full justify-center items-center">
                        <div className ="flex justify-center items-center space-x-16 pt-1">
                            <Icon 
                            icon={isPaused? "ic:baseline-play-circle"
                               : "ic:baseline-pause-circle"
                            } width={55} 
                            color="white"
                            className="hover:text-gray-800 shadow-2xl"
                            onClick={togglePlayPause}/>
                        </div>
                    </div>
                    <div className="w-1/4 justify-center flex space-x-6 mr-16 items-center">
                        <Icon icon="carbon:add-filled"  width={30} color="white" className="hover:text-gray-800" onClick={() => setAddToPlaylistModalOpen(true)}/>
                    </div>
                </div>
            }
        </div>

    );
}


export default LoggedInContainer;