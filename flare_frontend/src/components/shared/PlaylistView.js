import Card from "./Card";

const PlayListView = ({ title, CardsData }) => {
    return (
        <div className="mt-3">
            <div className="text-2xl font-semibold p-2">{title}</div>
            <div className="w-full bg-gray-300 grid gap-4 grid-cols-5">
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

export default PlayListView;