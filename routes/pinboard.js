let express = require('express');
let Pinboard = require('node-pinboard');

const api_token = 'skinna123:15C82105FA77E7F20883';

let pinboard = new Pinboard(api_token);
let router = express.Router();

const _logRequestData = function (req) {
  console.log('body:', req.body);
  console.log('params:', req.params);
  console.log('query:', req.query);
};

// router.get('/', function(req, res, next) {
//   res.send('respond with a pinboard resource');
// });

// TODO add method
// TODO delete method

router.get('/get', function(req, res, next) {
  _logRequestData(req);
  pinboard.get({}, function (err, response) {
    if (err) res.send(err);
    res.status(200).json(response);
  });
});

router.get('/dates', function(req, res, next) {
  _logRequestData(req);
  pinboard.dates({}, function (err, response) {
    if (err) res.send(err);
    res.status(200).json(response);
  });
});

// TODO recent method

router.get('/all', function(req, res, next) {
  pinboard.all({}, function (err, response) {
    if (err) res.send(err);
    res.status(200).json(response);
  });
});

// TODO suggest method
// TODO getTags method
// TODO delTag method
// TODO renameTag method
// TODO userSecret method
// TODO api_token method
// TODO listNotes method
// TODO getNote method

module.exports = router;
