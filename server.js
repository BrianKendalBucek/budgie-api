require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8888;
const KEY = process.env.KEY || "a really bad key";

// add bodyparser

const indexRouter = require("./routes/index");
const convertRouter = require("./routes/api/convert");
const apiCurrencyRoute = require("./routes/api/currency-api");
const apiExpendituresRoute = require("./routes/api/expenditures-api");
const apiUsersRoute = require("./routes/api/users-api");
const apiCategoriesRoute = require("./routes/api/categories-api");

const app = express();
app.set('trust proxy', 1) 
// view engine is REACT :)

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieSession({
  name: 'session',
  keys: ["password"],
  //maxAge: 24 * 60 * 60 * 1000,
  //user_id: 1
}));


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
