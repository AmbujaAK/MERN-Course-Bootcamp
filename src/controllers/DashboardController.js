const Event = require('../models/Event')

module.exports = {
	async getEventById(req,res){
		const { eventId } = req.params

		try {
			const event = await Event.findById(eventId)

			if(event){
				return res.json(event)
			} else {
				return res.status(400).json({
					message: 'Event ID does not exist!'
				})	
			}
		} catch (error) {
			return res.status(400).json({
				message: 'Event ID does not exist!'
			})
		}
	},

	async getAllEvents(req,res){
		const { sport } = req.params
		const query = { sport } || {}

		try {
			const events = await Event.find(query)

			if(events){
				return res.json(events)
			}
		} catch (error) {
			return res.status(400).json({
				message: 'we don\'t have any events!'
			})
		}
	}
}