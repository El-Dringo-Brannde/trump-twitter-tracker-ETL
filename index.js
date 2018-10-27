const { fork } = require('child_process')
const CLA = require('command-line-args')
const scheduler = require('node-schedule')

require('perfected-prototypes')


const { CLAOptions } = require('./src/config/CLA')
const { buildScheduleTimer } = require('./src/utilities/scheduler')
const webServer = require('./webserver')

/**
 * The base data engine that starts the web server, find jobs, and forks off the appropriate 
 * workers for each job that it finds via the multiprocessing file. 
 * Please refer to the README for instructions on how to add jobs
 */
class DataEngine {
	constructor() {
		this.jobs = null;
		this.CLA = null;
		this.webServer = null;
		this.activeWorkers = []
	}

	/**
	 * Finds all the workers in the 'workers' folder, pulls the command line arguements 
	 * and starts the webserver
	 */
	async initialize() {
		this.jobs = await this.findWorkers()
		this.CLA = CLA(CLAOptions)
		this.webServer = new webServer(this)
		await this.webServer.startWebServer()
	}


	/**
	 * Get all the `workers/{WORKER_FOLDER}/index.js` files and return their path
	 */
	async findWorkers() {
		this.workers = require('require-all')({
			dirname: `${__dirname}/src/workers`,
			filter: 'index.js',
			recursive: true,
			map: (name, path) => { return path }
		});
	} // find all the workers 


	/**
	 * Start each worker job
	 */
	async startEngine() {
		for (var job in this.workers) {
			this.startJob(job)
		}
	}

	/**
	 * With the path of the worker, spin off another nodeJS process, and set up a communication
	 * channel that allows for signaling of start and done times
	 * @param {string} job - The path to the worker index file in the `workers` folder. 
	 */
	startJob(job) {
		let worker = fork('./multiprocessor.js', {
			env: {
				workerPath: job
			}
		})

		worker.on('message', msg => {
			const { done, workerName } = msg
			this.activeWorkers.push(workerName)

			if (done === true) {
				console.log(`It looks like ${workerName} is done!`)
				worker.kill()
				this.activeWorkers = this.activeWorkers.remove(workerName)
				console.log(`Active workers left: ${this.activeWorkers}`)
			}
		})
	}
}


const DE = new DataEngine();
(
	/**
	 * Initalize the data engine, webserver, configure scheduling if in production
	 */
	async function () {
		await DE.initialize() // find all the jobs, and start webserver
		const schedule = buildScheduleTimer()

		if (process.NODE_ENV === 'production')
			scheduler.scheduleJob(schedule, async () => {
				await DE.startEngine()
			})
		else
			await DE.startEngine()

	}
)(); // start Engine on load

