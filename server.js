import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import apiRoutes from "./routes/routes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// const db = mysql.createConnection({
//   host: process.env.LOCAL_HOST,
//   user: process.env.L0CAL_USER,
//   password: process.env.LOCAL_PASSWORD,
//   database: process.env.LOCAL_DATABASE,
// });
const db = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT,
  database: process.env.SQL_DATABASE,
  dialect: process.env.SQL_DIALECT,
  waitForConnections: true,
  timeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
});

const app = express();
const PORT = process.env.LOCAL_PORT;
app.listen(PORT, () => {
  console.log("Server is running");
  firstQuery();
  // db.connect((err) => {
  //   if (err) {
  //     console.log("Error is " + err.message);
  //     firstQuery();
  //   } else {
  //     console.log("Succesful connection");
  //     firstQuery();
  //   }
  // });
});

function firstQuery() {
  let sql = "SELECT * FROM countries";
  db.query(sql, (err, results) => {
    if (err) console.log("Error here is :" + err.message);
    console.log(results);
  });
}
app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.send("Hello go to the /api endpoing");
});

export default db;
