let gram = require('gramophone')
let blackList = require('./../config/blackList')
let word = require('wordpos')
word = new word();


const gramOptions = {
   ngrams: [1],
   score: true,
   limit: 15,
   stopWords: blackList
}
class parser {
   contructor() {

      this.todaysWords = ''
      this.parsedWords = {}
   }

   async parseTweets(tweets) {
      this.todaysWords = ''
      this.buildTodaysWords(tweets)
      await this.pullWordTypes()
      this.pullPopularWords()
   }

   async pullWordTypes() {
      let { nouns, verbs, adjectives, adverbs } = await word.getPOS(this.todaysWords)
      this.parsedWords = {
         nouns: gram.extract(nouns.join(' '), gramOptions),
         verbs: gram.extract(verbs.join(' '), gramOptions),
         adjectives: gram.extract(adjectives.join(' '), gramOptions),
         adverbs: gram.extract(adverbs.join(' '), gramOptions)
      }
   }

   buildTodaysWords(tweets) {
      for (var i of tweets)
         this.todaysWords += i.full_text
   }

   pullPopularWords() {
      this.parsedWords.allWords = gram.extract(this.todaysWords, gramOptions)
   }
}

module.exports = new parser();