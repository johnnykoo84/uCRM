const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const passport = require('passport');
const bcrypt = require('bcrypt');
const cors = require('cors');
const index = require('./routes/index');
const controller = require('./controller/index');
const auth = require('./middleware/token');

const app = express();

// require('./config/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());

// Returns middleware that only parses urlencoded bodies.
// This parser accepts only UTF-8 encoding of the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.use(cookieParser());

//
// app.use(session({
//   secret: 'uajwlekfjaslfjlsajlj23r23er',
//   resave: true,
//   saveUninitialized: false,
// }));

// specify the folder where user can access static files
app.use(express.static(path.join(__dirname, '../client/public')));

// app.use(passport.initialize());
// app.use(passport.session());

// middleware example
// var myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }
// use web token auth middleware



// app.post('/api/signup/admin/',(req, res, next) => {
//   const formIncomplete = !req.body.companyname || !req.body.userid || !req.body.name || !req.body.mobile || !req.body.password || !req.body.email
//   if (formIncomplete) {
//     res.status(400).send('admin form incomplete');
//   }
//   passport.authenticate('admin', (err, account) => {
//     req.logIn(account, () => {
//       res.status(err ? 400 : 200).send(err ? err : account);
//     });
//   })(req, res, next);
// });
app.post('/api/signup/admin/', (req, res, next) => {
  console.log('req.body', req.body);
  const formIncomplete = !req.body.companyname || !req.body.userid || !req.body.name || !req.body.mobile || !req.body.password || !req.body.email;
  if (formIncomplete) {
    res.status(400).send('admin form incomplete');
  }
  controller.signup_admin.post(req, res);
});

app.post('/api/signup/staff/',(req, res, next) => {
  const formIncomplete = !req.body.userid || !req.body.name || !req.body.mobile || !req.body.password || !req.body.email
  if (formIncomplete) {
    res.status(400).send('staff form incomplete');
  }
  passport.authenticate('staff', (err, account) => {
    req.logIn(account, () => {
      res.status(err ? 400 : 200).send(err ? err : account);
    });
  })(req, res, next);
});

// app.post('/api/login/', (req, res, next) => {
//   const formIncomplete = !req.body.userid || !req.body.password
//   if (formIncomplete) {
//     res.status(400).send('login form incomplete');
//   }
//   passport.authenticate('login', (err, account) => {
//     req.logIn(account, () => {
//       res.status(err ? 400 : 200).send(err ? err : account);
//     });
//   })(req, res, next);
// })
app.post('/api/login/', (req, res) => {
  const formIncomplete = !req.body.userid || !req.body.password;
  if (formIncomplete) {
    res.status(400).send('login form incomplete');
  } else {
    auth.addNewToken(req.body)
    .then((result) => {
      res.set({
        Token: result.token,
      })
      .then((result) => {

      })
      .sendStatus(202);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err);
    });
  }
});

app.get('/api/logout', (req, res) => {
  console.log(req.Token);
  auth.deleteToken(req.body.userid)
  .then((result) => {
    res.status(500).send(result);
  })
  .catch((err) => {
    res.status(403).send(err);
  })
});

// ask Namse api 가 아닌데도 다 낚아 채버림.....위에 코드들 다 실행 안됌
app.use('/api', index);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
