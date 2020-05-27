const Registraion = require('../models/Registration')

module.exports = {
	async approval (req,res){
		const { registration_id } = req.params

		try {
			const registration = await Registraion.findById(registration_id)

			registration.approved = true
	
			await registration.save()
	
			return res.json(registration)			
		} catch (error) {
			return res.status(400).json(error)	
		}

	}
}