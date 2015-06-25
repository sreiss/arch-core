/**
 * Event routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var multiparty = require('connect-multiparty')();

module.exports = function(mediaController, mediaRouter, authMiddleware)
{
    mediaRouter.route('/')
        .get(mediaController.getMedias)
        //.post(authMiddleware.authenticate)
        .post(multiparty, mediaController.save);

    mediaRouter.route('/:mediaid')
        //.delete(authMiddleware.authenticate)
        .delete(mediaController.deleteMedia);

    mediaRouter.route('/gallery/:galleryid')
        .get(mediaController.getMediaByGallery);
};