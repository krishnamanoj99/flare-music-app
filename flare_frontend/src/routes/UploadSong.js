import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import IconText from "../components/shared/IconText"
import TextInput from "../components/shared/TextInput";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

const UploadSongComponent = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState("");
    const navigate = useNavigate();

    const submitSong = async () => {
        const data = { name, thumbnail, track: playlistUrl };

        const response = await makeAuthenticatedPOSTRequest(
            "/song/create",
            data,
        )
        if (response.err) {
            alert("Could not add song");
            return;
        }
        navigate("/home")
        console.log(response);
    }

    return (
        <LoggedInContainer>
            <div className="flex flex-col justify-center items-center space-y-6">
                <div className="text-3xl m-5">
                    Upload your song on Flare!
                </div>
                <div className="w-1/3 space-y-6">
                    <TextInput label={"Name of the song"} placeholder={"Name"}
                        value={name}
                        setValue={setName} />
                    <TextInput label={"Thumbnail link of the song"} placeholder={"Thumbnail"}
                        value={thumbnail}
                        setValue={setThumbnail} />
                </div>
                <div>{
                    uploadedSongFileName ?
                        (
                            <div className="w-full bg-white p-4 rounded-lg">
                                {uploadedSongFileName.substring(0, 15)}...
                            </div>
                        ) : (
                            <CloudinaryUpload setName={setUploadedSongFileName} setUrl={setPlaylistUrl} />
                        )
                }
                </div>
                <div className="bg-flare-orange text-white rounded-full p-4 cursor-pointer hover:bg-yellow-500 font-semibold" onClick={submitSong}>
                    Submit Song
                </div>
            </div>

        </LoggedInContainer>

    );
}



export default UploadSongComponent;