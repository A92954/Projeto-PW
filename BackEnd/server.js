const express = require("express");
//const indexRoute = require('./routes/index');
const routeM = require("./routes/routeM");
const expressSanitizer = require("express-sanitizer");
const cors = require('cors'); 
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passport = require('passport');
const session = require('express-session');
const app = express();
const hostname = "127.0.0.1";
const port = 3000;
const BodyParser = require("body-parser");

//require('./auth')(passport);

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  exposedHeaders: ['Location'],
}));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(__dirname + '/public'));
app.use("/", routeM);

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
