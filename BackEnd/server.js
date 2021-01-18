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
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');


require('./auth')(passport);

app.set('view engine', 'ejs');

app.use(session({  
  secret: '123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }//30min
}))


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

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}

app.use('/users', authenticationMiddleware, usersRouter);
app.use('/login', loginRouter);



app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
