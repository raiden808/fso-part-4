/**
 * Granted access to main app using Router()
 */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/**
 * Retrieves json objec to MongoDB
 */
blogsRouter.get('/', (request,response) => {
	Blog.find({}).then(blogs => {
		response.json(blogs.map(blog => blog.toJSON()))
	})
})

/**
 * Post request
 */
