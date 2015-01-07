var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Savory' });
});

router.get('/get-involved', function(req, res) {
  res.render('get-involved/index', { title: 'Express' });
});

module.exports = router;
