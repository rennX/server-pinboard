let express = require('express');
let Pinboard = require('node-pinboard');

let router = express.Router();

const api_token = 'skinna123:15C82105FA77E7F20883';
let pinboard = new Pinboard(api_token);

const _logRequestData = function (req) {
  console.log('======================================================');
  console.log(new Date());
  console.log('------------------------------------------------------');
  console.log('body:', req.body);
  console.log('params:', req.params);
  console.log('query:', req.query);
};

const _handleGet = function (req, res, method) {
  _logRequestData(req);
  console.log('boogie down');
  // options: tags
  let options = {};
  if (req.query) {
    options = {...req.query};
  }

  pinboard[method](options, function (err, pinboardResponse) {
    if (err) res.send(err);
    res.status(200).json(pinboardResponse);
  });
};

// router.get('/', function(req, res, next) {
//   res.send('respond with a pinboard resource');
// });

router.get('/update', function (req, res, next) {
  // _logRequestData(req);
  // pinboard.update({}, function (err, pinboardResponse) {
  //   if (err) res.send(err);
  //   res.status(200).json(pinboardResponse);
  // });
  _handleGet(req, res, 'update');
});

router.post('/add', function (req, res, next) {
  _logRequestData(req);
  // options: url (req), description (title)(req), extended, tags, dt (datetime), replace (yes/no), shared (yes/no), toread (yes/no)
  let options = {};
  if (req.body) {
    options = {...req.body};
  }

  pinboard.add(options, function (err, pinboardResponse) {
    if (err){
      res.send(err);
    } else if (pinboardResponse['result_code'] !== 'done') {
      res.status(400).json(pinboardResponse);
    } else {
      res.status(200).json(pinboardResponse);
    }
  });

});

// TODO try to get this working???
router.delete('/delete', function (req, res, next) {
  _logRequestData(req);
  let options = {};
  if (req.body) {
    options = {...req.body};
  }
  console.log('options:', options);
  pinboard.delete(options, function (err, pinboardResponse) {
    if (err){
      res.send(err);
    } else if (pinboardResponse['result_code'] !== 'done') {
      res.status(400).json(pinboardResponse);
    } else {
      res.status(200).json(pinboardResponse);
    }
  });
});

router.get('/get', function(req, res, next) {
  _logRequestData(req);
  // options: url, tags, dt (datetime), meta (yes/no)
  let options = {};
  if (req.query) {
    options = {...req.query};
  }

  pinboard.get(options, function (err, pinboardResponse) {
    if (err) res.send(err);
    res.status(200).json(pinboardResponse);
  });
});

router.get('/dates', function(req, res, next) {
  _logRequestData(req);
  pinboard.dates({}, function (err, pinboardResponse) {
    if (err) res.send(err);
    res.status(200).json(pinboardResponse);
  });
});

router.get('/recent', function(req, res, next) {
  _handleGet(req, res, 'recent');
});

router.get('/all', function(req, res, next) {
  _logRequestData(req);
  let options = {};

  // var start = new Date();
  // var end = new Date();
  // start.setDate(start.getDate() - 365);
  // var options = {
  //   tag: 'react',
  //   fromdt: start,
  //   todt: end
  // };
  // console.log(JSON.stringify(options, null, 4));

  pinboard.all(options, function (err, pinboardResponse) {
    if (err) res.send(err);
    res.status(200).json(pinboardResponse);
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
