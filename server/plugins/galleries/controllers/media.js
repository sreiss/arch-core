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
        save: function(req, res, next)
        {
            mediaService.save({
                files: req.files,
                body: req.body
            })
            .then(function(media)
            {
                res.json({
                    message: 'MEDIA_SAVED',
                    value: media
                });
            })
            .catch(function(err)
            {
                next(err);
            });
        }
    };

};
