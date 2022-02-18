import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import apiRoutes from "./routes/routes.js";
import cors from "cors";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pturk",
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesful connection");
  }
});
const app = express();

app.listen();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRoutes);

export default db;
