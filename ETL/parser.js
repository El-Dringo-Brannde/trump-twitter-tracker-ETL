let gram = require('gramophone')
let blackList = require('./../config/blackList')
let word = require('wordpos')
word = new word();

const CLA = require('./../util/CLA')

const gramOptions = {
      ngrams: CLA['phrase-count'],
      score: true,
      stem: true,
      limit: 30,
      stopWords: blackList
}

class parser {
      contructor() {
            this.todaysWords = ''
            this.parsedWords = {}
            this.hashTags = []
            this.mentions = []
            this.retweetTotal = 0
            this.favoriteTotal = 0
      }

      reset() {
            this.todaysWords = ''
            this.parsedWords = {}
            this.hashTags = []
            this.mentions = []
            this.retweetTotal = 0
            this.favoriteTotal = 0
      }

      async parseTweets(tweets) {
            this.reset()
            this.buildTodaysWords(tweets)
            await this.pullWordTypes()
            this.pullPopularWords()
            this.countHashtags(tweets)
            this.countMentions(tweets)
            this.countRetweets(tweets)
            this.countFavorites(tweets)

            return {
                  nouns: this.parsedWords.nouns,
                  verbs: this.parsedWords.verbs,
                  adjectives: this.parsedWords.adjectives,
                  adverbs: this.parsedWords.adverbs,
                  allWords: this.parsedWords.allWords,
                  hashTags: this.hashTags,
                  mentions: this.mentions,
                  retweets: this.retweetTotal,
                  favorites: this.favoriteTotal
            }
      }

      countRetweets(tweets) {
            for (var i of tweets)
                  this.retweetTotal += i.retweet_count
      }

      countFavorites(tweets) {
            for (var i of tweets)
                  this.favoriteTotal += i.favorite_count
      }

      countMentions(tweets) {
            let mentions = ''
            for (var i of tweets)
                  for (var j of i.entities.user_mentions)
                        mentions += ` ${j.screen_name} `
            this.mentions = gram.extract(mentions, gramOptions)
      }

      countHashtags(tweets) {
            let hashTags = ''
            for (var i of tweets)
                  for (var j of i.entities.hashtags)
                        hashTags += ` ${j.text} `
            this.hashTags = gram.extract(hashTags, gramOptions)
      }

      async pullWordTypes() {
            let { nouns, verbs, adjectives, adverbs } = await word.getPOS(this.todaysWords)

            this.parsedWords = {
                  nouns: gram.extract(nouns, gramOptions),
                  verbs: gram.extract(verbs, gramOptions),
                  adjectives: gram.extract(adjectives, gramOptions),
                  adverbs: gram.extract(adverbs, gramOptions)
            }
      }

      buildTodaysWords(tweets) {
            for (var i of tweets)
                  this.todaysWords += i.full_text
            this.todaysWords = this.todaysWords.split(' ')
      }

      pullPopularWords() {
            this.parsedWords.allWords = gram.extract(this.todaysWords, gramOptions)
      }
}

module.exports = new parser();