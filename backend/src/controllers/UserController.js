const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
	async createUser(req,res){
		try {
			const {firstName,lastName,password,email} = req.body

			const existentUser = await User.findOne({email})
			
			if(!existentUser){
				const hashedPassword = await bcrypt.hash(password,10)
				const user = await User.create({
					firstName: firstName,
					lastName: lastName,
					password: hashedPassword,
					email: email
				})    
				return res.json({
					_id: user._id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName
				})
			}

			return res.status(400).json({
				message: 'email/user already exist!'
			})
		} catch (error) {
			throw Error(`Error while registring new user : ${error}`)
		}
	},

	async getUserById(req,res){
		const { userId } = req.params

		try {
			const user = await User.findById(userId)

			return res.send(user)
		} catch (error) {
			return res.status(400).json({
				message: 'User ID does not exist, do yu want to register instead ?'
			})
		}
	}
}