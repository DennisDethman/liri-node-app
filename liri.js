//Required vars*****************************

require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

//Keys***************************************

var spotifyKeys = new Spotify(keys.spotify);
var twitterKeys= new Twitter(keys.twitter);

//Global vars********************************

var inputIndex2 = process.argv[2];
var inputIndex3 = process.argv[3];

//twitter************************************

switch (inputIndex2) {
    case 'my-tweets':
    twitterKeys.get('statuses/user_timeline', function(err, tweets, response) {
        if(err) throw err;
        for (var i = 0; i < 20; i++){
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
        }
      });
    break;
        
//Spotify*************************************
//else statment for ace of base "the sign"
    case "spotify-this-song":
    spotifyKeys.search({ type: 'track', query: inputIndex3, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }else
        console.log("-------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song title: " + data.tracks.items[0].name);
        console.log("Preview link:")
        console.log(data.tracks.items[0].external_urls);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-------------------");
    });
    break;
        
//OMDB*****************************************
        
    case "movie-this":
    var request = require("request");
        request("http://www.omdbapi.com/?t=" + inputIndex3 +"&apikey=trilogy", function(err, response, body) {
        if (!err && response.statusCode === 200 && inputIndex3 != undefined) {
            console.log("-------------------")
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release date: " + JSON.parse(body).Released);
            console.log("IMDB rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Rotton Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
            console.log("Country produced in: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------");
            
        }else{
            var request = require("request");
            request("http://www.omdbapi.com/?t=mr%20nobody=&apikey=trilogy", function(err, response, body) {
            console.log("-------------------")
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release date: " + JSON.parse(body).Released);
            console.log("IMDB rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Rotton Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
            console.log("Country produced in: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------");
            
                });
            }
        });
    break;

//DO-it***********************************************************
        
    case "do-what-it-says":
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArray = data.split(",");
        spotifyKeys.search({ type: 'track', query: dataArray[1] }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            var randomTxt =JSON.stringify(data, null, 2)
            console.log("-------------------");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song title: " + data.tracks.items[0].name);
            console.log("Preview link:")
            console.log(data.tracks.items[0].external_urls);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("-------------------");
        });  
    }); 
    break;
    default:
    console.log("********************");
    console.log("Please use one of these commands:\nmy-tweets\nspotify-this-song '<song title>\nmovie-this '<movie title>'\ndo-what-it-says");
    console.log("Use + between multiple search words");    
    console.log("********************");
}