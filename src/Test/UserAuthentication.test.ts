import request from "supertest";
import { app } from "../index";
import * as UserService from "../module/Users/Users.service";

// Define a User type for test purposes
type User = {
  phoneNumber: string;
};

// Mock the UserService methods
jest.mock("../module/Users/Users.service");
jest.mock("../lib/redisClient", () => ({
  rateLimiter: {
    consume: jest.fn().mockResolvedValue(undefined),
  },
  // connectRedis: jest.fn().mockResolvedValue(undefined),
}));
// Test suite for UserController
describe("POST /authenticate", () => {
  it("should authenticate user and return OTP", async () => {
    const newUser: User = { phoneNumber: "+23277600218" };
    (UserService.AuthenticateUserService as jest.Mock).mockResolvedValue(
      newUser
    );
    const response = await request(app)
      .post("/api/v1/User/authenticate")
      .send(newUser);
    expect(response.status).toBe(200);
  });
});

//Test Wrong phone number format
describe("POST /authenticate with invalid phone number", () => {
  it("should return 400 for invalid phone number format", async () => {
    const invalidUser = { phoneNumber: "invalid-phone" };
    const response = await request(app)
      .post("/api/v1/User/authenticate")
      .send(invalidUser);
    expect(response.status).toBe(400);
  });
});

//Test Missing phone number
describe("POST /authenticate with missing phone number", () => {
  it("should return 400 for missing phone number", async () => {
    const missingPhoneUser = {};
    const response = await request(app)
      .post("/api/v1/User/authenticate")
      .send(missingPhoneUser);
    expect(response.status).toBe(400);
  });
});

//Test for no data sent
describe("POST /authenticate with no data", () => {
  it("should return 400 for no data sent", async () => {
    const response = await request(app).post("/api/v1/User/authenticate");
    expect(response.status).toBe(400);
  });
});

// Test response headers
describe("Response Headers for /authenticate", () => {
  it("should have Content-Type application/json", async () => {
    const user = { phoneNumber: "+23277600218" };
    (UserService.AuthenticateUserService as jest.Mock).mockResolvedValue(user);
    const response = await request(app)
      .post("/api/v1/User/authenticate")
      .send(user);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });
});

//Test for wrong response header
describe("Response Headers for /authenticate with wrong header", () => {
  it("should not have Content-Type text/html", async () => {
    const user = { phoneNumber: "+23277600218" };
    (UserService.AuthenticateUserService as jest.Mock).mockResolvedValue(user);
    const response = await request(app)
      .post("/api/v1/User/authenticate")
      .send(user);
    expect(response.headers["content-type"]).not.toMatch(/text\/html/);
  });
});

// Test for wrong HTTP method
describe("GET /authenticate with wrong HTTP method", () => {
  it("should return 405 for wrong HTTP method", async () => {
    const response = await request(app).get("/api/v1/User/authenticate");
    expect(response.status).toBe(405);
  });
});
