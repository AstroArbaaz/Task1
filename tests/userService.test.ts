import { UserService } from "../src/services/userService";
import { User } from "../src/models/userModel";
import mongoose from "mongoose";
import "dotenv/config";

describe("UserService", () => {
  let userService: UserService;

  beforeAll(async () => {
    // Connect to a test database
    // await mongoose.connect("mongodb://localhost:27017/testdb");
    await mongoose.connect(process.env.mongodb!);
  });

  afterAll(async () => {
    // Clear database and disconnect
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Initialize UserService before each test
    userService = new UserService();

    // Clear the database before each test
    await User.deleteMany({});

    // Seed test data
    await User.insertMany([
      {
        id: "1",
        gender: "male",
        name: "John Doe",
        address: {
          city: "New York",
          state: "NY",
          country: "USA",
          street: "123 Main St",
        },
        email: "john.doe@example.com",
        age: "30",
        picture: "http://example.com/john.jpg",
        createdAt: new Date(),
      },
      {
        id: "2",
        gender: "female",
        name: "Jane Smith",
        address: {
          city: "Los Angeles",
          state: "CA",
          country: "USA",
          street: "456 Oak Ave",
        },
        email: "jane.smith@example.com",
        age: "28",
        picture: "http://example.com/jane.jpg",
        createdAt: new Date(),
      },
      {
        id: "3",
        gender: "male",
        name: "Mike Johnson",
        address: {
          city: "Chicago",
          state: "IL",
          country: "USA",
          street: "789 Pine Rd",
        },
        email: "mike.johnson@example.com",
        age: "35",
        picture: "http://example.com/mike.jpg",
        createdAt: new Date(),
      },
    ]);
  });

  describe("getUsers method", () => {
    it("should return paginated users with default parameters", async () => {
      const result = await userService.getUsers();

      expect(result.total).toBe(3);
      expect(result.limit).toBe(10);
      expect(result.page).toBe(1);
      expect(result.items.length).toBe(3);
    });

    it("should support pagination", async () => {
      // Add more users to test pagination
      await User.insertMany(
        Array(20)
          .fill(null)
          .map((_, index) => ({
            id: `test-${index}`,
            gender: "male",
            name: `Test User ${index}`,
            address: {
              city: "Test City",
              state: "Test State",
              country: "Test Country",
              street: `${index} Test Street`,
            },
            email: `test${index}@example.com`,
            age: "25",
            picture: "http://example.com/test.jpg",
            createdAt: new Date(),
          }))
      );

      const firstPage = await userService.getUsers(1, 10);
      expect(firstPage.total).toBe(23);
      expect(firstPage.items.length).toBe(10);
      expect(firstPage.page).toBe(1);

      const secondPage = await userService.getUsers(2, 10);
      expect(secondPage.items.length).toBe(10);
      expect(secondPage.page).toBe(2);
    });

    it("should support sorting", async () => {
      const ascendingSort = await userService.getUsers(1, 10, "name");
      expect(ascendingSort.items[0].name).toBe("Jane Smith");

      const descendingSort = await userService.getUsers(1, 10, "-name");
      expect(descendingSort.items[0].name).toBe("Mike Johnson");
    });

    it("should support search by name", async () => {
      const result = await userService.getUsers(1, 10, "createdAt", {
        name: "John",
      });

      expect(result.total).toBe(1);
      expect(result.items[0].name).toBe("John Doe");
    });

    it("should support search by email", async () => {
      const result = await userService.getUsers(1, 10, "createdAt", {
        email: "jane",
      });

      expect(result.total).toBe(1);
      expect(result.items[0].email).toBe("jane.smith@example.com");
    });

    it("should support search by gender", async () => {
      const result = await userService.getUsers(1, 10, "createdAt", {
        gender: "male",
      });

      expect(result.total).toBe(2);
      expect(result.items.every((user) => user.gender === "male")).toBe(true);
    });

    it("should support search by country", async () => {
      const result = await userService.getUsers(1, 10, "createdAt", {
        "address.country": "USA",
      });

      expect(result.total).toBe(3);
      expect(result.items.every((user) => user.address.country === "USA")).toBe(
        true
      );
    });
  });
});
