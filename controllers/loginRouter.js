import { Router } from "express"
import User from "../models/user.js"
import bcrypt from 'bcrypt'
const loginRouter = Router()
import jwt from 'jsonwebtoken'


loginRouter.post('/',async (request, response) => {
  const {username , password } = request.body

  const user = await User.findOne({username})
  console.log(user)

  const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(password,user.passwordHash)

  if(!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken,process.env.SECRET,{ expiresIn: 60*60 })

  response 
    .status(200)
    .send({token,username: user.username, name: user.name})
})

export default loginRouter