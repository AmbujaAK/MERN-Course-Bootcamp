const Event = require('../models/Event')
const jwt = require('jsonwebtoken')

module.exports = {
	async getEventById(req,res){
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if(err){
				res.sendStatus(401)
			} else {
				const { eventId } = req.params

				try {
					const event = await Event.findById(eventId)
		
					if(event){
						return res.json({authData,event})
					}
				} catch (error) {
					return res.status(400).json({message: 'Event ID does not exist!'})
				}
			}
		})
	},

	async getAllEvents(req,res){
		jwt.verify(req.token, 'secret', async(err, authData) => {
			if(err){
				res.sendStatus(401)
			}else{
				const { sport } = req.params
				const query = sport ? { sport } : {}
				
				try {
					const events = await Event.find(query)
		
					if(events){
						return res.json({authData, events})
					}
				} catch (error) {
					return res.status(400).json({message: 'we don\'t have any events!'})
				}		
			}
		})
		console.log('token : ' + req.token)
	},

	async getEveByUserId(req,res){
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if(err){
				res.sendStatus(401)
			}else{
				const { user_id } = req.headers
		
				try {
					const events = await Event.find({user: authData.user._id})
		
					if(events){
						return res.json({authData,events})
					}
				} catch (error) {
					return res.status(400).json({message: `we do not have any events with the user_id ${user_id}!`})
				}
			}
		})
	}

}