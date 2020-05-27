const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
	async login(req,res){
		try {
			const { email, password } = req.body
			
			if(!email || !password){
				return res.status(200).json({message: 'Required field is missing !'})
			}

			const user = await User.findOne({email})
			if(!user){
				return res.status(200).json({message: 'user not found! Do you want to register instead ?'})
			}

			if(user && await bcrypt.compare(password, user.password)){
				const userResponse = {
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email
				}
				return res.json(userResponse)
			}else{
				return res.status(200).json({message: 'wrong password! Please try again'})
			}
		} catch (error) {
			return res.status(400).json({message : 'Error while authenticating user'})
		}
	}
}
