import express from "express";
import db from "./../server.js";
const router = express.Router();

// export const getAllListings = (req, res) => {

//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     result.forEach((e) => {
//       let _sql = `SELECT id,name, date_created, date_updated  FROM countries WHERE id = ${e.country_id}`;
//       db.query(_sql, (err, _result) => {
//         if (err) throw err;
//         e.country = JSON.parse(JSON.stringify(_result[0]));
//         arr.push(e);
//         arr.length == result.length
//           ? res.send(JSON.parse(JSON.stringify(arr)))
//           : console.log("Nothings");
//       });
//     });
//   });
// };
export const createListing = (req, res) => {
  let sql = "INSERT INTO listings SET ?";
  const listing = req.body;
  db.query(sql, listing, (err, resuts) => {
    if (err) throw err;
    let _countrySql = `select * from listings where id=${resuts.insertId}`;
    db.query(_countrySql, (err, result) => {
      if (err) throw err;
      res.send({
        data: result,
        message: "Listing is created succesfully",
      });
    });
  });
};
export const getAllListings = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM listings WHERE category_id=${id} AND sponsored=0`;
  try {
    db.query(sql, (err, results) => {
      if (err) throw err;
      let sponsoredSql = `SELECT * FROM listings WHERE category_id=${id} AND sponsored=1`;
      db.query(sponsoredSql, (err, sponsored) => {
        res.send({
          data: results,
          sponsored: sponsored,
          message: "Listings are retrived succesfully",
        });
      });
    });
  } catch (error) {
    throw error;
  }
};

export default router;
