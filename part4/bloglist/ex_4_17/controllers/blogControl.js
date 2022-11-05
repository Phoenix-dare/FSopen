const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')

    blogs ? response.status(200).json(blogs)
    : response.status(404).json({ message: "not found" })

})
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})


blogsRouter.post('/', async (request, response) => {
    const blogs = request.body
    
    const user = await User.findById(blogs.userId)
    

    const blog= new Blog({
      ...blogs,
       })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)  
    
    await user.save()  
    response.status(201).json(savedBlog)
  
    
})

blogsRouter.put('/:id', async (request, response) => {

    const updated = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updated,
         { new: true, runValidators: true, context: 'query' })
    if (updatedBlog) {
        response.status(200).json(updatedBlog)
    } else {
        response.status(404).end()
    }

})


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter