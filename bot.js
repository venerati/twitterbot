console.log('bot.js has started');

var Twit = require('twit');

var Tconfig = require('./twitterconfig');

//object that handles the twitter account info.
var T = new Twit(Tconfig);