
/**
 * WorkOrder class that intializes the workers in various nodeJS processes 
 * and awaits their job/data collection
 */
class WorkOrder {
	static async  initializeWorker(worker) {
		worker = new worker()
		await worker.initialize()
		return worker
	}

	static async startWorkOrder(worker) {
		await worker.startJob()
	}
}


(
	/**
	 * Pull the worker path from the spun off nodeJS process via environment variables.
	 * Then, initializes any database configurations set up, and starts the worker process to collect data. 
	 */
	async () => {
		if (process.env.workerPath) {
			const { workerPath } = process.env
			let worker = require(workerPath)

			worker = await WorkOrder.initializeWorker(worker)
			WorkOrder.startWorkOrder(worker)
		}
	}
)(); // Allow for async-ability on load. 

module.exports = WorkOrder