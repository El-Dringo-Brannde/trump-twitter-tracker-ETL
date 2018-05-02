let twit = require('twitter')
let keys = require('./../config/keys')
let parser = require('./parser')

class twitterEngine {
   constructor() {
      this.client = new twit({
         consumer_key: keys.consumerKey,
         consumer_secret: keys.consumerSecret,
         access_token_key: keys.accessToken,
         access_token_secret: keys.tokenSecret
      });
      this.parser = parser
      this.lateID = null;
      this.startEngine();
   }

   async startEngine() {
      var i = 0;
      // while (i < 30) {
      let tweets = await this.pullTweets(this.lateID);
      this.parser.parseTweets(tweets);
      this.saveTweets();
      // } // pull theoretically a month of tweets
   }

   async pullTweets() {
      var params = {
         screen_name: 'realDonaldTrump',
         tweet_mode: 'extended',
         count: 200, // Trump tweets an avg. of 7 times a day
         trim_user: true,
      }; // pull a days worth of tweets
      if (this.lateID)
         params.max_id = this.lateID

      let tweets = await this.client.get('statuses/user_timeline', params);
      // console.log(tweets)
      return tweets
   }

   saveTweets() { }

}
new twitterEngine();