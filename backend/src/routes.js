const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

//status
routes.get('/', (req,res)=>{
	res.send({ status: 200 })
})

//Registration
routes.post('/registration/:eventId', RegistrationController.register)
routes.get('/registration/:registration_id', RegistrationController.getRegistration)
routes.get('/registration/:registration_id/approvals', ApprovalController.approval)
routes.get('/registration/:registration_id/rejections', RejectionController.rejection)

//Login
routes.post('/login', LoginController.login)

//Dashboard
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/dashboard/:sport', DashboardController.getAllEvents)
routes.get('/event/:eventId', DashboardController.getEventById)

//Event
routes.post('/event', upload.single('thumbnail'), EventController.createEvent)
routes.delete('/event/:eventId', EventController.deleteEventById)

//User
routes.post('/user/createUser',UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes