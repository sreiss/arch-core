var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    model = module.exports
    q = require('q');

// OAuth Server Schema - Access Token Schema.
var OAuthAccessTokensSchema = new Schema(
{
    accessToken: { type: String },
    clientId: { type: String },
    userId: { type: String },
    expires: { type: Date }
});

// OAuth Server Schema - Refresh Token Schema.
var OAuthRefreshTokensSchema = new Schema(
{
    refreshToken: { type: String },
    clientId: { type: String },
    userId: { type: String },
    expires: { type: Date }
});

// OAuth Server Schema - Clients Schema.
var OAuthClientsSchema = new Schema(
{
    clientId: { type: String },
    clientSecret: { type: String },
    redirectUri: { type: String }
});

// OAuth Server Schema - Users Schema.
var OAuthUsersSchema = new Schema(
{
    username: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, default: '' }
});

// OAuth Server Models.
mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
mongoose.model('OAuthClients', OAuthClientsSchema);
mongoose.model('OAuthUsers', OAuthUsersSchema);

var OAuthAccessTokensModel = mongoose.model('OAuthAccessTokens'),
    OAuthRefreshTokensModel = mongoose.model('OAuthRefreshTokens'),
    OAuthClientsModel = mongoose.model('OAuthClients'),
    OAuthUsersModel = mongoose.model('OAuthUsers');

// OAuth Server Callback - getAccessToken.
model.getAccessToken = function (bearerToken, callback)
{
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

    OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
};

// OAuth Server Callbacks - getClient.
model.getClient = function (clientId, clientSecret, callback)
{
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');

    if (clientSecret === null)
    {
        return OAuthClientsModel.findOne({ clientId: clientId }, callback);
    }

    OAuthClientsModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
};

// OAuth Server Callbacks - grantTypeAllowed.
model.grantTypeAllowed = function (clientId, grantType, callback)
{
    console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');

    if(grantType === 'password')
    {
        var deferred = q.defer();

        OAuthClientsModel.findOne({clientId: clientId}).exec(function (err, client)
        {
            if (err)
            {
                //deferred.reject('err');
                callback(true, false)
            }

            if (client == null)
            {
                //deferred.reject('no client');
                callback(false, false)
            }

            callback(false, true);
        });

        return deferred.promise;
    }

    if(grantType === 'refresh_token')
    {
        var deferred = q.defer();

         OAuthRefreshTokensModel.findOne({clientId: clientId}).exec(function (err, refreshToken)
        {
            if (err)
            {
                //deferred.reject('err');
                callback(true, false)
            }

            if (refreshToken == null)
            {
                //deferred.reject('no client');
                callback(false, false)
            }

            callback(false, true);
        });

        return deferred.promise;
    }

    callback(false, false);
};

// OAuth Server Callbacks - saveAccessToken.
model.saveAccessToken = function (token, clientId, expires, userId, callback)
{
    console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

    var accessToken = new OAuthAccessTokensModel(
    {
        accessToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    accessToken.save(callback);
};

// OAuth Server Callbacks - getUser.
model.getUser = function (username, password, callback)
{
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');

    OAuthUsersModel.findOne({ username: username, password: password }, function(err, user)
    {
        if(err)
        {
            return callback(err);
        }

        callback(null, user._id);
    });
};

// OAuth Server Callbacks - saveRefreshToken.
model.saveRefreshToken = function (token, clientId, expires, userId, callback)
{
    console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId +', userId: ' + userId + ', expires: ' + expires + ')');

    var refreshToken = new OAuthRefreshTokensModel(
    {
        refreshToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    refreshToken.save(callback);
};

// OAuth Server Callbacks - getRefreshToken.
model.getRefreshToken = function (refreshToken, callback)
{
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

    OAuthRefreshTokensModel.findOne({ refreshToken: refreshToken }, callback);
};

// OAuth Server Tests.
var oauthClient = new OAuthClientsModel(
{
    clientId: "clientId123456789",
    clientSecret: "clientSecret123456789",
    redirectUri: "http://www.google.fr"
});

oauthClient.save(function(err)
{
    console.log('oauthclient saved');
});

var oauthUser = new OAuthUsersModel({
    username: "username123",
    password: "password123",
    firstname: "firstname123",
    lastname: "lastname123",
    email: "email123"
});

oauthUser.save(function(err)
{
    console.log('oauthUser saved');
});