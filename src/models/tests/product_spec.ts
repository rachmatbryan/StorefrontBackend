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

  it("fetch all products", async function () {
    const product: Product = {
      product_name: "TV",
      price: 2000,
      category: "Electronics",
    };
    await store.create(product);
    const products = await store.index();

    expect(products.length).toBeGreaterThan(0);
  });

  it("create method should add a product", async () => {
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

  it("index method should return a list of products", async () => {
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

  it("show method should return the correct product", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      product_id: 1,
      product_name: "TV",
      price: 2000,
      category: "Electronics",
    });
  });

  it("delete method should remove the product", async () => {
    const createdProduct = await store.create({
      product_name: "TV",
      price: 2000,
      category: "Electronics",
    });

    await store.delete(createdProduct.product_id as number);
    const result = await store.index();

    const productExists = result.some(
      (product) => product.product_id === createdProduct.product_id
    );
    expect(productExists).toBe(false);
  });
});
