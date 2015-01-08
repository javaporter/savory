var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var middleware = require('./lib/middleware');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.basedir = path.join(__dirname, 'views');

app.use(middleware.body_class);
app.use('/', routes);
app.use('/users', users);
app.get('/test', function(req, res) {
	res.send({test: 'json'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        var status_code = err.status || 500;
        res.status(status_code);
        res.render('error', {
            message: err.message,
            status_code: status_code,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    var status_code = err.status || 500;
    res.status(status_code);
    res.render('error', {
        message: err.message,
        status_code: status_code,
        error: {}
    });
});


module.exports = app;
