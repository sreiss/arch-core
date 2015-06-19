/**
 * Media controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var fs = require('fs');
var moment = require('moment');

module.exports = function(mediaService)
{
    return {
        save: function (req, res, next) {

            mediaService.save({
                files: req.files,
                body: req.body
            })
            .then(function (media) {
                res.json({
                    message: 'MEDIA_SAVED',
                    value: media
                });
            })
            .catch(function (err) {
                next(err);
            });
        },

        /** Get media's informations. */
        getMedias: function(req, res)
        {
            // Get all medias.
            mediaService.getMedias().then(function(medias)
            {
                res.status(medias.length > 0 ? 200 : 204).json({"count": medias.length, "data": medias});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Delete existing gallery. */
        deleteMedia: function(req, res)
        {
            // Get gallery id.
            var id = req.params.mediaid;

            // Deleting gallery.
            mediaService.deleteMedia(id).then(function(result)
            {
                res.status(200).json({"count": (result ? 1 : 0), "data": result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        },

        /** Get gallery's informations by name. */
        getMediaByGallery: function(req, res)
        {
            // Get gallery id.
            var gallery = req.params.galleryid;

            // Get media.
            mediaService.getMediaByGallery(gallery).then(function(media)
            {
                res.status(media ? 200 : 204).json({"count": 1, "data": media});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    }

};
