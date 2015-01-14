var cache = require('./api_cache');
var Prismic = require('prismic.io').Prismic;
var Q = require('q');

exports.api = function() {
  var deferred = Q.defer();
  var callback = function(err, api) {
    if (err) return deferred.reject(new Error(err));
    deferred.resolve(api);
  };
  Prismic.Api('https://savory.prismic.io/api', callback, undefined, undefined, cache, 10);
  return deferred.promise;
}

exports.homepageNews = function(api) {
  var deferred = Q.defer();
  api.forms('everything').pageSize(6)
    .query(Prismic.Predicates.at('document.type', 'news'))
    .query(Prismic.Predicates.at('my.news.category', 'Yes'))
    .orderings('[mynews.date]')
    .ref(api.master()).submit(function(err, res) {
      if (err)
        return deferred.reject(new Error(err));
      deferred.resolve(res.results);
    });
  return deferred.promise;
}

exports.newsArticle = function(api, slug) {
  var deferred = Q.defer();
  api.forms('everything').pageSize(1)
    .query(Prismic.Predicates.at('document.type', 'news'))
    .query(Prismic.Predicates.at('my.news.slug', slug))
    .ref(api.master()).submit(function(err, res) {
      if (err)
        return deferred.reject(new Error(err));
      if (res.results_size) {
        deferred.resolve(res.results[0]);
      }
      else {
        deferred.reject(new Error('Slug not found'));
      }
    });
  return deferred.promise;
}
