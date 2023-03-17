const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require("./config/database");
const path = require("path");


const PORT = process.env.PORT || 4000;
const app = express();

var cors = require("cors");
var server = require("http").Server(app);

app.use(cors());

app.use(cookieParser());


const blogApi = require("./routes/api");
app.use(bodyParser.urlencoded({ extended: true }));
// connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.locals.moment = require("moment");

app.use("/api/v1", blogApi);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
