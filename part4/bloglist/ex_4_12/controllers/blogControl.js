const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    blogs ? response.status(200).json(blogs) : response.status(404).json({ message: "not found" })

})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if(!(body.title && body.url)){
        return response.status(400).json({message:"title and url should be provided"})
    }

    const blog = new Blog(body)

    const blogSaved = await blog.save()
    response.status(201).json(blogSaved)
})


module.exports = blogsRouter