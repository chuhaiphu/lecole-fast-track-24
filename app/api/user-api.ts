// import axios from 'axios'


// const API_ROOT = `${import.meta.env.VITE_API_URL}/api`

// export const registerUserAPI = async (userData: { username: string; roles: string; secret_phrase: string }) => {
//   const response = await axios.post(`${API_ROOT}/users/register`, userData)
//   return response.data
// }

// export const loginUserAPI = async (credentials: { username: string; secret_phrase: string }) => {
//   const response = await axios.post(`${API_ROOT}/users/login`, credentials)
//   return response.data
// }

// export const getUserByUsernameAPI = async (username: string) => {
//   const response = await axios.get(`${API_ROOT}/users/${username}`)
//   return response.data
// }

// export const getAllUsersAPI = async () => {
//   const response = await axios.get(`${API_ROOT}/users`)
//   return response.data
// }

import axios from 'axios'

// Create an axios instance with common configuration
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  // Add these options for handling secure connections
  withCredentials: true,
  httpsAgent: {
    rejectUnauthorized: false
  }
});

export const registerUserAPI = async (userData: { username: string; roles: string; secret_phrase: string }) => {
  const response = await axiosInstance.post('/users/register', userData)
  return response.data
}

export const loginUserAPI = async (credentials: { username: string; secret_phrase: string }) => {
  const response = await axiosInstance.post('/users/login', credentials)
  return response.data
}

export const getUserByUsernameAPI = async (username: string) => {
  const response = await axiosInstance.get(`/users/${username}`)
  return response.data
}

export const getAllUsersAPI = async () => {
  const response = await axiosInstance.get('/users')
  return response.data
}