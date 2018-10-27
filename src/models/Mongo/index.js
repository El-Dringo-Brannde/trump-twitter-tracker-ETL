const { MongoID } = require('mongodb');

const CRUD = require('./crud');

// class for more complex mongoDB queries that rely on CRUD operations
module.exports = class mongoDB extends CRUD {
	constructor(defaultConfig) {
		super(defaultConfig);
		this.mongoID = MongoID;
	}

	async aggregate(aggregation) {
		return this.db.aggregate(aggregation);
	}

	async create(inserting) {
		if (Array.isArray(inserting)) {
			return this.createMany(inserting);
		}
		return this.createOne(inserting);
	}

   /**
    * Look up a document by the _id field
    * @param {string} id - The mongo ID of the document to look up 
    * @returns {array} consisting of single document
    */
	async readById(id) {
		const selector = {
			_id: this.mongoID(id)
		};
		return this.read(selector);
	}

   /**
    * Get all documents in the default database and collection 
    * @returns {array} All the documents 
    */
	async readAll() {
		return this.read({});
	}

	async readInDatabaseAndCollection(db, coll, query) {
		try {
			return this.connection
				.db(db)
				.collection(coll)
				.find(query)
				.toArray();
		} catch (err) {
			return err;
		}
	}

	async readInTable(collName, searchObj) {
		try {
			return this.database
				.collection(collName)
				.find(searchObj)
				.toArray();
		} catch (err) {
			return err;
		}
	}

	async createInDatabaseAndCollection(db, coll, query) {
		try {
			return this.connection
				.db(db)
				.collection(coll)
				.insertOne(query);
		} catch (err) {
			return err;
		}
	}

	async ifNotExistsCreateInDatabaseAndCollection(db, coll, query) {
		try {
			return this.connection
				.db(db)
				.collection(coll)
				.update(query, { $set: query }, { upsert: true });
		} catch (err) {
			return err;
		}
	}

	async count(searchObj) {
		try {
			const retVal = this.read(searchObj);
			return retVal.length;
		} catch (err) {
			return err;
		}
	}

	async removeById(id) {
		const searchObj = {
			_id: this.id(id)
		};
		return this.delete(searchObj);
	}

	async update(searchObj, updateVal, multi = false) {
		if (multi) {
			return this.updateMany(searchObj, updateVal);
		}
		return this.updateOne(searchObj, updateVal);
	}

	async remove(searchObj, multi = false) {
		if (multi) {
			return this.deleteMany(searchObj);
		}
		return this.deleteOne(searchObj);
	}
};
