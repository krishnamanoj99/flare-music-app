import { Link } from "react-router-dom";
import IconText from "../components/shared/IconText";
import { useState, useEffect } from "react";
import {Howl, Howler} from "howler";
import { Icon } from "@iconify/react/dist/iconify.js";
import LoggedInContainer from "../containers/LoggedInContainer";
import PlayListView from "../components/shared/PlaylistView";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import Card from "../components/shared/Card";


const LoggedInHomeComponent = () => {
    const [allPlaylists, setAllPlaylists] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/playlists");
            console.log(response.data);
            setAllPlaylists(response.data);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer currentActiveScreen={"home"}>
            <div className="text-3xl my-4 font-semibold">My Playlists</div>
            <div className="grid gap-4 grid-cols-5 ">
                { 
                    allPlaylists.map((item) => {
                    return (<Card key={JSON.stringify(item)} playlistName={item.name} playlistDescription={`${item.owner.firstName}  ${item.owner.lastName}`} playlistThumbnail={item.thumbnail} playListId={item._id}/>)
                    })
                }
            </div>

            {/* <PlayListView title={"Trending"} CardsData={} />
            <PlayListView title={"Focus"} CardsData={} />
            <PlayListView title={"Popular"} CardsData={} />                        
            <PlayListView title={"Inde"} CardsData={} /> */}

        </LoggedInContainer>
    )
}
export default LoggedInHomeComponent;