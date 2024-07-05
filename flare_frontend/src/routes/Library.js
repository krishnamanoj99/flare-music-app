import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import {useState, useEffect} from 'react';
import Card from "../components/shared/Card";

const LibraryComponent = () => {
    const [myPlaylists, setMyPlaylists] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            setMyPlaylists(response.data);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer currentActiveScreen={"library"}>
            <div className="text-3xl my-4 font-semibold">My Playlists</div>
            <div className="grid gap-4 grid-cols-5 ">
                { 
                    myPlaylists.map((item) => {
                    return (<Card key={JSON.stringify(item)} playlistName={item.name} playlistDescription="" playlistThumbnail={item.thumbnail} playListId={item._id}/>)
                    })
                }
            </div>

        </LoggedInContainer>
    )
}

export default LibraryComponent;