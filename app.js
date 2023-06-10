const express = require("express");
const app = express();

const mongoose = require("mongoose");
const mongodb = require("mongodb");

const cors = require("cors");

// Database Connectivity Section------------------------------------------------------------
mongoose.connect(
  "mongodb+srv://rudnawang07:Rudra143@cluster0.aa2fach.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("error", (err) => {
  console.log("Connection failed to Database");
});

mongoose.connection.on("connected", (connected) => {
  console.log("Connected Successfully With Database");
});

// -------------------------------------------------------------------------------------------

module.exports = app;
