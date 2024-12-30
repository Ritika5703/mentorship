require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/dbConnection");
const errorMiddleware = require("./error/error.js");

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// dbConnection();

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorMiddleware);

module.exports = app;
