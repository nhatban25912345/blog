const newsRouter = require("./news");
const siteRouter = require("./site");
const courseRouter = require("./courses");
const userRouter = require("./users");
const loginRouter = require("./login");
const jwt  = require("../app/middleware/jwt");

function route(app) {
  app.use("/login", jwt, loginRouter);
  app.use("/courses", courseRouter);
  app.use("/news", newsRouter);
  app.use("/users", userRouter);
  app.use("/", siteRouter);
}

module.exports = route;
