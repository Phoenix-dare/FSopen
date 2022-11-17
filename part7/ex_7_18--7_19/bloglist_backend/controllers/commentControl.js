const commentsRouter = require('express').Router()
const Blog = require('../models/blogModel')
const Comments = require('../models/commentModel')

commentsRouter.get('/:id/comments', async (request, response) => {
    const { id } = request.params
    const blog = await Blog.findById(id).populate('comments')
    blog
        ? response.status(200).json(blog)
        : response.status(404).json({ message: 'No comments' })
})

commentsRouter.post('/:id/comments', async (request, response) => {
    const comment = request.body.comment
    const id  = request.params.id

    const blog = await Blog.findById(id)

    const newComment = new Comments({
        comments:comment,
        id:id,
    })

    const savedComment = await newComment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save() 

    response.status(201).json(savedComment)
})

module.exports = commentsRouter
