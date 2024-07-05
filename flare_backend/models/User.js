//How to create a model
//  1. require mongoose
//  2. create a mongoose schema (structure)
//  3. adding the model to the database

const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSongs: {
        type: String,
        default: "",
    },
    likedPlaylists: {
        type: String,
        default: "",
    }
});

const userModel = mongoose.model("User", User);

module.exports = userModel;