/**
 * Tests using Jest
 */

const dummy = () => {
	return 1
}

/**
 * Display total likes
 * @method
 * @param {object} blogs - blog list
 */
const totalLikes = (blogs) =>{
	return blogs.reduce((total, blog) => { return total + blog.likes}, 0)
}

/**
 * Return highest likes
 * @method
 * @param {object} blogs - blog list
 */
const favoriteBlog = (blogs) => {

	/**
     * retrieves largest value
     */
	var max = blogs.reduce(function(a, b) {
		return Math.max(a, b.likes)
	},0)
    
	/**
     * finds and retrieve largst value in an object.
     */
	let topBlog = blogs.find(element => element.likes == max)

	return topBlog
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}