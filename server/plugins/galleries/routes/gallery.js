/**
 * Gallery routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(galleryController, galleryRouter, authMiddleware)
{
    galleryRouter.route('/')
        .get(galleryController.getGalleries)
        .post(authMiddleware.authenticate)
        .post(galleryController.saveGallery);

    galleryRouter.route('/:galleryid')
        .delete(authMiddleware.authenticate)
        .delete(galleryController.deleteGallery)
        .get(galleryController.getGallery);

    galleryRouter.route('/name/:galleryname')
        .get(galleryController.getGalleryByName);
};
