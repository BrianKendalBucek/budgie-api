require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
// const session = require("express-session");
// const store = new session.MemoryStore();
const PORT = process.env.PORT || 8888;
// const KEY = process.env.KEY || "a really bad key";

// add bodyparser

const indexRouter = require("./routes/index");
const convertRouter = require("./routes/api/convert");
const apiCurrencyRoute = require("./routes/api/currency-api");
const apiExpendituresRoute = require("./routes/api/expenditures-api");
const apiUsersRoute = require("./routes/api/users-api");
const apiCategoriesRoute = require("./routes/api/categories-api");

const loginRouter = require("./routes/login");

const app = express();
app.set("trust proxy", 1);
// view engine is REACT :)

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
// app.use(
//   session({
//     secret: "some secret",
//     cookie: { maxAge: 30000 },
//     saveUninitialized: false,
//     resave: true,
//     store,
//   })
// );
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    secret: "some secret",
    sameSite: "lax",
    keys: ["This", "is", "a", "test"],
    // maxAge: 24 * 60 * 60 * 1000,
    secure: false,
  })
);

app.use("/", indexRouter);

// login/logout
app.use("/", loginRouter);

// signup

// api routing
app.use("/api", convertRouter);
app.use("/api/currency", apiCurrencyRoute);
app.use("/api/expenditures", apiExpendituresRoute);
app.use("/api/users", apiUsersRoute);
app.use("/api/categories", apiCategoriesRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
