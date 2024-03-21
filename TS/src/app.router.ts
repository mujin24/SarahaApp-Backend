import * as express from "express";
import { NextFunction, Request, Response ,Errback} from "express";
import { httpStatusText } from "../utils/httpStatusText";
import logger from "../utils/logger";
import authRouter from "./Auth/auth.router";
import messageRouter from "./Message/message.router";
import userRouter from "./User/user.router";
const appRouter = (app: express.Express) => {
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));

  app.use(logger);

  // Auth
  app.use("/api/auth", authRouter);

  // Messages
  app.use("/api/message", messageRouter);

  // User
  app.use("/api/user", userRouter);

  app.get("/api/ping", (_, res) => {
    res.send(
      `<h1><a href="https://www.youtube.com/watch?v=NQnKicJiIN8" target="_blank" ><center>Pong</center></a></h1>`
    );
  });

  app.get("/", (_, res) => {
    res.json({
      status: "success",
      message:
        "Welcome to Saraha App! Explore our API by using the Postman collection available in the repository.",
    });
  });

  // Not found
  app.all("*", (req, res, next) => {
    res.status(500).json({
      status: httpStatusText.FAIL,
      message: "End-Point Not Implemented Yet",
    });
  });

  // Global Error Handler
  app.use((error, req: Request, res: Response, next: NextFunction) => {
    const { message, statusCode, statusText } = error;

    res.status(statusCode || 500).json({
      status: statusText || httpStatusText.ERROR,
      code: statusCode || 500,
      message: message || "Internal Server Error",
    });
  });
};

export default appRouter;
