var express = require('express');
var routescan = require('express-routescan');
var bodyParser = require('body-parser');
var cors = require("cors");

// Initialize the app
var app = express();
routescan(app, {
    directory: [
        './src/routes'
    ]
  });

// Enable CORS
app.use(cors());
app.options('*', cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', function (req, res) {
  res.send('Welcome to your Wheel of Fortune API!');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, function () {
  console.log('Wheel of Fortune API listening on port 3000!')
});
