console.log('bot.js has started');

//-----Twitter dependencies----------------------
var Twit = require('twit');

//this references a twitterconfig.js that has all the auth keys needed to connnect to twitter.
//this is kept seperate for security reasons.
var tConfig = require('./twitterconfig');

//object that handles the twitter account info.
var T = new Twit(tConfig);

//stream is set up to look at the bot's user account
var stream = T.stream('user');


//---------Weather dependencies-------------------------------

var Weather = require("weather-zip");
 
weather = new Weather("d2e6bdc7b0ff7698eb14570d76bd23de");

//----------------------------------------


//anytime some one tweets at the bot it will trigger tweetEvent
stream.on('tweet', tweetEvent);

//this function dictates what happens when some one tweets the bot
function tweetEvent(eventMsg) {

	var replyTo = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	//this var holds what the program will tweet to the account
	var tweet = {
		status:''
	};

	//take the text variable and just leave numbers.
    var zip = text.replace(/\D/g,'');

    //count the string legnth
    var zipLength = zip.length;

   	//takes the zip and pulls the corrisponding data, then console logs it.
	weather.get(zip).then(function (data){

	var temp = data.currently.temperature;
	var windSpeed = data.currently.windSpeed;

		//see if the zipLength variable contains 5 numbers.
    	if (zipLength === 5) {
    		console.log('zip works')
    	
    		tweet ={
    			status:'@' + from + ' it is ' + temp + ' degrees, wind speed is ' + windSpeed + ' MPH in ' + zip  
    		};

    		postTweet();
    	} else {
    		console.log('zip does not work')

    		tweet ={
    			status:'@' + from + ' Your tweet can only contain 5 numbers'
    		};

    		postTweet();
    	};
	});

    

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




