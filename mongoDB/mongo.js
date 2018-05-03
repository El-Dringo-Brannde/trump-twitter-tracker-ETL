let crud = require('./CRUD');
let mongoID = require('mongodb').ObjectID


module.exports = class mongoDB extends crud {
   constructor() {
      super()
      this.url = 'http://localhost';
   }

   paginate(req, data, res) {
      let originalUrl = req.originalUrl.split('?')[0]
      let query = req.query
      data = data.slice(query.limit * (query.page - 1), query.limit * query.page)
      let respObj = {
         prevPage: `${this.url}${originalUrl}/?limit=${query.limit}&page=${parseInt(query.page) - 1}`,
         nextPage: `${this.url}${originalUrl}/?limit=${query.limit}&page=${parseInt(query.page) + 1}`,
         data: data
      }
      res.json(respObj)
   }

   async pullFromArray(selectingField, selectingVal, array, arrayObjID) {
      let selecting = {
         [selectingField]: selectingVal
      }
      let updating = {
         $pull: {
            [array]: {
               uuid: arrayObjID
            }
         }
      }
      return await this.removeObjectFromArray(selecting, updating)
   }

   async create(inserting) {
      if (Array.isArray(inserting))
         return await this.createMany(inserting)
      else
         return await this.createOne(inserting)
   }

   async readById(id) {
      let selector = {
         _id: mongoID(id)
      }
      return await this.read(selector)
   }

   async readAll() {
      return await this.read({});
   }

   async count(selector) {
      let retVal = await this.read(selector);
      return retVal.length
   }

   async deleteById(id) {
      let selector = {
         _id: this.id(id)
      }
      return await this.delete(selector);
   }

   async update(selector, updateVal, multi = false) {
      if (multi)
         return await this.updateMany(selector, updateVal);
      else
         return await this.updateOne(selector, updateVal);
   }

   async delete(selector, multi = false) {
      if (multi)
         return await this.deleteMany(selector);
      else
         return await this.deleteOne(selector);
   }
}