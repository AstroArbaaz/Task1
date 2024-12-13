import { User } from "../models/userModel";
import { IPagination, ISearchCriteria, IItems } from "../interfaces/user";

export class UserService {
  async getUsers(
    page: number = 1,
    limit: number = 10,
    sortBy: string = "createdAt",
    search: ISearchCriteria = {}
  ): Promise<IPagination> {
    // Build dynamic search query
    const query: any = {};

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

    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
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
