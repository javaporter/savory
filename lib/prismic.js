var Prismic = require('prismic.io').Prismic;
var Q = require('q');

exports.api = function() {
  return Q.nfcall(Prismic.Api, 'https://savory.prismic.io/api');
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
