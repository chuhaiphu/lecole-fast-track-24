import express from "express";
import productRouter from "./route/productRoute.js";
import productService from "./service/productService.js";
import { corsOptions } from "./util/cors.js";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

productService.initializeDatabase();

app.use("/api/product", productRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});