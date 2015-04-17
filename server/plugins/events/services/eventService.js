/**
 * Event service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');

module.exports = function(Event, qService)
{
    return {
        /** Save event. */
        saveEvent: function(eventData)
        {
            var deferred = qService.defer();
            var event = new Event();
            //console.log(eventData);
            // Assign data.

            event.dtstart = eventData.dtstart;
            event.dtend = eventData.dtend;
            event.summary = eventData.summary;
            event.location = eventData.location;
            event.description = eventData.description;
            event.transp = eventData.transp;
            event.sequence = eventData.sequence;
            event.category = eventData.category;
            event.participants = [];

            //console.log(eventData.guests.length);
            for(var i=0; i<eventData.participants.length; i++)
            {
                var guest = {
                    guest : eventData.participants[i].guest,
                    status : eventData.participants[i].status
                };

                event.participants.push(guest);
            };

            event.save(function(err)
            {
                if(err)
                {
                    deferred.reject(err.message)
                }
                else
                {
                    deferred.resolve(event);
                }
            })

            return deferred.promise;
        },

        /** Delete existing event. */
        deleteEvent: function(eventId)
        {
            var deferred = qService.defer();

            Event.findOneAndRemove({_id: eventId}, function(err, event)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!event)
                {
                    deferred.reject(new Error('No event matching [EVENT_ID] : ' + eventId + "."));
                }
                else
                {
                    deferred.resolve(event);
                }
            });

            return deferred.promise;
        },

        /** Get event's informations by eventId. */
        getEvent: function(eventId)
        {
            var deferred = qService.defer();

            Event.findOne({_id: eventId}).populate('participants.guest').exec(function (err, event)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!event)
                {
                    deferred.reject(new Error('No event matching [EVENT_ID] : ' + eventId + "."));
                }
                else
                {
                    deferred.resolve(event);
                }
            });

            return deferred.promise;
        },

        /** Get all events' informations. */
        getEvents: function()
        {
            var deferred = qService.defer();

            Event.find().populate('participants.guest').exec(function (err, events)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!events)
                {
                    deferred.reject(new Error('No events found.'));
                }
                else
                {
                    deferred.resolve(events);
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