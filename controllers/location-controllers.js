import express from "express";
import db from "./../server.js";
const router = express.Router();

export const createCountry = (req, res) => {
  let sql = "INSERT INTO countries SET ?";
  const country = req.body;
  db.query(sql, country, (err, resuts) => {
    if (err) throw err;
    let _countrySql = `select * from countries where id=${resuts.insertId}`;
    db.query(_countrySql, (err, result) => {
      if (err) throw err;
      res.send({
        data: result,
        message: "Country is created succesfully",
      });
    });
  });
};

export const getCountries = (req, res) => {
  let sql = `SELECT * FROM countries`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send({
      data: results,
      message: "Countries are retrived succesfully",
    });
  });
};

//States
export const createState = (req, res) => {
  let sql = "INSERT INTO states SET ?";
  const state = req.body;
  db.query(sql, state, (err, resuts) => {
    if (err) throw err;
    let _stateSql = `select * from states where id=${resuts.insertId}`;
    db.query(_stateSql, (err, result) => {
      if (err) throw err;
      res.send({
        data: result,
        message: "State is created succesfully",
      });
    });
  });
};
export const getStates = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM states WHERE country_id=${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send({
      data: results,
      message: "States are retrived succesfully",
    });
  });
};
export default router;
