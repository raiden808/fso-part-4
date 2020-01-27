/** 
 * Unit testing using jests
 */

/**
* Test single function
* npx jest -t 'dummy returns one'
*/


const listHelper = require('../utils/list_helper')

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