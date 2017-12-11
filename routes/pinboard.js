let express = require('express');
let Pinboard = require('node-pinboard');

const api_token = 'skinna123:15C82105FA77E7F20883';

let pinboard = new Pinboard(api_token);
let router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a pinboard resource');
});

router.get('/all', function(req, res, next) {
  pinboard.all({}, function (err, response) {
    res.send(response);
  });
});

module.exports = router;
