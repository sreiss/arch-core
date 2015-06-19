/**
 * Event service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');
var q = require('q');
var path = require('path');
var fs = require('fs');

var mediasUrl = 'uploads/medias/';
var mediasPath = path.join(__dirname, '..', '..', '..', 'uploads', 'medias');
try
{
    fs.mkdirSync(mediasPath);
    console.log('Medias directory created.');
}
catch(err)
{
    console.log('Medias directory already created.');
}

module.exports = function(Media, galleryService)
{
    return {
        save: function(rawMedia)
        {
            var deferred = q.defer();

            var fileName = moment().format('YYYYMMDDHHmmss') + '-' + rawMedia.files.file.name + path.extname(rawMedia.files.file.name);
            var filePath = path.join(mediasPath, fileName);

            fs.readFile(rawMedia.files.file.path, function(err, data)
            {
                if (err)
                {
                    deferred.reject(err);
                }
                else
                {
                    fs.writeFile(filePath, data, function (err)
                    {
                        if (err)
                        {
                            deferred.reject(err);
                        }
                        else
                        {
                            try
                            {
                                galleryService.getGalleryByName(rawMedia.body.nameG)
                                .then(function(gallery)
                                {
                                    if(gallery)
                                    {
                                        return gallery;
                                    }
                                    else
                                    {
                                        return galleryService.saveGallery({name: rawMedia.body.nameG});
                                    }
                                })
                                .then(function(gallery)
                                {
                                    var media = new Media({
                                        name: rawMedia.files.file.name,
                                        description: rawMedia.body.description,
                                        url: mediasUrl + fileName,
                                        gallery: gallery._id
                                    });
                                    media.save(function (err, savedMedia)
                                    {
                                        if (err)
                                        {
                                            fs.unlinkSync(filePath);
                                            deferred.reject(err);
                                        }
                                        else
                                        {
                                            deferred.resolve(savedMedia);
                                        }
                                    });
                                })

                            }
                            catch(err)
                            {
                                fs.unlinkSync(filePath);
                                deferred.reject(err);
                            }
                        }
                    });
                }
            });

            return deferred.promise;
        },

        /** Get all medias's information. */
        getMedias: function()
        {
            var deferred = q.defer();

            Media.find().exec(function (err, medias)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!medias)
                {
                    deferred.reject(new Error('No medias found.'));
                }
                else
                {
                    deferred.resolve(medias);
                }
            });

            return deferred.promise;
        },

        /** Delete existing media. */
        deleteMedia: function(mediaId)
        {
            var deferred = q.defer();

            Media.findOneAndRemove({_id: mediaId}, function(err, result)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!result)
                {
                    deferred.reject(new Error('No media matching [MEDIA_ID] : ' + mediaId + "."));
                }
                else
                {
                    deferred.resolve(result);
                }
            });

            return deferred.promise;
        },

        /** Get gallery's information by name. */
        getMediaByGallery: function(galleryId)
        {
            var deferred = q.defer();

            Media.find({gallery: galleryId}).populate('gallery').exec(function (err, media)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!media)
                {
                    deferred.reject(new Error('No media matching [GALLERY_ID] : ' + galleryId + "."));
                }
                else
                {
                    deferred.resolve(media);
                }
            });

            return deferred.promise;
        }
    }
};