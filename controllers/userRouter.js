import { response, Router } from "express";
import bcrpty from 'bcrypt'
import User from '../models/user.js'


const userRouter = Router()

userRouter.post('/',async (request, response) => {
  const { username, name, password } = request.body 
  const userExist = await User.find({ username: request.body.username });
  if (userExist.length > 0)
    return response.status(400).send({ message: "User already exists" });
  const saltRounds = 10
  const passwordHash = await bcrpty.hash(password,saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/',async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

export default userRouter


