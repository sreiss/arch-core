/**
 * OAuth routes.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(oauthController, oauthRouter) {
    oauthRouter.route('/user')
        .post(oauthController.saveUser);

    oauthRouter.route('/user/:accessToken/:clientId')
        .get(oauthController.getUser);

    oauthRouter.route('/client')
        .post(oauthController.saveClient);

    oauthRouter.route('/client/:clientId/:clientSecret')
        .get(oauthController.getClient);
}