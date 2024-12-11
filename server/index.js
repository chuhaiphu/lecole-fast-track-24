import express from "express";
import http from "http";
import { Server } from "socket.io";
import setupSocketHandlers from './socket/socketHandler.js';
import userRouter from "./route/userRoute.js";
import cors from 'cors'

const app = express();
const port = 3000;

const server = http.createServer(app);

app.use(cors({
  origin: true,
  credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use('/api/users', userRouter);
setupSocketHandlers(io);

app.listen(port, "23.23.66.44", () => {
  console.log(`Server running at http://23.23.66.44:${port}`);
});