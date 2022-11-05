const bcrypt = require('bcrypt')
const User = require("../models/userModel")
const usersRouter = require('express').Router()

usersRouter.get('/',async (request,response) =>{
const users  = await User.find({})
users ? response.status(200).json(users) 
: response.status(404).json({message: 'Could not find data for users'})


})





usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter