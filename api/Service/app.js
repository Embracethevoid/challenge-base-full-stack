const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");


const orderRouter = require("./routes/order");
// const mongoose = require('mongoose');
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json())
app.use("/",orderRouter)
// app.use("/leaders",leaderRouter)
// app.use("/promotions",promotionRouter)
app.use(express.static(__dirname+"/public"));

module.exports = app;