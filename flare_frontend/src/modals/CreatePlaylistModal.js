import TextInput from "../components/shared/TextInput";
import {useState} from 'react'
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const CreatePlaylistModal = ({closeModal}) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
            name: playlistName,
            thumbnail: playlistThumbnail,
            songs: [],
        })
        console.log(response);
        if(response._id){
            closeModal();
        }
    }

    return (
        <div className="absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
            <div className="h-1/2 w-1/3 bg-white rounded-3xl flex flex-col items-center p-10 space-y-6 shadow-2xl" onClick={(e) => {
                e.stopPropagation();
            }}>
                <div className="font-semibold text-3xl  text-black">Create Playlist</div>
                <TextInput label={"Name"} placeholder={"Name"}
                        value={playlistName}
                        setValue={setPlaylistName}/>
          
                <TextInput label={"Thumbnail"} placeholder={"Thumbnail"}
                        value={playlistThumbnail}
                        setValue={setPlaylistThumbnail}/>

                <div className="bg-flare-orange  text-white w-1/5 flex justify-center items-center rounded-full full p-3 cursor-pointer" onClick={createPlaylist}>
                    Create
                </div>
            </div>
        </div>
    );
}

export default CreatePlaylistModal;