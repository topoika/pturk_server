import express from "express";
import db from "./../server.js";
const router = express.Router();
export const getActivity = (req, res) => {
  let completeActivities = [];
  let sql = `SELECT * FROM activites LIMIT=20`;
  db.query(sql, (err, activities) => {
    if (err) throw err;
    activities.forEach((activity) => {
      let userSql = `SELECT * FROM users WHERE id=${activity.user_id}`;
      db.query(userSql, (err, user) => {
        if (err) throw err;
        activity.user = user[0];
        completeActivities.push(activity);
      });
    });
  });
};

export const createActivity = (req, res) => {
  let activity = req.body;
  let sql = `INSERT INTO activities SET ?`;
  db.query(sql, activity, (err, results) => {
    if (err) throw err;
    let _sql = `SELECT * FROM activities WHERE id=${results.insertId}`;
    db.query(_sql, (err, _activity) => {
      if (err) throw err;
      res.send({
        data: _activity,
        message: "Activity is created succesfully",
      });
    });
  });
};
export default router;
