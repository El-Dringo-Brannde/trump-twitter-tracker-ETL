let twit = require('twitter')
let keys = require('./../config/keys')
let parser = require('./parser')
let gram = require('gramophone')

class twitterEngine {
   constructor() {
      this.client = new twit({
         consumer_key: keys.consumerKey,
         consumer_secret: keys.consumerSecret,
         access_token_key: keys.accessToken,
         access_token_secret: keys.tokenSecret
      });
      this.parser = parser
      this.tweets = null;
      this.startEngine();
   }

   async startEngine() {
      let tweets = await this.pullTweets();
      this.parser.parseTweets(tweets);
      this.saveTweets();
   }

   async pullTweets() {
      let tweets = null;
      for (var i in [1]) {
         var params = {
            screen_name: 'realDonaldTrump',
            tweet_mode: 'extended',
            count: 2,
            trim_user: true
         };

         tweets = await this.client.get('statuses/user_timeline', params);
         let f = gram.extract((tweets[0].full_text).toString(), { ngrams: 1, score: true, min: 2 })
         console.log(f)
         return tweets
      }
   }


   saveTweets() { }

}
new twitterEngine();