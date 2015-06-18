/**
 * Gallery routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(galleryController, galleryRouter)
{
    galleryRouter.route('/')
        .post(galleryController.saveGallery);

    galleryRouter.route('/:galleryid')
        .delete(galleryController.deleteGallery)
        .get(galleryController.getGallery);
};
