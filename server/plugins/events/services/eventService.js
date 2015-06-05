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
        /** Save (create & update) event. */
        saveEvent: function(eventData)
        {
            var deferred = q.defer();

            var event = new Event();

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
            event.kidoikoiaki = eventData.kidoikoiaki;

            for (var i = 0; i < eventData.participants.length; i++) {
                var guest = {
                    guest: eventData.participants[i].guest,
                    status: eventData.participants[i].status
                };

                event.participants.push(guest);
            }
            ;

            for (var j = 0; j < eventData.trainings.length; j++) {
                var training = {
                    training: eventData.trainings[j].training
                };

                event.trainings.push(training);
            }
            ;

            for (var k = 0; k < eventData.runs.length; k++) {
                var run = {
                    run: eventData.runs[k].run
                };

                event.runs.push(run);
            }
            ;

            event.save(function (err) {
                if (err)
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

        /** Updating an existing event. */
        updateEvent: function(eventData)
        {
            var deferred = q.defer();

            var participants = [];
            var trainings = [];
            var runs = [];

            for(var i=0; i<eventData.participants.length; i++)
            {
                var guest = {
                    guest : eventData.participants[i].guest,
                    status : eventData.participants[i].status
                };

                participants.push(guest);
            };

            for(var j=0; j<eventData.trainings.length; j++)
            {
                var training = {
                    training : eventData.trainings[j].training
                };

                trainings.push(training);
            };

            for(var k=0; k<eventData.runs.length; k++)
            {
                var run = {
                    run : eventData.runs[k].run
                };

                runs.push(run);
            };

            Event.update({_id:eventData._id},
                {
                    dtstart: eventData.dtstart,
                    dtend: eventData.dtend,
                    summary: eventData.summary,
                    location: eventData.location,
                    description: eventData.description,
                    transp: eventData.transp,
                    sequence: eventData.sequence,
                    category: eventData.category,
                    participants: participants,
                    course: eventData.course,
                    website: eventData.website,
                    information: eventData.information,
                    trainings: trainings,
                    creator: eventData.creator,
                    program: eventData.program,
                    runs: runs,
                    kidoikoiaki: eventData.kidoikoiaki
                },
                function(err, nbr, event)
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

        /** Update guest's information */
        updateGuest: function(eventData)
        {
            var deferred = q.defer();

            Event.findOne({_id: eventData._id}, 'participants', function(err, event)
            {
                var participants = event.participants;

                if(participants.length==0)
                {
                    var guest = {
                    guest: eventData.participants.guest,
                    status: eventData.participants.status
                    };
                    participants.push(guest);
                }
                else
                {
                    for (var i =0; i < participants.length; i++)
                    {
                        console.log(participants[i]);

                        if(participants[i].guest==eventData.participants.guest)
                        {
                            participants[i].status = eventData.participants.status;
                            break;
                        }
                        else
                        {
                            var guest = {
                                guest: eventData.participants.guest,
                                status: eventData.participants.status
                            };
                            participants.push(guest);
                            break;
                        }
                    }
                }

                Event.update({_id: eventData._id},
                    {
                        $set: {participants: participants}
                    },
                    function (err, nbr, event) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(event);
                        }
                    });
            });

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

            Event.findOne({_id: eventId}).populate('trainings.training runs.run').exec(function (err, event)
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

        /** Get event's informations by date. */
        getEventsByDate: function(date)
        {
            var deferred = q.defer();

            Event.findOne({dtstart: date}).populate('trainings.training runs.run').exec(function (err, event)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!event)
                {
                    deferred.reject(new Error('No date matching [DTSTART] : ' + date + "."));
                }
                else
                {
                    deferred.resolve(event);
                }
            });

            return deferred.promise;
        },

        /** Get event's informations by type. */
        getEventsByCategory: function(category)
        {
            var deferred = q.defer();

            Event.findOne({category: category}).populate('trainings.training runs.run').exec(function (err, event)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!event)
                {
                    deferred.reject(new Error('No category matching [CATEGORY] : ' + category + "."));
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

            Event.find().populate('trainings.training runs.run').exec(function (err, events)
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