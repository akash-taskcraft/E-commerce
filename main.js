var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const connectDatabase = require("./config/connection");
const cloudConnect = require("./config/cloud")
const user = require("./routes/userRoutes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
connectDatabase();
cloudConnect();
app.use("/api/v1", user);
app.listen(3000)  