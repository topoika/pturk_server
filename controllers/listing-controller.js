import express from "express";
import db from "./../server.js";
const router = express.Router();

// export const getAllListings = (req, res) => {
//   let arr = [];
//   let sql =
//     "SELECT `id`, `name`, `date_created`, `date_updated`, `country_id` FROM `new_listing`";

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

export const getAllListings = (req, res) => {
  let sql = `SELECT  sub_categories.id,sub_categories.name,categories.id, categories.name FROM sub_categories FULL OUTER JOIN categories ON sub_categories.parent_category=categories.id`; //sub_categories.parent_category`;
  try {
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send({ message: "Everything is okay", data: results });
    });
  } catch (error) {
    throw error;
  }
};

export default router;
