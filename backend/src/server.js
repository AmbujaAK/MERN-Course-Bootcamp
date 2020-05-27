const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 8081

if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}

app.use(cors())
app.use(express.json())


try {
	mongoose.connect(process.env.MONGO_DB_CONNECTION_AK, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDB connected successfully!')
} catch (error) {
	console.log(error)
}

app.use('/files', express.static(path.resolve(__dirname, '..','files')))
app.use(routes)

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})