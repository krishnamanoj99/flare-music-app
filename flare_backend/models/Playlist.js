//How to create a model
//  1. require mongoose
//  2. create a mongoose schema (structure)
//  3. adding the model to the database

const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",
        }
    ],
});

const playlistModel = mongoose.model("Playlist", Playlist);

module.exports = playlistModel;