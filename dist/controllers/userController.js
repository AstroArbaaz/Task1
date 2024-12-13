"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    userService;
    constructor() {
        this.userService = new userService_1.UserService();
    }
    async getUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sort || "createdAt";
            // Parse search criteria
            const searchQuery = req.query.search
                ? JSON.parse(req.query.search)
                : {};
            const users = await this.userService.getUsers(page, limit, sortBy, searchQuery);
            res.json(users);
        }
        catch (error) {
            res.status(500).json({
                message: "Error retrieving users",
                error: error.message,
            });
        }
    }
}
exports.UserController = UserController;
