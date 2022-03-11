import express from "express";
import {
  createListing,
  getAllListings,
} from "./../controllers/listing-controller.js";
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
  registerUser,
  updateUser,
  getRandomBackgroundImage,
  addBackgroundImage,
  getUserInfo,
} from "../controllers/user-controller.js";
import {
  createCountry,
  createState,
  getCountries,
  getStates,
} from "../controllers/location-controllers.js";
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
router.get("/listings/:id", getAllListings);
router.post("/listing", createListing);

//User Managment Routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/updateuser", updateUser);
router.get("/getuserinfo", getUserInfo);

//Location Routes Management
router.post("/country", createCountry);
router.get("/countries", getCountries);
router.post("/state", createState);
router.get("/states/:id", getStates);

//Background Image Routes
router.get("/background", getRandomBackgroundImage);
router.post("/add-background", addBackgroundImage);

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
