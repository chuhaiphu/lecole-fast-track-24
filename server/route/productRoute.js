import express from 'express';
import ProductController from '../controller/productController.js';

const productRouter = express.Router();

productRouter.get("/", ProductController.getAllProducts);
productRouter.post("/", ProductController.addProduct);
productRouter.put("/:id", ProductController.updateProduct);
productRouter.delete("/:id", ProductController.deleteProduct);

export default productRouter;

