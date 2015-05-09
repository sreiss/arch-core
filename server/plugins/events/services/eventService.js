/**
 * Event service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');
var q = require('q');

module.exports = function(Event)
{
    return {
        /** Save event. */
        saveEvent: function(eventData)
        {
            var deferred = q.defer();
            var event = new Event();

            //console.log(eventData);
            console.log(event);

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
            event.course = eventData.course;
            event.website = eventData.website;
            event.information = eventData.information;
            event.trainings = [];
            event.creator = eventData.creator;
            event.program = eventData.program;
            event.runs = [];

            for(var i=0; i<eventData.participants.length; i++)
            {
                var guest = {
                    guest : eventData.participants[i].guest,
                    status : eventData.participants[i].status
                };

                event.participants.push(guest);
            };

            for(var j=0; j<eventData.trainings.length; j++)
            {
                var training = {
                    training : eventData.trainings[j].training
                };

                event.trainings.push(training);
            };

            for(var k=0; k<eventData.runs.length; k++)
            {
                var run = {
                    run : eventData.runs[k].run
                };

                event.runs.push(run);
            };

            //console.log(event);

            event.save(function(err)
            {
                if(err)
                {
                    deferred.reject(err.message);
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
            var deferred = q.defer();

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
            var deferred = q.defer();

            Event.findOne({_id: eventId}).populate('category participants.guest trainings.training creator runs.run').exec(function (err, event)
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
            var deferred = q.defer();

            Event.find().populate('category participants.guest trainings.training creator runs.run').exec(function (err, events)
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
    };
};