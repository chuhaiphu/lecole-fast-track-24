import axios from 'axios'

const API_ROOT = 'http://localhost:3000/api'

export const registerUserAPI = async (userData: { username: string; roles: string; secret_phrase: string }) => {
  const response = await axios.post(`${API_ROOT}/users/register`, userData)
  return response.data
}

export const loginUserAPI = async (credentials: { username: string; secret_phrase: string }) => {
  const response = await axios.post(`${API_ROOT}/users/login`, credentials)
  return response.data
}

export const getUserByUsernameAPI = async (username: string) => {
  const response = await axios.get(`${API_ROOT}/users/${username}`)
  return response.data
}

export const getAllUsersAPI = async () => {
  const response = await axios.get(`${API_ROOT}/users`)
  return response.data
}