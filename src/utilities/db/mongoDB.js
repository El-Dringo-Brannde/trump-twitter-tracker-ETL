exports.multiMatchingORStatement = (key, values) => ({
	$or: values.map(value => ({ [key]: new RegExp(value, 'i') }))
});
