// Add body_class locals based on the path
exports.body_class = function(req, res, next) {
  var r = /^\/([^\/]+)/;
  var match = req.path.match(r);
  res.locals.body_class = match ? match[1] : 'index';
  next();
};
