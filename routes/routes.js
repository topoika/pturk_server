import express from "express";
import { getAllListings } from "./../controllers/listing-controller.js";
import {
  getAllCategories,
  addCategory,
  addSubCategory,
  getFeaturedCategories,
  getAllSubCategories,
  getRandomSubCategories,
} from "./../controllers/category-controller.js";
import {
  loginUser,
  createCountry,
  registerUser,
} from "../controllers/user-controller.js";
const router = express.Router();

//Categories Routes
router.get("/categories", varifyUserToken, getAllCategories);
router.get("/featuredcategories", getFeaturedCategories);
router.post("/category", addCategory);

//Sub-categories Routes
router.get("/subcategories/:id", getAllSubCategories);
router.get("/randomsubcategories", getRandomSubCategories);
router.post("/subcategory", addSubCategory);

//Listings Routes
router.get("/listings", getAllListings);

//User Managment Routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/create", createCountry);

//Midleware

function varifyUserToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
    console.log("I know");
  } else {
    res.sendStatus(403);
  }
}

export default router;
