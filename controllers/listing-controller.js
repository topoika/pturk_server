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
        if (err) throw err;
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

export const getListing = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM listings WHERE id=${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send({
      data: results,
      message: "Listing are retrived succesfully",
    });
  });
};
export const createFaq = (req, res) => {
  let faq = req.body;
  let sql = "INSERT INTO listing_faq SET ?";
  db.query(sql, faq, (err, row) => {
    if (err) throw err;
    let faqSql = `select * from listing_faq where id=${row.insertId}`;
    db.query(faqSql, (err, _faq) => {
      if (err) throw err;
      res.send({
        data: _faq,
        message: "Listing faq is created succesfully",
      });
    });
  });
};

export const getFaqs = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM listing_faq WHERE listing_id=${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send({
      data: results,
      message: "Listing faqs are retrived succesfully",
    });
  });
};
export const createOpationHour = (req, res) => {
  let hour = req.body;
  let sql = "INSERT INTO operating_hours SET ?";
  db.query(sql, hour, (err, row) => {
    if (err) throw err;
    let hoursSql = `select * from operating_hours where id=${row.insertId}`;
    db.query(hoursSql, (err, hours) => {
      if (err) throw err;
      res.send({
        data: hours,
        message: "Opation Hours is created succesfully",
      });
    });
  });
};
export const getOpationHours = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM operating_hours WHERE listing_id=${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send({
      data: results,
      message: "Opation Hours are retrived succesfully",
    });
  });
};

export default router;
