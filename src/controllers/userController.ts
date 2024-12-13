import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { ISearchCriteria } from "../interfaces/user";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = (req.query.sort as string) || "createdAt";

      // Parse search criteria
      const searchQuery = req.query.search
        ? JSON.parse(req.query.search as string)
        : {};

      const users = await this.userService.getUsers(
        page,
        limit,
        sortBy,
        searchQuery as ISearchCriteria
      );

      res.json(users);
    } catch (error:any) {
      res.status(500).json({
        message: "Error retrieving users",
        error: error.message,
      });
    }
  }
}
