import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import {useState} from 'react';
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchComponent = () => {
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);


const searchSong = async () => {
    const response = await makeAuthenticatedGETRequest("/song/get/songname/"+searchText);
    setSongData(response.data);
    // setSearchText("");
}
    return (
        <LoggedInContainer currentActiveScreen={"search"}>
            <div className="w-full h-full p-5 space-x-3 space-y-3">
                <div className="flex w-1/3 p-3 space-x-6 bg-white rounded-full shadow-lg">
                    <Icon icon="iconamoon:search-bold" width="30" color="orange"/>
                    <input type="text" placeholder="What do you want to listen to?" className="w-3/4 focus:outline-none"
                    value={searchText}
                    onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            searchSong();
                        }
                    }}/>
                </div>

                {   songData.length>0 ?
                <div className="pt-5">
                    <div>Showing search results for "<span className="font-bold">{searchText}</span>"</div>
                    {songData.map((item) => {
                        return <SingleSongCard info={item} key={JSON.stringify(item)} playSound={()=>{}}/>;                     
                        })}
                </div> : 
                <div>Nothing to show here.</div>
                }
            </div>

        </LoggedInContainer>
    )
}

export default SearchComponent;