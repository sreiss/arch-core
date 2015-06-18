/**
 * Event routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var multiparty = require('connect-multiparty')();

module.exports = function(mediaController, mediaRouter) {

    mediaRouter.route('/')
        .post(multiparty, mediaController.save);
};