import { Product, ProductStore } from "../product";

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

  it("create method should add a user", async () => {
    const result = await store.create({
      product_name: "TV",
      price: 2000,
      category: "Electronics",
    });
    expect(result).toEqual({
      product_id: 1,
      product_name: "TV",
      price: 2000,
      category: "Electronics",
    });
  });

  it("index method should return a list of books", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        product_id: 1,
        product_name: "TV",
        price: 2000,
        category: "Electronics",
      },
    ]);
  });

  it("show method should return the correct book", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      product_id: 1,
      product_name: "TV",
      price: 2000,
      category: "Electronics",
    });
  });

  it("delete method should remove the book", async () => {
    store.delete(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
