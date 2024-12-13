import { IUserFetchConfig } from "../interfaces/user";

export class RateLimiter {
  private config: IUserFetchConfig;
  private queue: Array<() => Promise<any>> = [];
  private isProcessing = false;

  constructor(config: IUserFetchConfig) {
    this.config = config;
  }

  async enqueue(task: () => Promise<any>) {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue() {
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

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const defaultFetchConfig: IUserFetchConfig = {
  sleepTime: 30000,
  requestsPerBatch: 300,
  requestsPerSecond: 5,
  batchSleep: 5000,
};
