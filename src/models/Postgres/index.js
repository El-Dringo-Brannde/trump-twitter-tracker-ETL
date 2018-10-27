/* eslint-disable */
const crud = require('./crud');

module.exports = class SQL extends crud {
	// NOTE: This only works for one query right now.
	// NOT compounded AND/OR only use to get stuff by ID.
	buildQueryByID(key, value) {
		return `${key} = ${value}`;
	}

	buildUpdateString(keys) {
		const splitKeys = keys.split(',');
		let query = ``;
		let idx = 1;
		for (const i in splitKeys) {
			const key = splitKeys[i];
			query += `${key} = \$${idx}, `; // eslint-disable-line
			idx++;
		} // match keys to the current escape index '$1'

		query = query.substring(0, query.length - 2); // remove trailing ', '
		return {
			query,
			idx
		};
	}
};
