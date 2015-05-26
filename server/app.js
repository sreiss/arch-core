var broadway = require('broadway'),
    app = new broadway.App(),
    path = require('path'),
    arch = require(path.join(__dirname, 'core', 'arch'));
    
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


app.use(allowCrossDomain);
app.use(arch);

app.init(function (err)
{
    if (err)
    {
        throw err;
    }
});
