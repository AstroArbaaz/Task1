"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFetchConfig = exports.RateLimiter = void 0;
class RateLimiter {
    config;
    queue = [];
    isProcessing = false;
    constructor(config) {
        this.config = config;
    }
    async enqueue(task) {
        this.queue.push(task);
        if (!this.isProcessing) {
            this.processQueue();
        }
    }
    async processQueue() {
        this.isProcessing = true;
        while (this.queue.length > 0) {
            // Process batch
            const batchTasks = this.queue.splice(0, this.config.requestsPerBatch);
            for (const task of batchTasks) {
                await task();
                await this.sleep(1000 / this.config.requestsPerSecond);
            }
            // Sleep between batches
            await this.sleep(this.config.batchSleep);
        }
        this.isProcessing = false;
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
exports.RateLimiter = RateLimiter;
exports.defaultFetchConfig = {
    sleepTime: 30000,
    requestsPerBatch: 300,
    requestsPerSecond: 5,
    batchSleep: 5000,
};
