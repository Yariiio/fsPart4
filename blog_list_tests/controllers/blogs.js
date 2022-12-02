const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})
    response.status(200).json(blog)
})
  
blogsRouter.post('/', async (request, response) => {
    const newBlog = new Blog(request.body)
   
    await newBlog.save()
    response.status(201).json(newBlog)
})

module.exports = blogsRouter