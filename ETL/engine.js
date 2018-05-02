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
      this.endID = null;
      this.startEngine();
   }

   async startEngine() {
      var i = 0;
      while (i < 2) {
         let tweets = await this.pullTweets(this.endID);
         let parsedTweets = await this.parser.parseTweets(tweets);
         this.addMetadata(parsedTweets)
         this.saveTweets()
         i++
      } // pull theoretically a month of tweets
   }

   addMetadata(parsedTweets) {
      parsedTweets.startDate = this.startDate
      parsedTweets.endDate = this.endDate
      parsedTweets.startID = this.startID
      parsedTweets.endID = this.endID
   }

   async pullTweets() {
      var params = {
         screen_name: 'realDonaldTrump',
         tweet_mode: 'extended',
         count: 49, // Trump tweets an avg. of 7 times a day
         trim_user: true,
      }; // pull a days worth of tweets
      if (this.endID)
         params.max_id = this.endID

      let tweets = await this.client.get('statuses/user_timeline', params);
      this.startDate = new Date(tweets[0].created_at)
      this.endDate = new Date(tweets[tweets.length - 1].created_at)
      this.startID = tweets[0].id
      this.endID = tweets[tweets.length - 1].id
      return tweets
   }

   saveTweets() {

   }

}
new twitterEngine();