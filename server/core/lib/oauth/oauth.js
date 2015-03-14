var oauthserver = require('oauth2-server');

exports.name = 'arch-oauth';

exports.attach = function(opts)
{
    var app = this.arch.expressApp;

    app.oauth = oauthserver(
    {
        model: require('./oauthModels'),
        grants: ['password', 'refresh_token'],
        debug: true
    });

    app.all('/oauth/oauth/token', app.oauth.grant());

    app.get('/', app.oauth.authorise(), function(req, res)
    {
        res.redirect(req.query.redirect_uri);
    });

    app.use(app.oauth.errorHandler());
};

exports.init = function (done)
{
    return done();
};
