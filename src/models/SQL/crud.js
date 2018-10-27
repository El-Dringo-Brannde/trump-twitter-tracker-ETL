const mysql = require('mysql2/promise');

module.exports = class CRUD {
	constructor(configObj) {
		this.sql = null;
		this.sqlConnectionObj = configObj;
	}

	async init() {
		await this.connectToDB();
	}

	async connectToDB() {
		try {
			this.sql = await mysql.createConnection(this.sqlConnectionObj);
			return this.sql;
		} catch (err) {
			return err;
		}
	}

	async safeExec(query, escaped) {
		try {
			const result = await this.sql.execute(query, escaped);
			return { Result: result[0] };
		} catch (err) {
			return { Err: err };
		}
	}

	async freeQuery(query) {
		try {
			return await this.sql.execute(query);
		} catch (err) {
			return err;
		}
	}

	async create(columns, values, escaped) {
		return this.safeExec(
			`INSERT INTO ${this.table} (${columns}) VALUES (${values})`,
			escaped
		);
	}

	async createInTable(columns, table, values, escaped) {
		return this.safeExec(
			`INSERT INTO ${table} (${columns}) VALUES (${values})`,
			escaped
		);
	}

	async read(columns = `*`, escaped) {
		return this.safeExec(`Select ${columns} FROM ${this.table}`, escaped);
	}

	async readInTable(
		columns = `*`,
		table = `${this.table}`,
		conditions = '',
		escaped
	) {
		return this.safeExec(
			`Select ${columns} FROM ${table} WHERE ${conditions}`,
			escaped
		);
	}

	async update(columns, conditions, escaped) {
		return this.safeExec(
			`UPDATE ${this.table} SET ${columns} WHERE ${conditions}`,
			escaped
		);
	}

	async delete(conditions, escaped) {
		return this.safeExec(
			`DELETE FROM ${this.table} WHERE ${conditions}`,
			escaped
		);
	}

	async deleteInTable(table, conditions, escaped) {
		return this.safeExec(
			`DELETE FROM ${table} WHERE ${conditions}`,
			escaped
		);
	}
};
