import { Product, ProductStore } from "../product";
import { UserStore } from "../user";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../server";
const store = new ProductStore();

describe("Product Model", () => {
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
let token = "";
describe("Product Model", () => {
  beforeAll(async () => {
    const userStore = new UserStore();
    const user = await userStore.create({
      firstName: "Test",
      lastName: "User",
      password_digest: "password",
    });
    token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
  });
  it("should have an index method", async () => {
    const result = await store.index();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
  it("should have a show method", async () => {
    const productId = 1;
    const result = await store.show(productId);
    expect(result).toBeDefined();
    expect(result.product_id).toBe(productId);
  });

  it("should have a create method that requires a token", async () => {
    const product = {
      product_name: "Test Product",
      price: 10,
      category: "Test Category",
    };

    const createdProduct = await store.create(product);
    expect(createdProduct).toBeDefined();
    expect(createdProduct.product_name).toEqual(product.product_name);
  });
  it("GET /products - should return a list of products", async () => {
    const response = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /products/:product_id - should return a specific product", async () => {
    const response = await request(app)
      .get("/products/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("POST /products - should create a new product", async () => {
    const product = {
      product_name: "Test Product",
      price: 10,
      category: "Test Category",
    };
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send(product);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
