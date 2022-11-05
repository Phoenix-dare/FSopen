const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogControl')
const usersRouter = require('./controllers/userControl')
const loginRouter = require('./controllers/loginControl')
require('express-async-errors')

const app = express()
app.use(morgan('tiny'))


mongoose.connect(config.MONGO_URI)
    .then(() => logger.info('Connected to database'))
    .catch(error => logger.error('Error connecting :',error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs',middleware.userExtractor, blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app