require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var argument = process.argv[3];


function bandsInTown(artist) {

    // var formattedArtist = artist.replace(" ", "%20")
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            
            var fBody = JSON.parse(body);
            console.log("Upcoming shows featuring " + artist + ": ");
            for (i in fBody) {
                var venue = fBody[i].venue
                var rawDate = fBody[i].datetime
                var momentDate = moment(rawDate, "YYYY-MM-DDTHH:mm:ss")
                var niceDate = momentDate.format("MM/DD/YYYY")
                console.log(`
                Venue: ${venue.name}
                Location: ${venue.city}, ${venue.region}
                Date: ${niceDate} 
                `)
            }
        }
    });
}

function runSpotify(songName) {
    
    if (!songName || songName === "") {
        songName = "The Sign Ace of Base"
    }
    
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var song = data.tracks.items[0]
        var artists = ""
        for (i in song.artists) {
            artists += song.artists[i].name + " "
        }
        
        console.log(`
            Song Name: ${song.name}
            Artist(s): ${artists}
            Album Name: ${song.album.name}
            Preview: ${song.preview_url}
        `)
    });
}

function omdb(movieName) {

    var formattedTitle = ""
     
    if (!movieName || movieName === "") {
        formattedTitle = "Mr. Nobody"
    } else {
        formattedTitle = movieName.replace(" ", "+")
    }
    var queryURL = "http://www.omdbapi.com/?t=" + formattedTitle + "&y=&plot=short&apikey=trilogy"
    request(queryURL, function (error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            // Then we print out the imdbRating
            fBody = JSON.parse(body)

            console.log(`
                ${fBody.Title}
                Year: ${fBody.Year}
                IMDB Rating: ${fBody.Ratings[0].Value}
                Rotten Tomatoes Rating: ${fBody.Ratings[1].Value}
                Country: ${fBody.Country}
                Language: ${fBody.Language}
                Plot: ${fBody.Plot}
                Actors: ${fBody.Actors}
            `)
        }
    });
}

function runfs() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var randomArr = data.split(",")
        execute(randomArr[0], randomArr[1])
    })
}

function execute(command, argument) {
    switch (command) {
        case "concert-this":
            bandsInTown(argument);
            break;
        case "spotify-this-song":
            runSpotify(argument);
            break;
        case "movie-this":
            omdb(argument);
            break;
        case "do-what-it-says":
            runfs();
            break;
        default:
            console.log("Unrecognized command.")
    }
}

execute(command, argument);


