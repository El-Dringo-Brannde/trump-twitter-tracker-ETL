const crud = require('./crud');

module.exports = class SQL extends crud {
	async readAll() {
		return this.read(`*`);
	}

	async readById(table, idKey, id) {
		return this.readInTable('*', table, `\`${idKey}\` = ?`, [id]);
	}
};
