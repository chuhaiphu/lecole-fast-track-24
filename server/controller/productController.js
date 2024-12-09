import ProductService from '../service/productService.js';
import { responseData } from '../util/response.js';

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      responseData(200, "Success", "Products retrieved successfully", products, res);
    } catch (error) {
      console.error(error);
      responseData(500, "Error", "Failed to retrieve products", null, res);
    }
  }

  async addProduct(req, res) {
    try {
      const product = req.body;
      const newProduct = await ProductService.addProduct(product);
      responseData(201, "Success", "Product added successfully", newProduct, res);
    } catch (error) {
      console.error(error);
      responseData(500, "Error", "Failed to add product", null, res);
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const productData = req.body;
      const updatedProduct = await ProductService.updateProduct(productId, productData);
      responseData(200, "Success", "Product updated successfully", updatedProduct, res);
    } catch (error) {
      console.error(error);
      responseData(500, "Error", "Failed to update product", null, res);
    }
  }
  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      await ProductService.deleteProduct(productId);
      responseData(200, "Success", "Product deleted successfully", null, res);
    } catch (error) {
      console.error(error);
      responseData(500, "Error", "Failed to delete product", null, res);
    }
  }
  
}

export default new ProductController();
