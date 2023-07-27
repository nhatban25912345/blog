const newsRouter = require("./news");
const siteRouter = require("./site");
const courseRouter = require("./courses");
const userRouter = require("./users");
const loginRouter = require("./login");
const profileRouter = require("./profile");
// const jwt  = require("../app/middleware/jwt");
const middleware = require("../app/middleware")
const verifyToken = middleware.authenticator.verifyToken;

function route(app) {
  app.use("/profile", verifyToken, profileRouter);
  app.use("/login", loginRouter);
  app.use("/courses", verifyToken, courseRouter);
  app.use("/news", newsRouter);
  app.use("/users", verifyToken, userRouter);
  app.use("/", siteRouter);
}

module.exports = route;
