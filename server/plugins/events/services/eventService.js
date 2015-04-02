/**
 * event service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(Event, qService) {
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
            event.data_reference = eventData.data_reference;
            event.address_line_1 = eventData.address_line_1;
            event.address_line_2 = eventData.address_line_2;
            event.address_line_3 = eventData.address_line_3;
            event.country = eventData.country;
            event.zip = eventData.zip;
            event.created = eventData.created;
            //event.createdBy = eventData.createdBy;
            //event.modified = eventData.modified;
            //event.modifiedBy = eventData.modifiedBy;
            //event.archived = eventData.archived;
            //event.archivedBy = eventData.archivedBy;
            //event.published = eventData.published;

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

                if (event == null)
                {
                    deferred.reject(new Error('No event matching [EVENT_ID] : ' + eventId + "."));
                }

                deferred.resolve(event);
            });

            return deferred.promise;
        },

        /** Get event's informations by eventId. */
        getEventById: function(eventId)
        {
            var deferred = qService.defer();

            Event.findOne({_id: eventId}).exec(function (err, event)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (event == null)
                {
                    deferred.reject(new Error('No event matching [EVENT_ID] : ' + eventId + "."));
                }

                deferred.resolve(event);
            });

            return deferred.promise;
        },

        /** Get all events' informations. */
        getEvents: function()
        {
            var deferred = qService.defer();

            Event.find().exec(function (err, events)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (events.length == 0)
                {
                    deferred.reject(new Error('No events found.'));
                }

                deferred.resolve(events);
            });

            return deferred.promise;
        }
    };
};