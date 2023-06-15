const express = require("express");
const app = express();
const port = 3030;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/trang-chu", (req, res) => res.send("Hello World"));

app.listen(port, () =>
  console.log(`This app listening at http://localhost:${port}`)
);
