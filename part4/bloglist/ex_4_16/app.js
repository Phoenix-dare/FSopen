const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogControl')
const usersRouter = require('./controllers/userControl')
require('express-async-errors')

const app = express()
app.use(morgan('tiny'))


mongoose.connect(config.MONGO_URI)
    .then(() => logger.info('Connected to database'))
    .catch(error => logger.error('Error connecting :',error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users',usersRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app