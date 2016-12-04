console.log('bot.js has started');

var Twit = require('twit');
//this references a twitterconfig.js that has all the auth keys needed to connnect to twitter.
//this is kept seperate for security reasons.
var Tconfig = require('./twitterconfig');

//object that handles the twitter account info.
var T = new Twit(Tconfig);

//this request the information from twitter. it is set to pull 2 things with 'space'
T.get('search/tweets', { q: '#space', count: 2 }, function(err, data, response) {
	//sets tweets to hold the data returned from the request
	var tweets = data.statuses;
	//goes through each search result one by one.
	for (var i = 0; i < tweets.length; i++) {
		console.log(tweets[i].text);
	}
});

var tweet = {
	status: 'code test 2'
};

T.post('statuses/update', tweet, tweeted); 

function tweeted(err, data, response){
  if (err) {
  	console.log('it is broken');
  } else {
  	console.log('it worked');
  }
}

