import { Order, OrderStore } from "../order";
import request from "supertest";
import app from "../../server";
import { expect } from "@jest/globals";

const store = new OrderStore();

describe("GET /orders", () => {
  it("responds with an array of orders", async () => {
    const response = await request(app).get("/orders");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /orders", () => {
  it("requires authentication", async () => {
    const response = await request(app).post("/orders").send({
      user_id: 1,
      quantity: 2,
      order_status: "active",
    });
    expect(response.statusCode).toBe(401);
  });

  it("creates an order with valid authentication", async () => {
    const token = "some-valid-token";
    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: 1,
        quantity: 2,
        order_status: "active",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("order_id");
  });
});

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
});
