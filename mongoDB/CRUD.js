var mongoObj = require('mongodb')
   .ObjectID;
let mongoClient = require('mongodb').MongoClient
let { url } = require('./../config/mongo')

module.exports = class CRUD {
   constructor() {
      // this.connectToMongo(db, collection)
      this.mongo_ID = mongoObj
   }

   async connectToMongo(db, collection) {
      this.db = await mongoClient.connect(url)
      this.mongo = this.db = this.db.db(db) // copy db for mongo v3+
      this.mongo = this.mongo.collection(collection)
      console.log('connected to mongo!')
      return this
   }

   switchDbAndCollection(dbName, collName) {
      this.mongo = this.db.db(dbName)
      this.mongo = this.db.collection(collName)
   }

   switchCollection(collName) {
      this.mongo = this.db.collection(collName)
   }

   aggregate(aggregation) {
      return new Promise((res, rej) => {
         this.mongo.aggregate(aggregation)
            .toArray((err, docs) => {
               if (!err)
                  res(docs)
               else
                  res(err)
            })
      })
   }

   async removeObjectFromArray(selecting, updating) {
      return await this.mongo.updateMany(selecting, updating)
   }

   async delete(selector) {
      return await this.mongo.deleteMany(selector)
   }

   async createOne(insertObj) {
      return await this.mongo.insertOne(insertObj);
   }

   async addToSet(selector, arrayAndVal) {
      return await this.mongo.updateMany(selector, { $addToSet: arrayAndVal }, { upsert: true })
   }

   async createMany(insertObjects) {
      return await this.mongo.insertMany(insertObjects);
   }

   async read(searchObj) {
      return await this.mongo.find(searchObj).toArray();
   }

   async readObjectInArray(selector, arrayQuery) {
      return await this.mongo.find(selector, arrayQuery).toArray();
   }

   async updateOne(searchObj, updateVal) {
      return await this.mongo.updateOne(searchObj, { $set: updateVal }, {
         upsert: true
      });
   }

   async updateMany(searchObj, updateVal) {
      return await this.mongo.updateMany(searchObj, { $set: updateVal }, {
         upsert: true
      });
   }

   async deleteOne(searchObj) {
      return await this.mongo.deleteOne(searchObj);
   }

   async deleteMany(searchObj) {
      return await this.mongo.deleteMany(searchObj);
   }
};