var express = require('express');
var router = express.Router();
var prismic = require('../lib/prismic');
var _ = require('lodash');
var url = require('url');
var qs = require('querystring');

function notFound(res) {
  return function(err) {
    res.status(404).send('Page not found');
  }
}

function paginate(req, results, page) {
  var query = _.clone(req.query),
      page = parseInt(page),
      path = req.path,
      next,
      prev;

  if (results.next_page) {
    query.page = page + 1;
    next = path+'?'+qs.stringify(query);
  }
  if (results.prev_page) {
    query.page = page - 1;
    prev = path+'?'+qs.stringify(query);
  }
  return {
    next: next,
    prev: prev
  };
}

router.get('/', function(req, res) {
  var context = {
    title: 'Savory'
  }

  prismic.api()
    .then(function(api) {
      context.api = api;
      return prismic.homepageNews(context.api);
    })
    .then(function(news) {
      context.news = news;
      res.render('index', context);
      return prismic.hubs(context.api);
    })
    .catch(function(err) {
      res.send(err, 500);
    });
});

router.get('/newsroom', function(req, res) {
  var context = {
    title: 'Savory'
  };

  prismic.api()
    .then(function(api) {
      context.api = api;
      return prismic.homepageNews(context.api);
    })
    .then(function(news) {
      context.news = news;
      res.render('newsroom/index', context);
      return prismic.hubs(context.api);
    })
    .catch(function(err) {
      res.send(err, 500);
    });
});


router.get('/institute/jobs/:id', function(req, res) {
  prismic.api()
    .then(function(api) {
      return prismic.career(api, req.params.id);
    })
    .then(function(career) {
      res.render('institute/careers-template', {
        title: career.getStructuredText('careers.title').asText(),
        career: career,
      });
    })
    .catch(function(err) {
      res.send('error', 500);
    })
});

router.get('/institute', function(req, res) {
  prismic.api()
    .then(function(api) {
      return prismic.careers(api);
    })
    .then(function(careers) {
      res.render('institute/index', {careers: careers});
    });
});

router.get('/institute', function(req, res) {
  res.render('institute/index', { title: 'Institute' });
});

router.get('/ie', function(req, res) {
  res.render('ie', { title: 'IE' });
});

router.get('/artisans-of-the-grasslands', function(req, res) {
  res.render('artisans-of-the-grasslands', { title: 'Artisans of the Grasslands' });
});

router.get('/soilforclimate', function(req, res) {
  res.render('soilforclimate', { title: 'Soil for Climate Change' });
});

router.get('/artisans-of-the-grasslands/speakers', function(req, res) {
  res.render('artisans-of-the-grasslands/speakers', { title: 'Artisans of the Grasslands Speakers' });
});

router.get('/artisans-of-the-grasslands/menu', function(req, res) {
  res.render('artisans-of-the-grasslands/menu', { title: 'Artisans of the Grasslands Menu' });
});

router.get('/artisans-of-the-grasslands/farm-tour', function(req, res) {
  res.render('artisans-of-the-grasslands/farm-tour', { title: 'Artisans of the Grasslands Farm Tour' });
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
    }, notFound(res));
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

router.get('/network/hub-application-thanks', function(req, res) {
  res.render('network/hub-application-thanks', { title: 'Network' });
});

router.get('/styles', function(req, res) {
  res.render('styles/index', { title: 'Styles' });
});

router.get('/get-involved', function(req, res) {
  res.render('get-involved/index', { title: 'Get Involved' });
});

router.get('/news', function(req, res) {
  var context = {},
      page = req.query.page || '1';
  prismic.api()
    .then(function(api) {
      return prismic.news(api, null, page);
    })
    .then(function(news) {
      context.news = news;
      context.page = page;
      _.assign(context, paginate(req, news, page));
      res.render('news/index', context);
    });
});

// News article
router.get('/news/:slug', function(req, res) {
  prismic.api()
    .then(function(api) {
      return prismic.newsArticle(api, req.params.slug);
    })
    .then(function(article) {
      res.render('news/article', {article: article});
    }, notFound(res));
});

// Hub index
router.get('/network/hub/example', function(req, res) {
  res.render('network/hub-example', { title: 'Hub' });
});

// Get hub by slug
router.get('/network/hub/:slug', function(req, res) {
  prismic.api()
    .then(function(api) {
      return prismic.hub(api, req.params.slug);
    })
    .then(function(hub) {
      res.render('network/hub', {
        title: 'Hub',
        hub: hub,
      });
    },notFound(res));
});



// Redirects
router.get('/courses', function(req, res) {
  res.redirect(301, '/platform/#courses-services');
});

module.exports = router;


