const express = require('express')
const multer = require('multer')
const verifyToken = require('./config/verifyToken')

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
routes.post('/registration/:eventId', verifyToken, RegistrationController.register)
routes.get('/registration/:registration_id', RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals', verifyToken, ApprovalController.approval)
routes.post('/registration/:registration_id/rejections', verifyToken, RejectionController.rejection)

//Login
routes.post('/login', LoginController.login)

//Dashboard
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById)
routes.get('/user/events', verifyToken, DashboardController.getEveByUserId)

//Event
routes.post('/event', verifyToken, upload.single('thumbnail'), EventController.createEvent)
routes.delete('/event/:eventId',verifyToken, EventController.deleteEventById)

//User
routes.post('/user/createUser',UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes