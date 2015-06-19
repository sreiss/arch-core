/**
 * Event routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var multiparty = require('connect-multiparty')();

module.exports = function(mediaController, mediaRouter) {

    mediaRouter.route('/')
        .get(mediaController.getMedias)
        .post(multiparty, mediaController.save);

    mediaRouter.route('/:mediaid')
        .delete(mediaController.deleteMedia);

    mediaRouter.route('/gallery/:galleryid')
        .get(mediaController.getMediaByGallery);
};