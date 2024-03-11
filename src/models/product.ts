import Client from "../database";

export type Product = {
  product_id?: number;
  product_name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(product_id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE product_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [product_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${product_id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (product_name,price,category) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        product.product_name,
        product.price,
        product.category,
      ]);

      const item = result.rows[0];

      conn.release();

      return item;
    } catch (err) {
      throw new Error(
        `Could not add item ${product.product_name}. Error: ${err}`
      );
    }
  }

  async delete(product_id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE product_id=($1) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [product_id]);

      conn.release();

      if (result.rows.length) {
        return result.rows[0];
      }
      throw new Error(
        `Product not found or already deleted with ID: ${product_id}`
      );
    } catch (err) {
      throw new Error(
        `Could not delete product with ID ${product_id}. Error: ${err}`
      );
    }
  }
}
