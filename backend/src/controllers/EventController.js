const Event = require('../models/Event')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
	createEvent(req,res){
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if(err){
				res.sendStatus(401)
			}else{
				const { title, description, price, sport, date } = req.body
				const { location } = req.file
		
				const user = await User.findById(authData.user._id)
		
				if(!user){
					return res.status(400).json({message : 'User does not exist!'})
				}
		
				try {
					const event = await Event.create({
						title,
						description,
						sport,
						price : parseFloat(price),
						user: authData.user._id,
						thumbnail: location,
						date
					})
					return res.json({authData, event})			
				} catch (error) {
					return res.status(400).json({ message: error })
				}	
			}
		})
	},

	deleteEventById(req,res){
		jwt.verify(req.token, 'secret', async (err) => {
			if(err){
				res.sendStatus(401)
			}else{
				const { eventId } = req.params

				try {
					await Event.findByIdAndDelete(eventId)
					return res.status(204).send()
					
				} catch (error) {
					return res.Error(404).json({ message : 'Event ID not found !'})
				}
			}
		})
	}
}