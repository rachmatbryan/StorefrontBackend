import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'

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
    try {
        const order: Order = {
            product_id: req.body.product_id,
            user_id: req.body.product_id,
            quantity: req.body.quantity,
            order_status: req.body.order_status
        }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(Number(req.params.order_id))
    res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:order_id', show)
  app.post('/orders', create)
  app.delete('/orders/:order_id', destroy)
}

export default orderRoutes