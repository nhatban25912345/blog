const loginRouter = require("./login");
const signUpRouter = require("./signup");
const siteRouter = require("./site");
const userRouter = require("./users");
const profileRouter = require("./profile");

const middleware = require("../app/middleware")
const verifyToken = middleware.authenticator.verifyToken;
const isModerator = middleware.authenticator.isModerator;

function route(app) {
  app.use("/",verifyToken, siteRouter);
  app.use("/login", loginRouter);
  app.use("/sign-up", signUpRouter);
  app.use("/profile", verifyToken, isModerator, profileRouter);
  app.use("/users", verifyToken, userRouter);
}

module.exports = route;