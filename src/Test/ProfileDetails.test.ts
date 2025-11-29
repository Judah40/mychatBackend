import { app } from "../index";
import request from "supertest";
import { createTestUser, deleteTestUser, TestUser } from "./setup";
import path from "path";
import fs from "fs";
jest.mock("redis");
jest.mock("stream-chat");
describe("POST /profile-picture with wrong HTTP method", () => {
  let testUser: TestUser;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser(testUser.id);
  });

  it("should return 405 for wrong HTTP method", async () => {
    const response = await request(app)
      .post("/api/v1/profile/profile-picture")
      .set("Authorization", `Bearer ${testUser.token}`);
    expect(response.status).toBe(405);
  });
});

// Test for no token
describe("PATCH /profile-picture without user token", () => {
  it("should return 401 for no user token", async () => {
    const userToken = { token: "234ksdjkfhksdhfgksdhfgkjnvsnfv" };
    const response = await request(app).patch(
      "/api/v1/profile/profile-picture"
    );
    expect(response.status).toBe(401);
  });
});

// Test for multer upload
describe("PATCH /profile-picture (multer upload)", () => {
  let testUser: TestUser;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser(testUser.id);
  });

  it("should upload profile picture successfully", async () => {
    // Create a test buffer instead of using file system
    // Path to your existing test image
    const testImagePath = path.join(__dirname, "files", "testimage.png");

    // Verify the file exists before testing
    if (!fs.existsSync(testImagePath)) {
      throw new Error(`Test image not found at: ${testImagePath}`);
    }
    const response = await request(app)
      .patch("/api/v1/profile/profile-picture")
      .set("Authorization", `Bearer ${testUser.token}`)
      .attach("file", testImagePath);

    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("success", true);
  }, 30000); // Increase timeout to 30 seconds

  it("should reject file that is too large", async () => {
    // Create a test buffer instead of using file system
    // Path to your existing test image
    const testImagePath = path.join(__dirname, "files", "testimage4.jpg");

    // Verify the file exists before testing
    if (!fs.existsSync(testImagePath)) {
      throw new Error(`Test image not found at: ${testImagePath}`);
    }
    const response = await request(app)
      .patch("/api/v1/profile/profile-picture")
      .set("Authorization", `Bearer ${testUser.token}`)
      .attach("file", testImagePath);

    expect(response.status).toBe(413);
  });

  it("should reject invalid file type", async () => {
    const textBuffer = Buffer.from("invalid file content");

    const response = await request(app)
      .patch("/api/v1/profile/profile-picture")
      .set("Authorization", `Bearer ${testUser.token}`)
      .attach("file", textBuffer, "test.txt");

    expect(response.status).toBe(400);
  });
});
