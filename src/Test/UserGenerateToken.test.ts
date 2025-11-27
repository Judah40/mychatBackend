import request from "supertest";
import { app } from "../index";
import * as UserService from "../module/Users/Users.service";

// Mock the UserService methods
jest.mock("../module/Users/Users.service");
jest.mock("../lib/redisClient", () => ({
  rateLimiter: {
    consume: jest.fn().mockResolvedValue(undefined),
  },
  // connectRedis: jest.fn().mockResolvedValue(undefined),
}));
// Test suite for GenerateAuthTokenController
describe("POST /generate-token", () => {
  it("should generate auth token for valid OTP", async () => {
    const otpPayload = { otp: "123456" };
    (UserService.GenerateAuthTokenService as jest.Mock).mockResolvedValue(
      "mocked-jwt-token"
    );
    const response = await request(app)
      .post("/api/v1/User/generate-token")
      .send(otpPayload);
    expect(response.status).toBe(200);
  });
});

//Test wrong otp input format
describe("POST /generate-token with invalid opt input", () => {
  it("should return 400 for invalid otp input", async () => {
    const invalidOtpPayload = { otp: "12345789976" };
    const response = await request(app)
      .post("/api/v1/User/generate-token")
      .send(invalidOtpPayload);
    expect(response.status).toBe(400);
  });
});

//Test for missing otp
describe("POST /generate-token with missing otp", () => {
  it("should return 400 for missing otp", async () => {
    const missingOTP = {};
    const response = await request(app)
      .post("/api/v1/User/generate-token")
      .send(missingOTP);
    expect(response.status).toBe(400);
  });
});

//Test for no data sent
describe("POST /generate-token with no data", () => {
  it("should return 400 for no data sent", async () => {
    const response = await request(app).post("/api/v1/User/generate-token");
    expect(response.status).toBe(400);
  });
});

// Test response headers
describe("Response Headers for /generate-token", () => {
  it("should have Content-Type application/json", async () => {
    const otpPayload = { otp: "123456" };
    (UserService.GenerateAuthTokenService as jest.Mock).mockResolvedValue(
      otpPayload
    );
    const response = await request(app)
      .post("/api/v1/User/generate-token")
      .send(otpPayload);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });
});

//Test for wrong response header
describe("Response Headers for /generate-token with wrong header", () => {
  it("should not have Content-Type text/html", async () => {
    const otpPayload = { otp: "123456" };
    (UserService.GenerateAuthTokenService as jest.Mock).mockResolvedValue(
      otpPayload
    );
    const response = await request(app)
      .post("/api/v1/User/generate-token")
      .send(otpPayload);
    expect(response.headers["content-type"]).not.toMatch(/text\/html/);
  });
});

// Test for wrong HTTP method
describe("GET /generate-token with wrong HTTP method", () => {
  it("should return 405 for wrong HTTP method", async () => {
    const response = await request(app).get("/api/v1/User/generate-token");
    expect(response.status).toBe(405);
  });
});
