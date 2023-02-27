import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";
const router = Router();

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const foods = await FoodModel.find();
//     res.send(foods);
//   })
// );

// router.get("/", (req, res) => {
//   FoodModel.find().then((foods) => {
//     res.send(foods);
//   });
// });

router.get("/", async (req, res) => {
  try {
    const food = await FoodModel.find();
    res.json(food);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET DIRECTRY FROM data.ts
// router.get("/", async (req, res) => {
//   res.send(sample_foods);
// });

router.post("/", async (req, res) => {
  const food = new FoodModel({
    name: req.body.name,
    price: req.body.price,
    tags: req.body.tags,
    favorite: req.body.favorite,
    stars: req.body.stars,
    imageUrl: req.body.imageUrl,
    origins: req.body.origins,
    cookTime: req.body.cookTime,
  });
  try {
    const savePost = await food.save();
    res.json(savePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const food = await FoodModel.find();
//     food.save(food).then((data) => {
//       res.send(data);
//     });
//   })
// );

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
      res.send("Seed is already done");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send("Seed is done");
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  })
);

export default router;
