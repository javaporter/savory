var express = require('express');
var router = express.Router();
var prismic = require('../lib/prismic');

router.get('/', function(req, res) {
  prismic.api()
    .then(function(api) {
      return prismic.homepageNews(api);
    })
    .then(function(news) {
      res.render('index', { title: 'Savory', news: news});
    })
});

router.get('/get-involved', function(req, res) {
  res.render('get-involved/index', { title: 'Express' });
});

router.get('/institute', function(req, res) {
  res.render('institute/index', { title: 'Institute' });
});

router.get('/institute/our-team', function(req, res) {
  res.render('institute/our-team', { title: 'Our Team' });
});

router.get('/institute/history', function(req, res) {
  res.render('institute/history', { title: 'History' });
});

router.get('/platform', function(req, res) {
  prismic.api()
    .then(function(api) {
      return prismic.platformClasses(api);
    })
    .then(function(classes) {
      res.render('platform/index', {platform_classes: classes});
    })
    .catch(function(err) {
      res.send('error', 500);
    });
});

router.get('/network', function(req, res) {
  res.render('network/index', { title: 'Network' });
});

router.get('/network', function(req, res) {
  res.render('network/index', { title: 'Network' });
});

router.get('/network/hub-application', function(req, res) {
  res.render('network/hub-application', { title: 'Network' });
});

router.get('/styles', function(req, res) {
  res.render('styles/index', { title: 'Styles' });
});

router.get('/news/:slug', function(req, res) {
  prismic.api()
    .then(function(api) {
      return prismic.newsArticle(api, req.params.slug);
    })
    .then(function(article) {
      res.render('news/article', {article: article});
    })
    .catch(function(err) {
      res.send('not found', 400);
    })
});

router.get('/network/hub', function(req, res) {
  res.render('network/hub', { title: 'Hub' });
});

module.exports = router;
