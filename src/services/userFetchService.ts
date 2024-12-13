import axios from "axios";
import { User } from "../models/userModel";
import { RateLimiter, defaultFetchConfig } from "../utils/rateLimiterAndQueue";
import { IItems } from "../interfaces/user";

export class UserFetcherService {
  private rateLimiter: RateLimiter;

  constructor() {
    this.rateLimiter = new RateLimiter(defaultFetchConfig);
  }

  async fetchAndSaveUsers() {
    try {
      const fetchTask = async () => {
        const response:any = await axios.get("https://randomuser.me/api/", {
          params: {
            results: 5000,
            inc: "gender,name,location,email,dob,picture",
          },
        });

        const users = response.data.results.map(this.transformUser);
        await User.insertMany(users);
      };

      await this.rateLimiter.enqueue(fetchTask);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  private transformUser(rawUser: any): IItems {
    return {
      id: rawUser.login?.uuid ?? "",
      gender: rawUser?.gender ?? "",
      name: `${rawUser.name?.first} ${rawUser.name?.last}`,
      address: {
        city: rawUser.location?.city ?? "",
        state: rawUser.location?.state ?? "",
        country: rawUser.location?.country ?? "",
        street: `${rawUser.location.street?.number} ${rawUser.location.street?.name}`,
      },
      email: rawUser?.email ?? "",
      age: rawUser.dob?.age.toString() ?? "",
      picture: rawUser.picture?.large ?? "",
      createdAt: new Date(),
    };
  }
}
