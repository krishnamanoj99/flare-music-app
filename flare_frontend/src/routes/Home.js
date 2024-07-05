import { Link } from "react-router-dom";
import IconText from "../components/shared/IconText"

const sampleCard = [
    {
        playlistThumbnail: "/flare-logo.png",
        playlistName: "Playlist's name",
        playlistDescription: "Description of playlist"
    },
    {
        playlistThumbnail: "/flare-logo.png",
        playlistName: "Playlist's name",
        playlistDescription: "Description of playlist"
    },
    {
        playlistThumbnail: "/flare-logo.png",
        playlistName: "Playlist's name",
        playlistDescription: "Description of playlist"
    },
    {
        playlistThumbnail: "/flare-logo.png",
        playlistName: "Playlist's name",
        playlistDescription: "Description of playlist"
    },
    {
        playlistThumbnail: "/flare-logo.png",
        playlistName: "Playlist's name",
        playlistDescription: "Description of playlist"
    }
];

const Home = () => {
    return (
        <div className="w-full h-full flex">
            {/* left panel */}
            <div className="h-full bg-flare-light-blue w-1/5 p-2.5">
                <div class="flex justify-center items-center p-6 pt-16">
                    <img class="h-14 items-center" src="/logo-no-background.png"></img>
                </div>
                <div className="w-full py-5">
                    <IconText iconName={"mdi:home"} iconText={"Home"} active />
                    <IconText iconName={"teenyicons:search-outline"} iconText={"Search"} />
                    <IconText iconName={"ic:baseline-library-music"} iconText={"Library"} />

                </div>
                <div className="pl-2 py-5">
                    <IconText iconName={"fluent:add-12-filled"} iconText={"Create Playlist"} />
                    <IconText iconName={"mdi:favourite"} iconText={"Liked Songs"} />
                </div>
            </div>

            {/* main panel */}
            <div className="h-full w-full bg-gray-300 overflow-auto">
                <div className="w-full h-1/10 bg-white shadow-sm flex p-4 justify-end">
                    <div className="cursor-pointer px-6 py-1 mx-8 border-4 border-yellow-500 text-yellow-600 font-semibold rounded-full hover:shadow-lg"><Link to="/signup">Sign Up</Link></div>
                    <div className="cursor-pointer bg-flare-dark-blue text-white font-semibold px-8 py-2 mr-12 rounded-full hover:shadow-lg"><Link to="/login">Login</Link></div>
                </div>

                <div className="p-6 w-full">
                    <PlayListView title={"Trending"} CardsData={sampleCard} />
                    <PlayListView title={"Focus"} CardsData={sampleCard} />
                    <PlayListView title={"Popular"} CardsData={sampleCard} />
                    <PlayListView title={"Inde"} CardsData={sampleCard} />
                </div>
            </div>
        </div>

    );
}

const PlayListView = ({ title, CardsData }) => {
    return (
        <div className="mt-3">
            <div className="text-2xl font-semibold p-2">{title}</div>
            <div className="w-full flex bg-gray-300 justify-between">
                {
                    CardsData.map((item) => {
                        return (
                            <Card playlistThumbnail={item.playlistThumbnail}
                                playlistName={item.playlistName}
                                playlistDescription={item.playlistDescription}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

const Card = ({ playlistThumbnail, playlistName, playlistDescription }) => {
    return (
        <div className="bg-flare-charcoal-blue hover:bg-flare-dark-blue cursor-pointer h-1/8 w-1/5 p-3 mx-2 rounded-xl">
            <div className="p-1">
                <img className="rounded-lg" src={playlistThumbnail}></img>
            </div>
            <div className="font-bold text-white">
                {playlistName}
            </div>
            <div className="text-xs text-gray-200">{playlistDescription}</div>
        </div>
    );
}

export default Home;