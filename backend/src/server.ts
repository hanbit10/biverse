// import dotenv from "dotenv";
// dotenv.config();
import path from "path";

import express from "express";
import cors from "cors";
import { rmSync } from "fs";
import jwt from "jsonwebtoken";
import { sample_foods, sample_tags, sample_users } from "./data";
// import foodRouter from "./routers/food.router";
// import userRouter from "./routers/user.router";
// import orderRouter from "./routers/order.router";
// import { dbConnect } from "./configs/database.config";
// dbConnect();

const app = express();
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;

  //Pizza and pizza no difference
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodID = req.params.foodId;
  const food = sample_foods.find((food) => food.id == foodID);
  res.send(food);
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email == email && user.password === password
  );
  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("User name or password is not valid!");
  }
});

////////////////////////////////////////////////////

// app.use("/api/foods", foodRouter);
// app.use("/api/users", userRouter);
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

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SomeRandomText",
    {
      expiresIn: "30d",
    }
  );
  user.token = token;
  return user;
};

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
