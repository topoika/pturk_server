import express from "express";
import {
  createFaq,
  createListing,
  createListingAttribute,
  createOpationHour,
  getAllListings,
  getFaqs,
  getListing,
  getListingAttributes,
  getOpationHours,
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
import {
  createReply,
  creatReview,
  getOneReview,
  getReviews,
} from "../controllers/reviews-controller.js";
import {
  createActivity,
  createADislike,
  createALike,
  getActivity,
} from "../controllers/activities-controller.js";
const router = express.Router();

//Categories Routes
router.get("/categories", getAllCategories);
router.get("/featuredcategories", getFeaturedCategories);
router.post("/category", addCategory);

//Sub-categories Routes
router.get("/subcategories/:id", getAllSubCategories);
router.get("/randomsubcategories", getRandomSubCategories);
router.post("/subcategory", addSubCategory);

//Listings Routes
router.get("/listings/:id", getAllListings);
router.post("/listing", createListing);
router.get("/listing/:id", getListing);
router.get("/listingfaqs/:id", getFaqs);
router.post("/listingfaq", createFaq);
router.get("/listing/:id", getListing);
router.get("/operatinghours/:id", getOpationHours);
router.post("/operatinghour", createOpationHour);
router.get("/listing/:id", getListing);
router.get("/listingattributes/:id", getListingAttributes);
router.post("/listingattribute", createListingAttribute);

//Reviews Management Routes
router.get("/reviews/:id", getReviews);
router.get("/review/:id", getOneReview);
router.post("/review", creatReview);
router.post("/reply", createReply);

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

//Activities Management Routes
router.get("/activies", getActivity);
router.post("/activity", verifyUserToken, createActivity);
router.post("/addlike/:id", verifyUserToken, createALike);
router.post("/adddislike/:id", verifyUserToken, createADislike);

//Midleware
function verifyUserToken(req, res, next) {
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
