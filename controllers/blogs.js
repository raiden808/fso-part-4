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
 * Retrieve using async and await
 */
blogsRouter.get('/', async (request, response) =>{
	const blogs = await Blog.find({})
	response.json(blogs.map(blog => blog.toJSON()))
})

/**
 * Post request
 */
blogsRouter.post('/', async (request, response, next) => {
	const body = request.body

	const blog = new Blog({
		title : body.title,
		author : body.author,
		url : body.url,
		likes : body.likes
	})

	try {
		const savedBlog = await blog.save()
		response.json(savedBlog.toJSON())
	} catch(exception){
		next(exception)
	}
})

/**
 * Blog Delete Request
 */
blogsRouter.delete('/:id', async(request, response, next) => {
	try{
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} catch(exception){
		next(exception)
	}
})


/**
 * Update request
 */
blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body
	
	const blog = {
		likes: body.likes
	}

	Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
		.then(updatedBlog => {
			response.json(updatedBlog.toJSON())
		})
		.catch(error => next(error))
})

module.exports = blogsRouter