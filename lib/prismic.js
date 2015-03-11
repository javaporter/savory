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

exports.careers = function(api, ref) {
  var deferred = Q.defer();
  api.forms('everything')
    .query(Prismic.Predicates.at('document.type', 'careers'))
    .orderings('[my.careers.title]')
    .ref(ref || api.master()).submit(function(err, res) {
      if (err)
        return deferred.reject(new Error(err));
      deferred.resolve(res.results);
    });
  return deferred.promise;
}

exports.career = function(api, id, ref) {
  var deferred = Q.defer();
  api.forms('everything')
    .query(Prismic.Predicates.at('document.type', 'careers'))
    .query(Prismic.Predicates.at('document.id', id))
    .ref(ref || api.master()).submit(function(err, res) {
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

exports.hub = function(api, slug, ref) {
  var deferred = Q.defer();
  api.forms('everything')
    .query(Prismic.Predicates.at('document.type', 'hubs'))
    .query(Prismic.Predicates.at('my.hubs.slug', slug))
    .ref(ref || api.master()).submit(function(err, res) {
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

exports.hubs = function(api, ref) {
  var deferred = Q.defer();
  api.forms('everything')
    .query(Prismic.Predicates.at('document.type', 'hubs'))
    .ref(ref || api.master()).submit(function(err, res) {
      if (err)
        return deferred.reject(new Error(err));
      deferred.resolve(res.results);
    });
  return deferred.promise;
}

exports.platformClasses = function(api, ref) {
  var deferred = Q.defer();
  api.forms('everything')
    .query(Prismic.Predicates.at('document.type', 'platformClasses'))
    .orderings('[my.platformClasses.name]')
    .ref(ref || api.master()).submit(function(err, res) {
      if (err)
        return deferred.reject(new Error(err));
      deferred.resolve(res.results);
    });
  return deferred.promise;
}

exports.homepageNews = function(api, ref) {
  var deferred = Q.defer();
  api.forms('everything').pageSize(6)
    .query(Prismic.Predicates.at('document.type', 'news'))
    .query(Prismic.Predicates.at('my.news.category', 'Yes'))
    .orderings('[mynews.date]')
    .ref(ref || api.master()).submit(function(err, res) {
      if (err)
        return deferred.reject(new Error(err));
      deferred.resolve(res.results);
    });
  return deferred.promise;
}

exports.news = function(api, ref, page) {
  var page = page || '1',
      deferred = Q.defer();

  api.forms('everything').pageSize(2).page(page)
    .query(Prismic.Predicates.at('document.type', 'news'))
    .orderings('[mynews.date]')
    .ref(ref || api.master()).submit(function(err, res) {
      if (err)
        return deferred.reject(new Error(err));
      deferred.resolve(res);
    });
  return deferred.promise;
}

exports.newsArticle = function(api, slug, ref) {
  var deferred = Q.defer();
  api.forms('everything').pageSize(1)
    .query(Prismic.Predicates.at('document.type', 'news'))
    .query(Prismic.Predicates.at('my.news.slug', slug))
    .ref(ref || api.master()).submit(function(err, res) {
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
