import { UserStore } from "../user";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../server";

const store = new UserStore();
let token = "";
let testUserId: number;

beforeAll(async () => {
  const newUser = await store.create({
    firstName: "Test",
    lastName: "User",
    password_digest: "password123",
  });
  testUserId = newUser.user_id as number;
  token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
});

describe("User Model", () => {
  it("should have an index method that requires a token", async () => {
    const result = await store.index();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBeTrue();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it("should have a show method that requires a token", async () => {
    const result = await store.show(testUserId);
    expect(result).toBeDefined();
    expect(result.user_id).toBe(testUserId);
  });
  it("should have a create method", async () => {
    const newUser = {
      firstName: "New",
      lastName: "Tester",
      password_digest: "newpassword123",
    };
    const createdUser = await store.create(newUser);
    expect(createdUser).toBeDefined();
    expect(createdUser.firstName).toEqual(newUser.firstName);
  });
  it("should have an index method that requires a token", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should have a show method that requires a token", async () => {
    const response = await request(app)
      .get(`/users/${testUserId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.user_id).toBe(testUserId);
  });

  it("should have a create method", async () => {
    const newUser = {
      firstName: "New",
      lastName: "Tester",
      password_digest: "newpassword123",
    };

    const response = await request(app).post("/users").send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(jasmine.any(String));
  });
});
