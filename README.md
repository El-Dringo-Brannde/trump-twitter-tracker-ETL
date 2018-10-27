## Trump Twitter Tracker ETL engine

### Summary 
The ETL tool used to pull trump tweets from twitter. Goes through all of Trumps tweets and aggregates them by a composition of all the words in his tweets, nouns, adjectives, adverbs, verbs, then ranks them on which words are used most frequently. 

Also allows the grouping of both single word.. words, along with 2 - 3 long phrases such as `Make America Great`. 

### How to Use

1. Install all the dependencies, `yarn`
2. Create a file called `mongo.js` under config folder, export your mongoDB connection string
3. Run with `bash`, such as `bash dataCollection.sh`
4. Wait to see the database populated
5. `$$Profit$$`

### To do 
1. Add a command line option to create a variable for pulling whatever twitter user one may like. 

### Related Projects
1. [Trump Twitter Tracker Server](https://github.com/El-Dringo-Brannde/trump-twitter-tracker-server) serves data from the database populated here. 
2. [Trump Twitter Tracker Web](https://github.com/El-Dringo-Brannde/Trump-Twitter-Tracker-Web) React Redux website hosted on Github pages.  
