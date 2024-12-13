"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userModel_1 = require("../models/userModel");
class UserService {
    async getUsers(page = 1, limit = 10, sortBy = "createdAt", search = {}) {
        // Build dynamic search query
        const query = {};
        Object.keys(search).forEach((key) => {
            if (search[key]) {
                // For nested fields like address
                if (key.includes(".")) {
                    query[key] = { $regex: search[key], $options: "i" };
                }
                // For direct fields
                else {
                    query[key] = { $regex: search[key], $options: "i" };
                }
            }
        });
        // Validate sort direction
        const sortDirection = sortBy.startsWith("-") ? -1 : 1;
        const sortField = sortBy.replace(/^-/, "");
        const totalUsers = await userModel_1.User.countDocuments(query);
        const users = await userModel_1.User.find(query)
            .sort({ [sortField]: sortDirection })
            .skip((page - 1) * limit)
            .limit(limit);
        return {
            total: totalUsers,
            limit,
            page,
            sortBy: sortBy,
            items: users,
        };
    }
}
exports.UserService = UserService;
