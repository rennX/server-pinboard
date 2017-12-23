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
  let options = {};
  if (req.query) {
    options = {...req.query};
  }

  pinboard[method](options, function (err, pinboardResponse) {
    if (err) res.send(err);
    res.status(200).json(pinboardResponse);
  });
};

// router.get('/', function(req, res) {
//   res.send('respond with a pinboard resource');
// });

router.get('/update', function (req, res) {
  _handleGet(req, res, 'update');
});

router.post('/add', function (req, res) {
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
router.delete('/delete', function (req, res) {
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

router.get('/get', function(req, res) {
  // options: url, tags, dt (datetime), meta (yes/no)
  _handleGet(req, res, 'get');
});

router.get('/dates', function(req, res) {
  _handleGet(req, res, 'dates');
});

router.get('/recent', function(req, res) {
  _handleGet(req, res, 'recent');
});

router.get('/all', function(req, res) {
  _handleGet(req, res, 'all');
});

router.get('/suggest', function(req, res) {
  _handleGet(req, res, 'suggest');
});

router.get('/tags', function(req, res) {
  _handleGet(req, res, 'getTags');
});

router.delete('/tags', function (req, res) {
  _logRequestData(req);
  let options = {};
  if (req.body) {
    options = {...req.body};
  }

  pinboard.delTag(options, function (err, pinboardResponse) {
    if (err){
      res.send(err);
    } else if (pinboardResponse['result_code'] !== 'done' && pinboardResponse['result'] !== 'done') {
      res.status(400).json(pinboardResponse);
    } else {
      res.status(200).json(pinboardResponse);
    }
  });
});

router.put('/tags', function (req, res) {
  _logRequestData(req);
  let options = {};
  if (req.body) {
    options = {...req.body};
  }

  pinboard.renameTag(options, function (err, pinboardResponse) {
    if (err){
      res.send(err);
    } else if (pinboardResponse['result_code'] !== 'done' && pinboardResponse['result'] !== 'done') {
      res.status(400).json(pinboardResponse);
    } else {
      res.status(200).json(pinboardResponse);
    }
  });
});

// TODO userSecret method
// TODO api_token method
// TODO listNotes method
// TODO getNote method

module.exports = router;
