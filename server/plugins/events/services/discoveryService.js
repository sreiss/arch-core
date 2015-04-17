/**
 * discovery service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');

module.exports = function(discovery, qService)
{
    return {
        /** Save discovery. */
        saveDiscovery: function(discoveryData)
        {
            var deferred = qService.defer();
            var discovery = new discovery();
            //console.log(discoveryData);
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

            //console.log(discoveryData.guests.length);
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

            discovery.findOneAndRemove({_id: discoveryId}, function(err, discovery)
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

            discovery.findOne({_id: discoveryId}).populate('participants.guest course').exec(function (err, discovery)
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

            discovery.find().populate('participants.guest course').exec(function (err, discoverys)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!discoverys)
                {
                    deferred.reject(new Error('No discoveries found.'));
                }
                else
                {
                    deferred.resolve(discoverys);
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