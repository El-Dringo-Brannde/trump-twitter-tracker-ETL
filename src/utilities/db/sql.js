/* eslint-disable */
module.exports = class SQLUtil {
	static pullObjectKeysAndValues(obj) {
		let escape = '?';
		for (const i in Object.keys(obj).length - 1) escape += ',?';

		return {
			keys: Object.keys(obj),
			escapes: escape,
			vals: Object.values(obj)
		};
	}

	static mergeKeysAndEscapes(keys, escapes) {
		let updateString = '';
		for (const i of keys) updateString += `\`${i}\` = ${escapes}, `;
		updateString = updateString.slice(0, updateString.length - 2); // get rid of last ', '
		return updateString;
	}
};
