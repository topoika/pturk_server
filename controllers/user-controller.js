import express from "express";
import db from "./../server.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();

export const registerUser = async (req, res) => {
  const user = req.body;
  let salt = await bcrypt.genSalt(6);
  user.password = await bcrypt.hash(user.password, salt);
  console.log(user.password);
  let sql = "INSERT INTO users SET ?";
  jwt.sign({ user }, "secretkey", (err, token) => {
    if (err) throw err;
    user.api_token = token;
    db.query(sql, user, (err, results) => {
      if (err) throw err;
      let _sql = `select * from users where id=${results.insertId}`;
      db.query(_sql, (err, result) => {
        if (err) throw err;
        res.send({
          user: result,
          message: "User is created succesfully",
        });
      });
    });
  });
};
export const loginUser = async (req, res) => {
  let user = req.body;
  let sql = `SELECT * FROM users WHERE email="${user.email}"`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    let hashedPassword = results[0].password;
    let pswd = user.password;
    bcrypt.compare(pswd, hashedPassword, (err, result) => {
      console.log(result);
      if (result) {
        res.send({
          user: results,
          message: "User is retrived succesfully",
        });
      } else {
        res.sendStatus(401);
      }
    });
  });
};

export const createCountry = (req, res) => {
  let sql = `CREATE TABLE countries (
    id int  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name char(128)  NOT NULL,
    iso3 char(4) NOT NULL,
    code char(4) NOT NULL,
    region char(50)  NOT NULL,
    subregion char(100), 
    capital char(100),
    phonecode char(5),
    country_code char(8)  NOT NULL,
    latitude decimal(9,6)  NOT NULL,
    longitude decimal(9,6)  NOT NULL,
    created_at Date NOT NULL,
    updated_at Date NOT NULL,
    wikiDataId char(30)
)`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send({
      results,
    });
  });
};

export default router;
