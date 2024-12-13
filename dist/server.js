"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const userFetchService_1 = require("./services/userFetchService");
const userController_1 = require("./controllers/userController");
class App {
    app;
    userFetcher;
    userController;
    constructor() {
        this.app = (0, express_1.default)();
        this.userFetcher = new userFetchService_1.UserFetcherService();
        this.userController = new userController_1.UserController();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.connectDatabase();
        this.startUserFetching();
        ``;
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
    }
    initializeRoutes() {
        this.app.get("/users", this.userController.getUsers.bind(this.userController)
        // GET /users?page=2&limit=20&sort=-name&search={"gender":"male","address.country":"USA"}
        );
    }
    async connectDatabase() {
        try {
            // await mongoose.connect("mongodb://localhost:27017/userdb");
            await mongoose_1.default.connect(process.env.mongodb);
            console.log("MongoDB connected successfully");
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
        }
    }
    startUserFetching() {
        // Initial fetch and setup periodic fetching
        this.userFetcher.fetchAndSaveUsers();
        // Optional: Set up a periodic job to refresh users
        // setInterval(() => this.userFetcher.fetchAndSaveUsers(), 24 * 60 * 60 * 1000);
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
exports.default = App;
