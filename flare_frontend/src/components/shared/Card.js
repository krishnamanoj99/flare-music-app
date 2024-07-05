import { useNavigate } from "react-router-dom";

const Card = ({ playlistThumbnail, playlistName, playlistDescription, playListId }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-flare-charcoal-blue hover:bg-flare-dark-blue cursor-pointer w-full p-3 mx-2 rounded-xl" onClick={() => {
            navigate("/playlist/" + playListId);
        }}>
            
            <div
                className="w-full h-32 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${playlistThumbnail})`,
                }}
            ></div>
            <div className="font-bold text-white">
                {playlistName}
            </div>
            <div className="text-xs text-gray-200">{playlistDescription}</div>
        </div>
    );
}

export default Card;