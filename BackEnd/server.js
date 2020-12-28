const express = require("express");
//const indexRoute = require('./routes/index');
const routeM = require("./routes/routeM");
const expressSanitizer = require("express-sanitizer");

const app = express();
const hostname = "127.0.0.1";
const port = 3000;
const BodyParser = require("body-parser");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use("/", routeM);

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
