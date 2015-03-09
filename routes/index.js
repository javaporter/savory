var express = require('express');
var router = express.Router();
var prismic = require('../lib/prismic');

function notFound(res) {
  return function(err) {
    res.status(404).send('Page not found');
  }
}

// Render the hubs array to geoJSON
function hubsGeoJSON(hubs) {
  var out = [];
  hubs.forEach(function(hub) {
    var point = hub.getGeoPoint('hubs.coordinates');
    if (point) {
      out.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [point.longitude, point.latitude]
        },
        properties: {
          title: hub.getText('hubs.hub')
        }
      });
    }
  });
  return JSON.stringify(out);
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
      return prismic.hubs(context.api);
    })
    .then(function(hubs) {
      context.hubs_geojson = hubsGeoJSON(hubs);
      res.render('index', context);
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

module.exports = router;
