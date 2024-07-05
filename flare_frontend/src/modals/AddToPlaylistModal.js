import {useState, useEffect} from 'react'
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const AddToPlaylistModal = ({closeModal, addSongToPlaylist}) => {
    const [myPlaylists, setMyPlaylists] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/me")
            console.log(response.data);
            setMyPlaylists(response.data);
        }
        getData();
    }, []); 
    

    return (
        <div className="absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
            <div className="h-1/2 w-1/3 bg-white rounded-3xl flex flex-col p-10 space-y-6 shadow-2xl" onClick={(e) => {
                e.stopPropagation();
            }}>
                <div className="font-semibold text-3xl  text-black">Select Playlist</div>
                <div className="flex flex-col space-y-4">
                    {
                        myPlaylists.map((item) => {
                            return <PlaylistListComponent info={item} addSongToPlaylist={addSongToPlaylist}/>
                        })
                    }
                    
                </div>
            </div>
        </div>
    );
}

const PlaylistListComponent = ({info, addSongToPlaylist}) => {
    return (
        <div className="hover:bg-flare-orange cursor-pointer flex p-4 space-x-6 rounded-lg items-center" onClick={() => {addSongToPlaylist(info._id)}}>
            <div
                className="w-28 h-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url("${info.thumbnail}")`,
                }}
            ></div>
            <div className="text-black justify-end">{info.name}</div>
        </div>
    )
}

export default AddToPlaylistModal;