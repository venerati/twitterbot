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


//stream is set up to look at the bot's user account
var stream = T.stream('user');

//anytime some one tweets at the bot it will trigger tweetEvent
stream.on('tweet', tweetEvent);


//this function dictates what happens when some one tweets the bot
function tweetEvent(eventMsg) {

	var replyTo = eventMsg.in_reply_to_screen_name;
	console.log(replyTo);
	var text = eventMsg.text;
	console.log(text);
	var from = eventMsg.user.screen_name;
	console.log(from);
	
	if (text.includes('@celifane')) {
		postTweet();
	} else {
		console.log('post not triggered');
	}
};

//this var holds what the program will tweet to the account
var tweet = {
	status: 'I see some one tweeted me'
};

function postTweet () {

	//this is the actual  action of posting (action,variable being acted upon, function being called)
	T.post('statuses/update', tweet, tweeted); 

	function tweeted(err, data, response){
  		if (err) {
  		console.log('it is broken');
  		} else {
  		console.log('it worked');
  		}
	};
};


