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

    if(clientSecret === null)
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
        OAuthClientsModel.findOne({clientId: clientId}).exec(function (err, client)
        {
            if(err)
            {
                callback(true, false)
            }
            else if(client == null)
            {
                callback(false, false)
            }
            else
            {
                callback(false, true);
            }
        });
    }
    else if(grantType === 'refresh_token')
    {
        OAuthRefreshTokensModel.findOne({clientId: clientId}).exec(function (err, refreshToken)
        {
            if(err)
            {
                //deferred.reject('err');
                callback(true, false)
            }
            else if (refreshToken == null)
            {
                callback(false, false)
            }
            else
            {
                callback(false, true);
            }
        });
    }
    else
    {
        callback(false, false);
    }
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

    OAuthUsersModel.findOne({username: username, password: password}, function(err, user)
    {
        if(err)
        {
            return callback(err);
        }
        else if(user)
        {
            callback(null, user._id);
        }
        else
        {
            callback(null, null);
        }
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