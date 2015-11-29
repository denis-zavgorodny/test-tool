var express = require('express');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var hash = req.session.user.login + 'salt';
	hash = crypto.createHash('md5').update(hash).digest("hex");
	res.render('index', { 
		title: 'Login: ' + req.session.user.login,
		formuid: hash
	});
});
router.post('/', function(req, res, next) {
  	res.render('index', { title: 'Поймал POST запрос' });
});
module.exports = router;
