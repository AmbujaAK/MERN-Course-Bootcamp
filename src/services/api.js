import axios from 'axios'

const api = axios.create({
	baseURL: 'https://mern-bootcamp-backend.herokuapp.com'
})

export default api