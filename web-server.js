const { existsSync } = require('fs')
const express = require('express')()

/**
 * Web server that starts jobs from the master class via an HTTP endpoint
 */
module.exports = class WebServer {
	constructor(masterClass) {
		this.master = masterClass
		this.startWorkerFromServer = this.startWorkerFromServer.bind(this)
	}


	/**
	 * Stand up express and pull routes. 
	 */
	startWebServer() {
		express.listen(this.master.CLA.port, () => console.log(`Running on port ${this.master.CLA.port}`))
		this.loadRoutes()
	}

	/** 
	 * Initialize express routes
	 */
	loadRoutes() {
		express.get('/start-job/:jobName', this.startWorkerFromServer)
	}

	/**
	 * Via route params check to see if the job is available in the workers
	 * folder, if so start it and signal back to client
	 */
	async startWorkerFromServer(req, res) {
		const workerPath = `${__dirname}/src/workers/${req.params.jobName}`
		if (!existsSync(workerPath))
			res.json({ status: 403, message: 'Job not found in server' })
		else {
			const workOrder = workerPath
			this.master.startJob(workOrder)

			res.json({ status: 200, message: 'Job started successfully' })
		}
	}

}