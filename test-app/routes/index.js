var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test tool3' });
});
router.post('/', function(req, res, next) {
  	res.render('index', { title: 'Поймал POST запрос' });
});
module.exports = router;
