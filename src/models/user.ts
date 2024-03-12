import Client from "../database";
import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  user_id?: number;
  firstName: string;
  lastName: string;
  password_digest: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(user_id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE user_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${user_id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstName, lastName, password_digest) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(
        user.password_digest + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash,
      ]);

      const item = result.rows[0];

      conn.release();

      return item;
    } catch (err) {
      throw new Error(`Could not add user ${user.firstName}. Error: ${err}`);
    }
  }

  async delete(user_id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE user_id=($1) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      if (result.rows.length) {
        return result.rows[0];
      }
      throw new Error(`User not found or already deleted with ID: ${user_id}`);
    } catch (err) {
      throw new Error(
        `Could not delete user with ID ${user_id}. Error: ${err}`
      );
    }
  }
}
