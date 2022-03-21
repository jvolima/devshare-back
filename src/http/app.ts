import "reflect-metadata";
import "express-async-errors"
import "../shared/container"
import http from "http";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { routes } from "./routes";
import { AppError } from "../errors/AppError";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  console.log(`Usuario conectado no socket ${socket.id}`)
})

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      })
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`
    })
  }
)

export { serverHttp, io };