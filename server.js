const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { join } = require('path');
const axios = require('axios');
const querystring = require('querystring');

const _port = process.env.PORT || 4100;
const _app_folder = join(__dirname, 'dist/a-recaptcha-v3');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(_port, () => {
  console.log(`listening on port ${_port}`);
});

app.get('/api/hi', (req, res) => {
  res.json({ hi: 'Hi' });
});

app.post('/api/recaptchav3', (req, res) => {
  axios({
    url: `https://www.google.com/recaptcha/api/siteverify`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: querystring.stringify({
      secret: '6LfGOfAUAAAAANrk5H77_yT-fEtp_sm7B6lL0vcu',
      response: req.body.token,
    }),
  })
    .then(_ => {
      res.json({ recaptcha_response: _.data });
    })
    .catch(err => {
      res.status(555).json({ err });
    });
});

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, { maxAge: '1y' }));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: _app_folder });
});
