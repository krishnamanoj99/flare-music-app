import { useContext } from "react";
import songContext from "../../contexts/songContext";

const SingleSongCard = ({info, playSound}) => {
    const {currentSong, setCurrentSong} = useContext(songContext);
    
    return (
        <div className="hover:bg-white flex w-full h-1/6 items-center p-4 rounded-md space-x-6"
        onClick={()=>{
            setCurrentSong(info);
        }}>
            <div
                className="w-28 h-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url("${info.thumbnail}")`,
                }}
            ></div>
            <div className="flex w-full">
                <div className="w-5/6">
                    <div className="font-semibold text-xl">
                        {info.name}
                    </div>
                    <div className="text-xs">
                        {info.artist.firstName + " " + info.artist.lastName}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleSongCard;