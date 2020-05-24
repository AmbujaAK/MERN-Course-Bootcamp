const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

//status
routes.get('/', (req,res)=>{
	res.send({ status: 200 })
})


//TODO: SubscribeController
//TODO: ApprovalController
//TODO: RejectionController

//Login
routes.post('/login', LoginController.login)

//Dashboard
routes.get('/dashboard/event/:eventId', DashboardController.getEventById)
routes.get('/dashboard/events', DashboardController.getAllEvents)
routes.get('/dashboard/events/:sport', DashboardController.getAllEvents)

//Event
routes.post('/event', upload.single('thumbnail'), EventController.createEvent)
routes.delete('/events/:eventId', EventController.deleteEventById)

//User
routes.post('/user/createUser',UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes