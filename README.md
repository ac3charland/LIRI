# LIRI

*LIRI* is a knock off of Apple's Siri, which interperets user commands and can perform various searches. *LIRI* runs from the terminal using Node.js and recognizes four commands:

* `concert-this + '[band]'`: searches the Bandsintown API for upcoming concerts featuring the givne artist.

* `spotify-this-song + '[song]'`: searches the Spotify API and returns information about the top search result in spotify for the given song name. If no song name is given, *The Sign* by Ace of Base is searched instead.

* `movie-this + '[movie title]'`: queries the OMDB API and returns information about the given movie. If no movie name is given, *LIRI* searches the movie "Mr. Nobody" instead.

* `do-what-it-says`: *LIRI* reads from a .txt file and runs an API call based on the contents of the file. For example, the following text would result in an OMDB search for "Star Wars":
    >movie-this,"Star Wars"

