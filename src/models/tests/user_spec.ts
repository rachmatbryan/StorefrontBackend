import { User, UserStore } from "../user";

const store = new UserStore();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("should have an index method that returns an array of users", async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
  });

  it("should have a show method that returns the correct user", async () => {
    const result = await store.show(1);
    expect(result).toBeDefined();
    expect(result.user_id).toBe(1);
  });

  it("create method should add a user and return the new user", async () => {
    const result = await store.create({
      firstName: "John",
      lastName: "Doe",
      password_digest: "password123",
    });
    expect(result).toBeDefined();
    expect(result.firstName).toBe("John");
    expect(result.lastName).toBe("Doe");
    expect(result.password_digest).not.toBe("password123");
  });

  it("delete method should remove the user", async () => {
    const user_id = 1;
    await store.delete(user_id);
    const result = await store.index();
    expect(result.find((u) => u.user_id === user_id)).toBeUndefined();
  });
});
