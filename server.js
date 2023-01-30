require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8888;

// add bodyparser
// cors
// proxy goes into the front end, currently set in the backend.. afraid to touch rn lol

const indexRouter = require("./routes/index");
const convertRouter = require("./routes/api/convert");
const apiCurrencyRoute = require("./routes/api/curency-api");
const apiExpendituresRoute = require("./routes/api/expenditures-api");
const apiUsersRoute = require("./routes/api/users-api");
const apiCategoriesRoute = require("./routes/api/categories-api");

const app = express();

// view engine is REACT :)

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// api routing
app.use("/api", convertRouter);
app.use("/api/currency", apiCurrencyRoute);
app.use("/api/expenditures", apiExpendituresRoute);
app.use("/api/users", apiUsersRoute);
app.use("/api/categories", apiCategoriesRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
