const http = require('http')
const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl)
  .then(console.log("Connected to database"))
  .catch(error => console.error(error))

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT ||3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
