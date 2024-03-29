import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import jwt from "jsonwebtoken";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await store.index();
    res.json(product);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: "An error occurred while retrieving product" });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(Number(req.params.product_id));
    res.json(product);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving product" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      product_name: req.body.product_name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(Number(req.params.product_id));
    res.json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while deleting product" });
  }
};

const verifyAuthToken = (req: Request, res: Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("No authorization header provided");
    }
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(401).json({ error: "Access denied, invalid token" });
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:product_id", show);
  app.post("/products", verifyAuthToken, create);
};

export default productRoutes;
