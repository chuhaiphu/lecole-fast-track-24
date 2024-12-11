import express from "express";
import http from "http";
import { Server } from "socket.io";
import userRoutes from './routes/userRoutes.js';
import setupSocketHandlers from './socket/socketHandler.js';

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

setupSocketHandlers(io);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});