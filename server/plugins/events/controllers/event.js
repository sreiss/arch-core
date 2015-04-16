/**
 * Event controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var ics = require('ics');
var icalendar = require('icalendar');
var moment = require('moment');

module.exports = function(eventService)
{
    return {
        /** Save event. */
        saveEvent: function(req, res)
        {
            // Get posted event.
            var event = req.body;
            //console.log(event);
            // Saving event.
            eventService.saveEvent(event).then(function(event)
            {
                res.status(200).json({"count": (event ? 1 : 0), "data": event});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Delete existing event. */
        deleteEvent: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

            // Deleting event.
            eventService.deleteEvent(id).then(function(event)
            {
                res.status(200).json({"count": (event ? 1 : 0), "data": event});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        },

        /** Get event's informations. */
        getEvent: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

            // Get event.
            eventService.getEvent(id).then(function(event)
            {
                res.status(event ? 200 : 204).json({"count": 1, "data": event});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        getEvents: function(req, res)
        {
            // Get all events.
            eventService.getEvents().then(function(events)
            {
                res.status(events.length > 0 ? 200 : 204).json({"count": events.length, "data": events});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        getIcal: function(req, res)
        {
            var event = new icalendar.VEvent('okozfizegz');
            event.setDate(moment().toDate(), moment().toDate());
            event.setLocation("Jacksonville");
            event.setSummary('eogieoib');
            //eventService.getEvents().then(function(events) {
            //
            //    for(var i=0; i<events.length; i++)
            //    {
            //        var options = {
            //            eventName: 'Fingerpainting lessons',
            //            fileName: 'event.ics',
            //            dtstart: 'Sat Nov 02 2014 13:15:00 GMT-0700 (PDT)',
            //            email: {
            //                name: 'Isaac Asimov',
            //                email: 'isaac@asimov.com'
            //            }
            //        };
            //
            //        ics.createEvent(options, null, function (err, success) {
            //            if (err) {
            //                console.log(err);
            //            }
            //
            //            console.log(success);
            //        });
            //    }
            //});

            console.log('ical');
        }
    }
};
