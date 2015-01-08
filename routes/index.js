var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Savory' });
});

router.get('/get-involved', function(req, res) {
  res.render('get-involved/index', { title: 'Express' });
});

router.get('/institute', function(req, res) {
  res.render('institute/index', { title: 'Institute' });
});

router.get('/platform', function(req, res) {
  res.render('platform/index', { title: 'Platform' });
});

router.get('/network', function(req, res) {
  res.render('network/index', { title: 'Network' });
});

module.exports = router;
