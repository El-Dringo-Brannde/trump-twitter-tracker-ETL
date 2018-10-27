let mongoDB = require('./../mongoDB/mongo')
let self;

module.exports = class database extends mongoDB {
   constructor() {
      super()
      self = this;
   }

   async saveTweets(tweets) {
       console.log(`Collected dates from ${tweets['endDate']} to ${tweets['startDate']}`)
      return await self.update({
          endID: {
              $gte: tweets['endID'], 
          }, 
          startID:{
              $lte: tweets['startID']
            }}, 
        tweets)
   }
} 