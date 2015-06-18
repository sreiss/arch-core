/**
 * Gallery controller.
 *
 * @module arch/gallerys
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var fs = require('fs');
var moment = require('moment');

module.exports = function(galleryService)
{
    return {
        /** Save gallery. */
        saveGallery: function(req, res)
        {
            // Get posted gallery.
            var gallery = req.body;

            // Saving gallery.
            galleryService.saveGallery(gallery).then(function(gallery)
            {
                res.status(200).json({"count": (gallery ? 1 : 0), "data": gallery});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },
        
        /** Delete existing gallery. */
        deleteGallery: function(req, res)
        {
            // Get gallery id.
            var id = req.params.galleryid;

            // Deleting gallery.
            galleryService.deleteGallery(id).then(function(result)
            {
                res.status(200).json({"count": (result ? 1 : 0), "data": result});
            })
                .catch(function(err)
                {
                    res.status(500).json({"error" : new ArchDeleteError(err.message)});
                });
        },

        /** Get gallery's informations. */
        getGallery: function(req, res)
        {
            // Get gallery id.
            var id = req.params.galleryid;

            // Get gallery.
            galleryService.getGallery(id).then(function(gallery)
            {
                res.status(gallery ? 200 : 204).json({"count": 1, "data": gallery});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get gallery's informations. */
        getGalleries: function(req, res)
        {
            // Get all galleries.
            galleryService.getGalleries().then(function(galleries)
            {
                res.status(galleries.length > 0 ? 200 : 204).json({"count": galleries.length, "data": galleries});
            })
                .catch(function(err)
                {
                    res.status(500).json({"error" : new ArchFindError(err.message)});
                });
        },

        /** Get gallery's informations by name. */
        getGalleryByName: function(req, res)
        {
            // Get gallery name.
            var name = req.params.galleryname;

            // Get gallery.
            galleryService.getGalleryByName(name).then(function(gallery)
            {
                res.status(gallery ? 200 : 204).json({"count": 1, "data": gallery});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    }
};
