const bcrypt        =   require('bcrypt')
const usersRouter   =   require('express').Router()
const User          =   require('../models/user')

/**
 * Returns list of user from the Database
 */
usersRouter.get('/', async (request, response) => {

	const body = request.body

	const saltRounds = 10
	const passwordHash = bcrypt.hash(body.password, saltRounds)
    
	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.saved()

	response.json(savedUser)

})

module.exports = usersRouter