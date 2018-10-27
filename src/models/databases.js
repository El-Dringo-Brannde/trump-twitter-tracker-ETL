const Mongodb = require('./Mongo/index');
const Sql = require('./SQL/index');
const Pg = require('./Postgres/index');

const logger = require('./../utilities/logger');

module.exports = class databaseWrapper {
	constructor(configObj) {
		this.configObj = configObj;
		this.workerName = configObj.workerName;

		this.Mongo = null;
		this.SQL = null;
		this.PG = null;

		this.errorLogger = null;
		this.infoLogger = null;
		this.warningLogger = null;
	}

	async initialize() {
		await this.initalizeDatabases();
		this.initializeLoggers();

		this.checkConnections();
	}

	logError(err) {
		const errMsg = {
			message: Error(err).stack.toString(),
			workerName: this.workerName
		};

		return logger.logError(errMsg, this.errorLogger);
	}

	logInfo(info) {
		const infoMsg = {
			message: info,
			workerName: this.workerName
		};
		return logger.logInfo(infoMsg, this.infoLogger);
	}

	logWarning(warning) {
		const warningMsg = {
			message: warning,
			workerName: this.workerName
		};
		return logger.logWarning(warningMsg, this.warningLogger);
	}

	async initalizeDatabases() {
		const { MongoDB, SQL, Postgres } = this.configObj;
		if (MongoDB) {
			this.Mongo = new Mongodb(MongoDB);
			await this.Mongo.init();
		}
		if (SQL) {
			this.SQL = new Sql(SQL);
			await this.SQL.init();
		}
		if (Postgres) {
			this.PG = new Pg(Postgres);
			await this.PG.init();
		}
	}

	checkConnections() {
		if (!this.Mongo) this.logWarning('Not connected to MongoDB');
		if (!this.SQL) this.logWarning('Not connected to SQL');
		if (!this.PG) this.logWarning('Not connected to Postgres');
	}

	initializeLoggers() {
		this.errorLogger = logger.initialize(this.workerName, 'error');
		this.infoLogger = logger.initialize(this.workerName, 'info');
		this.warningLogger = logger.initialize(this.workerName, 'warning');
	}
};
