import express from "express";
import sqlite3 from "sqlite3";
import http from "http";
import { Server } from "socket.io";
import { TodoService } from "./services/todoService.js";
import { TodoController } from "./controllers/todoController.js";
import { setupTodoRoutes } from "./routes/todoRoutes.js";

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

// Middleware setup
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Database setup
const db = new sqlite3.Database("./database/todos.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Initialize services and controllers
const todoService = new TodoService(db);
const todoController = new TodoController(todoService);

// Setup routes
app.use('/api', setupTodoRoutes(todoController));

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});