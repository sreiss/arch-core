/**
 * discovery service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');

module.exports = function(Discovery, qService)
{
    return {
        /** Save discovery. */
        saveDiscovery: function(discoveryData)
        {
            var deferred = qService.defer();
            var discovery = new Discovery();

            // Assign data.
            discovery.dtstart = discoveryData.dtstart;
            discovery.dtend = discoveryData.dtend;
            discovery.summary = discoveryData.summary;
            discovery.location = discoveryData.location;
            discovery.description = discoveryData.description;
            discovery.transp = discoveryData.transp;
            discovery.sequence = discoveryData.sequence;
            discovery.category = discoveryData.category;
            discovery.participants = [];
            discovery.course = discoveryData.course;

            for(var i=0; i<discoveryData.participants.length; i++)
            {
                var guest = {
                    guest : discoveryData.participants[i].guest,
                    status : discoveryData.participants[i].status
                };

                discovery.participants.push(guest);
            };

            discovery.save(function(err)
            {
                if(err)
                {
                    deferred.reject(err.message)
                }
                else
                {
                    deferred.resolve(discovery);
                }
            })

            return deferred.promise;
        },

        /** Delete existing discovery. */
        deleteDiscovery: function(discoveryId)
        {
            var deferred = qService.defer();

            Discovery.findOneAndRemove({_id: discoveryId}, function(err, discovery)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!discovery)
                {
                    deferred.reject(new Error('No discovery matching [discovery_ID] : ' + discoveryId + "."));
                }
                else
                {
                    deferred.resolve(discovery);
                }
            });

            return deferred.promise;
        },

        /** Get discovery's informations by discoveryId. */
        getDiscovery: function(discoveryId)
        {
            var deferred = qService.defer();

            Discovery.findOne({_id: discoveryId}).populate('participants.guest course').exec(function (err, discovery)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!discovery)
                {
                    deferred.reject(new Error('No discovery matching [discovery_ID] : ' + discoveryId + "."));
                }
                else
                {
                    deferred.resolve(discovery);
                }
            });

            return deferred.promise;
        },

        /** Get all discoverys' informations. */
        getDiscoveries: function()
        {
            var deferred = qService.defer();

            Discovery.find().populate('participants.guest course').exec(function (err, discoveries)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!discoveries)
                {
                    deferred.reject(new Error('No discoveries found.'));
                }
                else
                {
                    deferred.resolve(discoveries);
                }
            });

            return deferred.promise;
        }
        //,
        //
        //getGuests: function()
        //{
        //
        //},
        //
        //deleteGuest: function()
        //{}
    };
};