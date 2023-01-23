const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

// add bodyparser
// cors
// proxy goes into the front end, currently set in the backend.. afraid to touch rn lol

const indexRouter = require("./routes/index");
const convertRouter = require("./routes/api/convert");

const app = express();

// view engine is REACT :)

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// api
app.use("/api", convertRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
