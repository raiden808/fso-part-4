/** 
 * Unit testing using jests
 */

/**
* Test single function
* npx jest -t 'dummy returns one'
*/

/**
 * Test single function using .only
 * This will be the only jest function that will run
 * test.only(/description/)
 */

/**
 * Test Library
 */
const supertest = require('supertest')

/**
 * Express App Root API
 */
const app = require('../app')

/**
 * Establish supertest on API
 */
const api = supertest(app)


const listHelper = require('../utils/list_helper')

const blogApiHelper = require('./blog_helper')

const Blog = require('../models/blog')

/**
 * Runs before test cases
 */
beforeEach( async () => {

	/**
	 * Reset test env to clean state
	 */
	await Blog.deleteMany()

	/**
	 * seeds mongodb with initial data
	 */
	const blogObjects = blogApiHelper.initialBlogs
		.map(blog => new Blog(blog))

	/**
	 * Makes sure all promise is done before test on jest
	 */
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)

})

describe('blog test', () => {

	/**
	 * Verifies if test returns json
	 */
	test('request returns blog json', async () => {

		const test =  await api.get('/api/blogs')
		console.log('Json Output',test.body)

		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	/**
	 * Verify if id exist in json response
	 */
	test('check id in blog json', async () => {
		const blogsJson =  await api.get('/api/blogs')

		console.log('Key exist', blogsJson.body[0])

		expect(blogsJson.body[0].id).toBeDefined()
	})

	/**
	 * Check if like property is missing.
	 */
	test('Verify if post works', async () =>{

		const newBlog = new Blog({
			title: 'New Blog',
			author: 'New Author',
			url: 'www.author.com'
		})

		await newBlog.save()

		const test =  await api.get('/api/blogs')
		console.log('Json Output',test.body)

		// console.log(newBlog)

		// const allBlogs = await blogApiHelper.blogsInDb()

		// expect(allBlogs.length).toBe(allBlogs.length + 1)
	})

})




test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('Total likes', () => {
	const listWithOneBlog  = [
		{
			'_id': '5e291dbc46accf375cf6a23d',
			'title': 'Test Blog',
			'author': 'Siakam Pascal',
			'url': 'google.com',
			'likes': 5,
			'__v': 0
		},
		{
			'_id': '5e291dd046accf375cf6a23e',
			'title': 'Test Blog',
			'author': 'Bran De Ipille',
			'url': 'google.com',
			'likes': 0,
			'__v': 0
		},
	]

	test('When list has only one blog equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})
})

describe('favorite blog', () => {

	const can1 = 
	{
		title: 'Test Blog',
		author: 'Siakam Pascal',
		likes:5
	}
	

	const blogs  = [
		{
			'title': 'Test Blog',
			'author': 'Siakam Pascal',
			'likes': 5
		},
		{
			'title': 'Test Blog',
			'author': 'Bran De Ipille',
			'likes': 0,
		},
	]

	// console.log('aaaaaaaaaaaaaaaa',listHelper.favoriteBlog(blogs))
	// console.log('<br />', can1[0])

	test('have all the same properties', () => {
		expect(listHelper.favoriteBlog(blogs)).toEqual(can1)
	})
})

