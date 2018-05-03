let twit = require('twitter')
let keys = require('./../config/keys')
let parser = require('./parser')
let db = require('./db')

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
      this.db = new db()
      this.db = await this.db.connectToMongo('CS458', 'trump-tweets-week')
      let tweets = []
      while (i < 65) { // twitter only keeps 3,200 of the latest tweets 65 * 49 = ~3200 
         tweets = await this.pullTweets(this.endID);
         let parsedTweets = await this.parser.parseTweets(tweets);
         this.addMetadata(parsedTweets)
         let result = await this.db.saveTweets(parsedTweets)
         i++
      } // pull theoretically a month of tweets
      console.log('Done!')
      process.exit(0)
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
      }; // pull a weeks worth of tweets
      if (this.endID)
         params.max_id = this.endID

      let tweets = await this.client.get('statuses/user_timeline', params);
      this.startDate = new Date(tweets[0].created_at)
      this.endDate = new Date(tweets[tweets.length - 1].created_at)
      this.startID = tweets[0].id
      this.endID = tweets[tweets.length - 1].id
      return tweets
   }
}
new twitterEngine();