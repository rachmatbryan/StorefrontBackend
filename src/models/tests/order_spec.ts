import { Order, OrderStore } from "../order";
import { UserStore } from "../user";

const store = new OrderStore();

describe("Order Model", () => {
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

  it("should have a current order by user method", () => {
    expect(store.getCurrentOrdersByUser).toBeDefined();
  });

  let mockUserId: number;

  beforeEach(async () => {
    const userStore = new UserStore();
    const mockUser = await userStore.create({
      firstName: "John",
      lastName: "Doe",
      password_digest: "password123",
    });
    mockUserId = mockUser.user_id as number;

    await store.create({
      user_id: mockUserId,
      quantity: 1,
      order_status: "active",
    });

    await store.create({
      user_id: mockUserId,
      quantity: 2,
      order_status: "complete",
    });
  });

  it("should fetch current (active) orders for a user", async () => {
    const result = await store.getCurrentOrdersByUser(mockUserId);
    expect(result.length).toBe(1);
    expect(result[0].order_status).toEqual("active");
  });
});
