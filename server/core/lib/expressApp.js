var express = require('express'),
    logger = require('morgan'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http');

exports.name = 'arch-http';

exports.attach = function(opts)
{
    var app = this;
    var expressApp = app.arch.expressApp = express();
    var config = app.arch.config;

    expressApp.set('views', path.join(__dirname, '..', 'views'));
    expressApp.set('view engine', 'jade');

    expressApp.use(logger('dev'));
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: false}));
    expressApp.use(cookieParser());
    //expressApp.use(express.static(path.join(__dirname, '..', 'public')));
    expressApp.use('/', express.static(path.join(__dirname, '..', '..', 'public')));

    expressApp.options('*', function(req, res)
    {
        var headers = {};

        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, DELETE";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400';
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";

        res.writeHead(200, headers);
        res.end();
    });

    // Allow Cross Origin
    var allowedOrigins = config.get('http:allowedOrigins');
    expressApp.use(function(req, res, next) {
        var origin = req.headers.origin;

        if (allowedOrigins.indexOf(origin) > -1) {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
        }

        return next();
    });
};

exports.init = function (done)
{
    return done();
};
