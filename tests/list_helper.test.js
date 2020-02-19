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
 * MongoDb Connection
 */
const mongoose = require('mongoose')

/**
 * Express App Root API
 */
const app = require('../app')

/**
 * Establish supertest on API
 */
const api = supertest(app)


const listHelper = require('../utils/list_helper')

/**
 * Verifies if test returns json
 */
test.only('request returns json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
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

	console.log('aaaaaaaaaaaaaaaa',listHelper.favoriteBlog(blogs))
	console.log('<br />', can1[0])

	test('have all the same properties', () => {
		expect(listHelper.favoriteBlog(blogs)).toEqual(can1)
	})
})

