import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import apiRoutes from "./routes/routes.js";
import cors from "cors";

const db = mysql.createConnection({
  host: "server270.web-hosting.com",
  user: "myvaudzq_testuser",
  password: "vY7g8fKP!UHy",
  database: "myvaudzq_test1",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Succesful connection");
  }
});
const app = express();
const PORT = 3001;
app.listen(PORT, () => console.log("Server is running"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.send("Hello go to the /api endpoing");
});

export default db;
