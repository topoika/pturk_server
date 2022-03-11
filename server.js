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
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "plumbingturkey_test1",
//   password: "vY7g8fKP!UHy",
//   port: 3306,
//   database: "plumbingturkey_test",
// });

const app = express();
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running");
  db.connect((err) => {
    if (err) {
      console.log("Error is " + err.message);
    } else {
      console.log("Succesful connection");
    }
  });
});
app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.send("Hello go to the /api endpoing");
});

export default db;
