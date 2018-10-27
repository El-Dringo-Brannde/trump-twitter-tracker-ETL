/* eslint no-console:0 */

const winston = require('winston');

const { combine, timestamp, prettyPrint } = winston.format;
const chalk = require('chalk');

const fs = require('fs');
const { homeDir } = require('./../config/constants');

module.exports = class logging {
	static initialize(name, level) {
		if (!fs.existsSync(`${homeDir}/logs/${name}`))
			fs.mkdirSync(`${homeDir}/logs/${name}`);

		return winston.createLogger({
			level,
			colorize: true,
			format: combine(timestamp(), prettyPrint()),
			transports: [
				new winston.transports.File({
					filename: `${homeDir}/logs/${name}/${level}.log`,
					level
				})
			]
		});
	}

	static logError(err, logger) {
		logger.error(err);
		console.log(chalk.red(err.message));
		return err;
	}

	static logInfo(message, logger) {
		logger.info(message);
		console.log(chalk.green(message.message));
		return message;
	}

	static logWarning(warning, logger) {
		logger.warn(warning, logger);
		console.log(chalk.yellow(warning.message));
	}
};
