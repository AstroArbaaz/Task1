import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { UserFetcherService } from "./services/userFetchService";
import { UserController } from "./controllers/userController";

class App {
  public app: express.Application;
  private userFetcher: UserFetcherService;
  private userController: UserController;

  constructor() {
    this.app = express();
    this.userFetcher = new UserFetcherService();
    this.userController = new UserController();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.connectDatabase();
    this.startUserFetching();``
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.get(
      "/users",
      this.userController.getUsers.bind(this.userController)
      // GET /users?page=2&limit=20&sort=-name&search={"gender":"male","address.country":"USA"}
    );
  }

  private async connectDatabase() {
    try {
      // await mongoose.connect("mongodb://localhost:27017/userdb");
      await mongoose.connect(process.env.mongodb!);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }

  private startUserFetching() {
    // Initial fetch and setup periodic fetching
    // this.userFetcher.fetchAndSaveUsers();
    // Optional: Set up a periodic job to refresh users
    setInterval(() => this.userFetcher.fetchAndSaveUsers(), 24 * 60 * 60 * 1000);
  }

  public listen(port: any) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export default App;
