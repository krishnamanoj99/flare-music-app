import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusicComponent = () => {
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            setSongData(response.data);
        };
        getData();
    }, []);
    
    return (
        <LoggedInContainer currentActiveScreen={"mymusic"}>
            <div className="flex flex-col space-y-3 w-full h-full p-4">
                   <div className="text-3xl font-semibold px-2">My Music</div>
                    {songData.map((item) => {
                        return <SingleSongCard info={item} playSound={() => {}}/>;                     
                        })}

            </div>
        </LoggedInContainer>
    )
}

export default MyMusicComponent;