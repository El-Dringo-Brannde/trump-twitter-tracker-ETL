const CLAOptions = [
	{ name: 'port', alias: 'p', type: Number },
	{ name: 'minute', alias: 'm', type: Number },
	{ name: 'hour', alias: 'h', type: Number },
	{ name: 'second', alias: 's', type: Number },
	{ name: 'day', alias: 'd', type: String },
	{ name: 'duration', alias: 'd', type: String },
	{ name: 'phrase-count', type: Number, multiple: true, defaultOption: 1 }
];

const timeTables = {
	week: {
		loopCount: 52,
		tweetCount: 49
	},
	month: {
		loopCount: 13,
		tweetCount: 196
	},
	year: {
		loopCount: 16,
		tweetCount: 200
	},
	single: {
		loopCount: 3200,
		tweetCount: 1
	}
}

exports.timeTables = timeTables

exports.CLAOptions = CLAOptions;
