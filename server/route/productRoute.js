import express from 'express';
import ProductController from '../controller/productController.js';

const productRouter = express.Router();

productRouter.get("/", ProductController.getAllProducts);

export default productRouter;