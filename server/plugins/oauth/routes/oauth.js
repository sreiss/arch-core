/**
 * OAuth routes.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(oauthController, oauthRouter, oauthMiddleware) {
    oauthRouter.route('/user')
        .all(oauthMiddleware.checkUser)
        .post(oauthController.saveUser)
        .put(oauthController.saveUser);

    oauthRouter.route('/users/:signuptype')
        .get(oauthController.getUsersBySignuptype)

    oauthRouter.route('/user/:username/:password')
        .get(oauthController.getUser);

    oauthRouter.route('/client')
        .post(oauthMiddleware.checkClient)
        .post(oauthController.saveClient);

    oauthRouter.route('/client/:clientId')
        .get(oauthMiddleware.checkClientCredentials)
        .get(schoauthController.getClient);
}