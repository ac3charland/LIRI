require("dotenv").config();
var keys = require("./keys.js");

var command = process.argv[2];
var argument = process.argv[3];

function bandsInTown(artist) {

}

function spotify(songName) {

}

function omdb(movieName) {

}

function fs(argument) {

}

switch (command) {
    case "concert-this":
        bandsInTown(argument);
        break;
    case "spotify-this-song":
        spotify(argument);
        break;
    case "movie-this":
        omdb(argument);
        break;
    case "do-what-it-says":
        fs(argument);
        break;
    default:
        console.log("Unrecognized command.")
}