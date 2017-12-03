console.log('The bot is running');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);


// this is the function to welcome followers
var stream = T.stream('user');

stream.on('follow', followed);

function followed(eventMsg) {
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('@' + screenName + 'Welcome to Paradise! (Lost)');
}

// this generates two lines of paradise_lost from the text file

var count = -2;

function getLines() {
  increment_count();
  var fs = require("fs");
  var text = fs.readFileSync("./paradise_lost.txt").toString('utf-8');
  var textByLine = text.split("\n");
  return textByLine[count] + "\n" + textByLine[count + 1];
}

function increment_count() {
  count += 2;
}

//this is the tweet function

function tweetIt(txt) {
  var tweet = {
    status: txt
  };

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something went wrong");
    } else {
    console.log("It worked!");
    }
  }
}

//this is the interval function

setInterval(function(){tweetIt(getLines());},1000*600);
