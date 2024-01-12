import dotenv from "dotenv";
dotenv.config();

import path from "path";

import express from "express";
import cors from "cors";
import { rmSync } from "fs";
import jwt from "jsonwebtoken";
import { sample_foods, sample_tags, sample_users } from "./data";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";

// import orderRouter from "./routers/order.router";
import { dbConnect } from "./configs/database.config";
dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5000"],
  })
);

////////////////////////////////////////////////////

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
// app.use("/api/orders", orderRouter);

app.use(express.static("public"));

//CORS HEAD
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type,Content-Length, Authorization, Accept,X-Requested-With, Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   next();
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
