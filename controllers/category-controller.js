import express from "express";
import db from "./../server.js";
import jwt from "jsonwebtoken";
const router = express.Router();

export const getFeaturedCategories = (req, res) => {
  try {
    const sql = "SELECT * FROM categories LIMIT 7";
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send({
        data: results,
        message: "Featured Categories are retrived succesfully",
      });
    });
  } catch (error) {}
};
export const getAllCategories = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, user) => {
    if (err) res.sendStatus(403);
    try {
      const sql = "SELECT * FROM categories";
      db.query(sql, (err, results) => {
        if (err) throw err;
        res.send({
          data: results,
          user: user,
          message: "All Categories are retrived succesfully",
        });
      });
    } catch (error) {}
  });
};
//Add a category
export const addCategory = (req, res) => {
  console.log(req.body);
  let category = req.body;
  try {
    let sql = "INSERT INTO categories SET ?";
    db.query(sql, category, (err, results) => {
      if (err) throw err;
      res.send({
        data: results,
        message: "Categories are created succesfully",
      });
    });
  } catch (error) {}
};
//Update a category
export const updateCategory = (req, res) => {
  console.log("Updating the categories");
};

//SUB-Categories
//Get all sub_categories
export const getRandomSubCategories = (req, res) => {
  try {
    const sql = `SELECT * FROM sub_categories ORDER BY RAND() LIMIT 4`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send({
        data: results,
        message: "Random sub categories are retrived succesfully",
      });
    });
  } catch (error) {}
};
export const getAllSubCategories = (req, res) => {
  try {
    const sql = `SELECT * FROM sub_categories WHERE parent_category=${req.params.id}`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send({
        data: results,
        message: "sub categories are retrived succesfully",
      });
    });
  } catch (error) {}
};
//Adding a sub-category
export const addSubCategory = (req, res) => {
  let sub_category = req.body;
  try {
    let sql = "INSERT INTO sub_categories SET ?";
    db.query(sql, sub_category, (err, results) => {
      if (err) throw err;
      res.send({
        data: results,
        message: "Sub-categories are created succesfully",
      });
    });
  } catch (error) {}
};

export default router;
