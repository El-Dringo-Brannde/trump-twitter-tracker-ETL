let mongoDB = require('./../mongoDB/mongo')
let self;

module.exports = class database extends mongoDB {
   constructor() {
      super()
      self = this;
   }

   async saveTweets(tweets) {
      return await self.create(tweets)
   }
} 