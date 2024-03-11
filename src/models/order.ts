import Client from "../database";

export type Order = {
  order_id?: number;
  user_id: number;
  quantity: number;
  order_status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`);
    }
  }

  async getCurrentOrdersByUser(user_id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();

      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND order_status = $2";

      const result = await conn.query(sql, [user_id, "active"]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find current orders for user ${user_id}. Error: ${err}`
      );
    }
  }

  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, order_id, product_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${product_id} to order ${order_id}: ${err}`
      );
    }
  }

  async show(order_id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE order_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [order_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get Order ${order_id}. Error: ${err}`);
    }
  }

  async create(Order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id,quantity,order_status) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        Order.user_id,
        Order.quantity,
        Order.order_status,
      ]);

      const item = result.rows[0];

      conn.release();

      return item;
    } catch (err) {
      throw new Error(`Could not add order ${Order.order_id}. Error: ${err}`);
    }
  }

  async delete(order_id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE order_id=($1) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [order_id]);

      conn.release();

      if (result.rows.length) {
        return result.rows[0];
      }
      throw new Error(
        `Order not found or already deleted with ID: ${order_id}`
      );
    } catch (err) {
      throw new Error(
        `Could not delete Order with ID ${order_id}. Error: ${err}`
      );
    }
  }
}
