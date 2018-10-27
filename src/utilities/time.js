const moment = require('moment');

function monthsBetweenDates(startDate, endDate) {
	const difference = moment(startDate).diff(moment(endDate), 'months', true);
	return Math.abs(difference);
}

exports.monthsBetweenDates = monthsBetweenDates;
