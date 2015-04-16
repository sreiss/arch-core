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

            event.name = eventData.name;
            event.type = eventData.type;
            event.begin = eventData.begin;
            event.end = eventData.end;
            event.description = eventData.description;
            //event.data_reference = eventData.data_reference;
            event.address_line_1 = eventData.address_line_1;
            event.ville = eventData.ville;
            //event.address_line_2 = eventData.address_line_2;
            //event.address_line_3 = eventData.address_line_3;
            event.country = eventData.country;
            event.zip = eventData.zip;
            event.created = moment().toDate();
            event.guests = [];
            //event.createdBy = eventData.createdBy;
            //event.modified = eventData.modified;
            //event.modifiedBy = eventData.modifiedBy;
            //event.archived = eventData.archived;
            //event.archivedBy = eventData.archivedBy;
            //event.published = eventData.published;

            //console.log(eventData.guests.length);
            for(var i=0; i<eventData.guests.length; i++)
            {
                console.log(eventData.guests[i].evt_guest);
                var guest = {
                    evt_guest : eventData.guests[i].evt_guest
                };
                event.guests.push(guest);
            };
            console.log(event.guests);

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

            Event.findOne({_id: eventId}).populate('guests.evt_guest').exec(function (err, event)
            {
                if(err)
                {
                    deferred.reject(err);
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

            //Event.find().populate('guests.evt_guest').exec(function (err, events)
            Event.find().exec(function (err, events)
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