import cors from "cors";
import "dotenv/config.js";
import express from "express";
import { connectDB } from "./TS/Database/connection";
import appRouter from "./TS/src/app.router";
const app = express();
const port = process.env.PORT || 3001;

connectDB();
app.use(cors());
appRouter(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));
