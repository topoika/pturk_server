import express from "express";
import db from "./../server.js";
const router = express.Router();

export const getReviews = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM reviews WHERE listing_id=${id}`;
  let completeReview = [];
  db.query(sql, (err, reviews) => {
    if (err) throw err;
    reviews.forEach((review) => {
      let userSql = `SELECT * FROM users WHERE id=${review.user_id}`;
      let replySql = `SELECT * FROM review_replies WHERE id=${review.reply_id}`;
      db.query(userSql, (err, user) => {
        if (err) throw err;
        review.user = user[0];
        db.query(replySql, (err, reply) => {
          if (err) throw err;
          review.reply = reply.length == 0 ? null : reply[0];
          completeReview.push(review);
          if (reviews.length == completeReview.length) {
            res.send({
              data: completeReview,
              message: "Reviews are retrived succesfully",
            });
          }
        });
        // completeReview.push(review);
      });
    });
  });
};

export const getOneReview = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM reviews WHERE id=${id}`;
  db.query(sql, (err, review) => {
    if (err) throw err;
    console.log(review);
    let userSql = `SELECT * FROM users WHERE id=${review[0].user_id}`;
    let replySql = `SELECT * FROM review_replies WHERE id=${review[0].reply_id}`;
    db.query(userSql, (err, user) => {
      if (err) throw err;
      review[0].user = user[0];
      db.query(replySql, (err, reply) => {
        if (err) throw err;
        review[0].reply = reply.length == 0 ? null : reply[0];
        res.send({
          data: review,
          message: "Reviews are retrived succesfully",
        });
      });
    });
  });
};

export const creatReview = (req, res) => {
  let review = req.body;
  let sql = "INSERT INTO reviews SET ?";
  db.query(sql, review, (err, row) => {
    if (err) throw error;
    let reviewSql = `select * from reviews where id=${row.insertId}`;
    db.query(reviewSql, (err, review) => {
      if (err) throw error;
      res.send({
        data: review,
        message: "Review is created succesfully",
      });
    });
  });
};

export const createReply = (req, res) => {
  let reply = req.body;
  let sql = `INSERT INTO review_replies SET ?`;
  db.query(sql, reply, (err, row) => {
    if (err) throw error;
    let reviewSql = `select * from review_replies where id=${row.insertId}`;
    db.query(reviewSql, (err, reply) => {
      if (err) throw error;
      res.send({
        data: reply,
        message: "Reply is created succesfully",
      });
    });
  });
};

export default router;
