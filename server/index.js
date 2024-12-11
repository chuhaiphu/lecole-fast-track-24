import express from "express";
import http from "http";
import { Server } from "socket.io";
import setupSocketHandlers from './socket/socketHandler.js';
import userRouter from "./route/userRoute.js";
import cors from 'cors'

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);

setupSocketHandlers(io);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});