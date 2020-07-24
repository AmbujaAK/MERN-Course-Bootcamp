import axios from 'axios'

if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config()	
}

let BASE_URL = ''

if(process.env.NODE_ENV !== 'production') {
	BASE_URL = 'http://localhost:8080'
} else {
	BASE_URL = process.env.API_BASE_URL
}

const api = axios.create({
	baseURL: BASE_URL
})

export default api