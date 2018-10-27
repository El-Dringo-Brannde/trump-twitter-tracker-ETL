/* eslint no-return-assign:0 */

const { isEqual } = require('lodash');
const scheduler = require('node-schedule');
const commandLineArgs = require('command-line-args');

const { CLAOptions } = require('./../config/CLA');

const CLA = commandLineArgs(CLAOptions);

function buildScheduleTimer() {
	delete CLA.port;
	const rule = new scheduler.RecurrenceRule();
	const ruleCopy = JSON.parse(JSON.stringify(rule));

	Object.keys(CLA).map(ruleOption => (rule[ruleOption] = CLA[ruleOption]));

	if (isEqual(ruleCopy, rule))
		// default timer of 5 mintues
		rule.minute = 5;

	return rule;
}

exports.buildScheduleTimer = buildScheduleTimer;
