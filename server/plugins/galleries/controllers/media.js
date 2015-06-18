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

module.exports = function(mediaService, galleryService)
{
    return {
        save: function(req, res, next)
        {
            galleryService.getGalleryByName(req.body.nameG)
            .then(function(gallery){
                if(gallery)
                {
                    mediaService.save({
                        files: req.files,
                        body: req.body,
                        gallery: gallery._id
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
                }
                else
                {
                    galleryService.saveGallery({
                        name: req.body.nameG
                    })
                    .then(function (newGallery) {
                        mediaService.save({
                            files: req.files,
                            body: req.body,
                            gallery: newGallery._id
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
                    })
                }
            })

        }
    };

};
