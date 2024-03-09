import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const user = await store.index()
  res.json(user)
}

const show = async (req: Request, res: Response) => {
   const user = await store.show(Number(req.params.user_id))
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password_digest: req.body.password_digest,
        }

        const newUser = await store.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(Number(req.params.user_id))
    res.json(deleted)
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:user_id', show)
  app.post('/users', create)
  app.delete('/users/:user_id', destroy)
}

export default userRoutes