const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    blogs ? response.status(200).json(blogs) : response.status(404).json({ message: "not found" })

})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const blogSaved = await blog.save()
    response.status(201).json(blogSaved)
})


module.exports = blogsRouter