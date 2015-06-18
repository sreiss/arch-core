/**
 * Gallery service.
 *
 * @module arch/gallerys
 * @copyright ArchTailors 2015
 */

var q = require('q');

module.exports = function(Gallery)
{
    return {
        /** Save gallery. */
        saveGallery: function(galleryData)
        {
            var deferred = q.defer();

            var gallery = new Gallery();

            gallery.name = galleryData.name;

            gallery.save(function (err) {
                if (err)
                {
                    deferred.reject(err.message);
                }
                else
                {
                    deferred.resolve(gallery);
                }
            })

            return deferred.promise;
        },
        
        /** Delete existing gallery. */
        deleteGallery: function(galleryId)
        {
            var deferred = q.defer();

            Gallery.findOneAndRemove({_id: galleryId}, function(err, result)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!result)
                {
                    deferred.reject(new Error('No gallery matching [GALLERY_ID] : ' + galleryId + "."));
                }
                else
                {
                    deferred.resolve(result);
                }
            });

            return deferred.promise;
        },

        /** Get gallery's information by galleryId. */
        getGallery: function(galleryId)
        {
            var deferred = q.defer();

            Gallery.findOne({_id: galleryId}).exec(function (err, gallery)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!gallery)
                {
                    deferred.reject(new Error('No gallery matching [GALLERY_ID] : ' + galleryId + "."));
                }
                else
                {
                    deferred.resolve(gallery);
                }
            });

            return deferred.promise;
        }
    };
};