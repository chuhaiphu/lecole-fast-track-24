import axios from 'axios'

const API_ROOT = 'https://lecole-fast-track-24.onrender.com'

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get(`${API_ROOT}/api/product/`)
  return response.data
}

// Add new product
export const addProduct = async (productData: any) => {
  const response = await axios.post(`${API_ROOT}/api/product/`, productData)
  return response.data
}

// Update product
export const updateProduct = async (id: string, productData: any) => {
  const response = await axios.put(`${API_ROOT}/api/product/${id}`, productData)
  return response.data
}

// Delete product
export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_ROOT}/api/product/${id}`)
  return response.data
}
