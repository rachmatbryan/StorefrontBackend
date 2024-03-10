import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'

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
   
  const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password_digest: req.body.password_digest,
  }
  
  try{
      const newUser = await store.create(user);
      var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
      res.json(token)
  }
  catch (err){
      res.status(400)
      res.json(err)
  }
  
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(Number(req.params.user_id))
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

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:user_id', verifyAuthToken, show)
  app.post('/users', verifyAuthToken, create)
}

export default userRoutes