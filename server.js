require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const store = new session.MemoryStore();
const PORT = process.env.PORT || 8888;

const indexRouter = require("./routes/index");
// api routes go through simple auth
const convertRouter = require("./routes/api/convert");
const apiCurrencyRoute = require("./routes/api/currency-api");
const apiExpendituresRoute = require("./routes/api/expenditures-api");
const apiUsersRoute = require("./routes/api/users-api");
const apiCategoriesRoute = require("./routes/api/categories-api");
// login/logout
const loginRouter = require("./routes/login");

// signUp  TODO

const authAPIRouter = require("./routes/authenticateAPI");
const authCheckRouter = require("./routes/authCheck");

// view engine is REACT :)
const app = express();
app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "some secret",
    cookie: {
      name: "session",
      secure: false,
      secret: "some secret",
      keys: ["This", "is", "a", "test"],
      sameSite: "lax",
    },
    saveUninitialized: false,
    resave: false,
    store,
  })
);

//  logging function for every request to test sessions
app.use("*", (req, res, next) => {
  console.log(
    "IS THERE A COOKIE",
    req.cookies,
    "LOGGED IN AS",
    req.session.user,
    "SESSION ID",
    req.sessionID
  );
  next();
});

// basic for dev purposes
app.use("/", indexRouter);

// send all api routes through auth
app.use("/api", authAPIRouter);

// specifically for login/logout/auth
app.use("/", loginRouter);
app.use("/", authCheckRouter);

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
