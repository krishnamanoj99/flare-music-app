const express = require("express");
const app = express();
//with the help of these two lines we brought the functionality of express to our file

const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const User = require("./models/User");

const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");


const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());

mongoose
    .connect("mongodb+srv://krishnamanoj99:"+ process.env.MONGO_PASSWORD +"@cluster0.hpbftl7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {})
    .then((x) => {
        console.log("atlas connected");
    });


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function (err, user) {
        // done(error, doesTheUserExist)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

//API : GET type
app.get("/", (req, res) => {
    //req contains all data for request
    //res contains all data for response
    res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

//this is to run this server on the given port
const port = 8000;
app.listen(port, ()=> {
    console.log("App is running on port " + port);
});