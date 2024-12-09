import ProductService from '../service/productService.js';
import { responseData } from '../config/response.js';

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
}

export default new ProductController();