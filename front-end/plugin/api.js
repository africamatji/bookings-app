import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const login = (credentials) => {
  return api.post('/login', credentials)
}

export const register = (userData) => {
  return api.post('/register', userData)
}

export const list = () => {
  const accessToken = localStorage.getItem('access_token')

  return api.get('/booking/list', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

export default ({ app }, inject) => {
  app.api = api
  inject('api', api)
}
