"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFetcherService = void 0;
const axios_1 = __importDefault(require("axios"));
const userModel_1 = require("../models/userModel");
const rateLimiterAndQueue_1 = require("../utils/rateLimiterAndQueue");
class UserFetcherService {
    rateLimiter;
    constructor() {
        this.rateLimiter = new rateLimiterAndQueue_1.RateLimiter(rateLimiterAndQueue_1.defaultFetchConfig);
    }
    async fetchAndSaveUsers() {
        try {
            const fetchTask = async () => {
                const response = await axios_1.default.get("https://randomuser.me/api/", {
                    params: {
                        results: 5000,
                        inc: "gender,name,location,email,dob,picture",
                    },
                });
                const users = response.data.results.map(this.transformUser);
                await userModel_1.User.insertMany(users);
            };
            await this.rateLimiter.enqueue(fetchTask);
        }
        catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    transformUser(rawUser) {
        return {
            id: rawUser.login.uuid || "",
            gender: rawUser.gender,
            name: `${rawUser.name.first} ${rawUser.name.last}`,
            address: {
                city: rawUser.location.city,
                state: rawUser.location.state,
                country: rawUser.location.country,
                street: `${rawUser.location.street.number} ${rawUser.location.street.name}`,
            },
            email: rawUser.email,
            age: rawUser.dob.age.toString(),
            picture: rawUser.picture.large,
            createdAt: new Date(),
        };
    }
}
exports.UserFetcherService = UserFetcherService;
