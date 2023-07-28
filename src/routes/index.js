const loginRouter = require("./login");
const signUpRouter = require("./signUp");
const siteRouter = require("./site");
const userRouter = require("./users");
const profileRouter = require("./profile");

const middleware = require("../app/middleware")
const verifyToken = middleware.authenticator.verifyToken;

function route(app) {
  app.use("/login", loginRouter);
  app.use("/sign-up", signUpRouter);
  app.use("/profile", verifyToken, profileRouter);
  app.use("/users", verifyToken, userRouter);
  app.use("/",verifyToken, siteRouter);
}

module.exports = route;
