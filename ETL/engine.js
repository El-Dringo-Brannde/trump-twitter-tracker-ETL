let twit = require('twitter')
let keys = require('./../config/keys')
let parser = require('./parser')
let db = require('./db')

let CLA = require('./../util/CLA')
let args = require('./../config/CLA')

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
      this.db = new db()
      this.db = await this.db.connectToMongo('CS458', `trump-tweets-${CLA.duration}`)
      if (CLA.duration == 'year')
         await this.pullYear()
      else
         await this.pullWeekMonth()
      console.log('Done!')
      process.exit(0)
   }

   async pullWeekMonth() {
      let tweets = [], i = 0;
      while (i < args[CLA.duration].loopCount) { // twitter only keeps 3,200 of the latest tweets
         let pull = await this.pullTweets(this.endID)
         tweets = tweets.concat(pull);
         let parsedTweets = await this.parser.parseTweets(tweets);
         this.addMetadata(parsedTweets)
         let result = await this.db.saveTweets(parsedTweets)
         i++
      }
   }

   async pullYear() {
      let tweets = [], i = 0;
      while (i < args[CLA.duration].loopCount) { // twitter only keeps 3,200 of the latest tweets
         let pull = await this.pullTweets(this.endID)
         tweets = tweets.concat(pull);
         i++
      }
      let parsedTweets = await this.parser.parseTweets(tweets);
      this.addMetadata(parsedTweets)
      let result = await this.db.saveTweets(parsedTweets)
   }

   addMetadata(parsedTweets) {
      parsedTweets.startDate = this.startDate
      parsedTweets.endDate = this.endDate
      parsedTweets.startID = this.startID
      parsedTweets.endID = this.endID
      parsedTweets.type = CLA['phrase-count'][0]
   }

   async pullTweets() {
      var params = {
         screen_name: 'realDonaldTrump',
         tweet_mode: 'extended',
         count: args[CLA.duration].tweetCount, // Trump tweets an avg. of 7 times a day
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