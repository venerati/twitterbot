console.log('bot.js has started');

var Twit = require('twit');

//this references a twitterconfig.js that has all the auth keys needed to connnect to twitter.
//this is kept seperate for security reasons.
var Tconfig = require('./twitterconfig');

//object that handles the twitter account info.
var T = new Twit(Tconfig);

//stream is set up to look at the bot's user account
var stream = T.stream('user');

//anytime some one tweets at the bot it will trigger tweetEvent
stream.on('tweet', tweetEvent);


//this function dictates what happens when some one tweets the bot
function tweetEvent(eventMsg) {

	var replyTo = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	//this var holds what the program will tweet to the account
	var tweet = {
		status:'I see ' + from + ' wishes to speak to the bot'
	};

	//if the stream sees that some one tweeted @celifane then it triggers the postTweet function
	if (text.includes('@celifane')) {
		postTweet();
	} else {
		console.log('postTweet not triggered');
	};

	function postTweet () {

		//this is the actual  action of posting (action,variable being acted upon, function being called)
		T.post('statuses/update', tweet, tweeted); 

		function tweeted(err, data, response){
  			if (err) {
  			console.log(err);
  			} else {
  			console.log('postTweet worked');
  			}
		};
	};
};




