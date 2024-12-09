import axios from 'axios'

const API_ROOT = 'http://localhost:3000'

export const getAllProducts = async () => {
  const response = await axios.get(`${API_ROOT}/api/product/`)
  return response.data
}