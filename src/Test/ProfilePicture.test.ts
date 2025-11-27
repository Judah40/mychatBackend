import { app } from "../index";
import request from "supertest";
import { createTestUser, deleteTestUser, TestUser } from "./setup";

import * as profileService from "../module/Profile/Profile.service";
type User = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
};
jest.mock("redis");
jest.mock("stream-chat");
describe("PATCH /upload-profile", () => {
  let testUser: TestUser;

  beforeAll(async () => {
    testUser = await createTestUser();
    console.log(testUser);
  });

  afterAll(async () => {
    await deleteTestUser(testUser.id);
  });
  it("should be return 405 for wrong http method", async () => {
    const response = await request(app)
      .post("/api/v1/profile/upload-profile")
      .set("Authorization", `Bearer ${testUser.token}`);
    expect(response.status).toBe(405);
  });

  it("should return 400 for wrong user input. ie only middleName is exclusion", async () => {
    const userMockData: User = { firstName: "judah", middleName: "Alvin" };
    const response = await request(app)
      .patch("/api/v1/profile/upload-profile")
      .set("Authorization", `Bearer ${testUser.token}`)
      .send(userMockData);
    expect(response.status).toBe(400);
  });

  it("should successfully add users first name last name and optional middlename", async () => {
    const userMockData: User = {
      firstName: "Judah",
      lastName: "Dore",
    };
    const response = await request(app)
      .patch("/api/v1/profile/upload-profile")
      .set("Authorization", `Bearer ${testUser.token}`)
      .send(userMockData);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });
  it("should return 400 if no values passed", async () => {
    const response = await request(app)
      .patch("/api/v1/profile/upload-profile")
      .set("Authorization", `Bearer ${testUser.token}`);

    expect(response.status).toBe(400);
  });
});

// describe("PATCH /upload-")
