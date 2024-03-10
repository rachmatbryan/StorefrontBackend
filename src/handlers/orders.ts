import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import jwt from 'jsonwebtoken'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const order = await store.index()
  res.json(order)
}

const show = async (req: Request, res: Response) => {
   const order = await store.show(Number(req.params.order_id))
   res.json(order)
}

const create = async (req: Request, res: Response) => {
    
    const order: Order = {
        user_id: req.body.product_id,
        quantity: req.body.quantity,
        order_status: req.body.order_status
    }

    try{
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const currentOrders = async (req: Request, res: Response) => {
    const user_id = parseInt(req.params.user_id)
    try {
      const orders = await store.getCurrentOrdersByUser(user_id)
      res.json(orders)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(Number(req.params.order_id))
    res.json(deleted)
}

const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            throw new Error('No authorization header provided')
        }
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)

        next()
    } catch (error) {
        res.status(401)
    }
}

const addProduct = async (req: Request, res: Response) => {
  const order_id: string = req.params.order_id
  const product_id: string = req.body.product_id
  const quantity: number = parseInt(req.body.quantity)

  try {
    const addedProduct = await store.addProduct(quantity, order_id, product_id)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
} 

const orderRoutes = (app: express.Application) => {
  app.get('/users/:user_id/orders/current', verifyAuthToken, currentOrders);
  app.post('/orders/:id/products', verifyAuthToken, addProduct)
}

export default orderRoutes