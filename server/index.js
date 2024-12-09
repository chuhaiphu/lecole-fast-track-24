import express from "express";
import productRouter from "./route/productRoute.js";
import productService from "./service/productService.js";

const app = express();
const port = 3000;

app.use(express.json());

productService.initializeDatabase();

app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});