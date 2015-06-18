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

module.exports = function(Media, Gallery)
{
    return {
        save: function(rawMedia)
        {
            var deferred = q.defer();

            var fileName = moment().format('YYYYMMDDHHmmss') + '-' + rawMedia.body.name + path.extname(rawMedia.files.file.name);
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
                                var newGallery = new Gallery({
                                    name: rawMedia.body.nameG
                                });
                                var media = new Media({
                                    name: rawMedia.body.name,
                                    description: rawMedia.body.description,
                                    url: mediasUrl + fileName,
                                    gallery: newGallery._id
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
        }
    }
};