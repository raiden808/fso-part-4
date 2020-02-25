const Blog = require('../models/blog')


const initialBlogs = [
	{
		title : 'Test',
		author : 'Author Test',
		url : 'www.test.com',
		likes : 3
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})

	return blogs.map(blog => blog.toJSON())
}


module.exports = {
	initialBlogs, blogsInDb
}