import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
//const accessToken = localStorage.getItem('access_token')
export const login = (credentials) => {

  return api.post('/login', credentials)
}

export const register = (userData) => {

  return api.post('/register', userData)
}

export const logout = () => {
  const accessToken = localStorage.getItem('access_token')

  return api.get(`/logout`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

export const listBookings = () => {
  const accessToken = localStorage.getItem('access_token')

  return api.get('/booking/list', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}
export const filterBookings = (type) => {
  const accessToken = localStorage.getItem('access_token')

  return api.get(`/booking/filter?type=${type}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}
export const addBooking = (data) => {
  const accessToken = localStorage.getItem('access_token')

  return api.post(`/booking/create`, data,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

export default ({ app }, inject) => {
  app.api = api
  inject('api', api)
}
