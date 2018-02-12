require ('dotenv').config();
var request = require('request');
var keys = require("./keys.js"); // "Request" library
var spotify = keys.spotify;
var twitter = keys.twitter;
var consumer_key = twitter.consumer_key;
var consumer_secret = twitter.consumer_secret;
var access_token_key = twitter.access_token_key;
var access_token_secret = twitter.access_token_secret;
//console.log(spotify);
var client_id = spotify.id; // Your client id
var client_secret = spotify.secret; // Your secret 
//console.log(client_id);
//console.log(client_secret);


var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    //console.log(response);
  }
});

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};
//console.log(authOptions);
request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/codecrafter',// 
      //url: "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(token);
      //console.log(response);
    });
  }
  //console.log(token);
});