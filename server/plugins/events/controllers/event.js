/**
 * Event controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var fs = require('fs');
var moment = require('moment');

module.exports = function(eventService)
{
    return {
        /** Save event. */
        saveEvent: function(req, res)
        {
            // Get posted event.
            var event = req.body;

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

        /** Updating event. */
        updateEvent: function(req, res)
        {
            // Get posted event.
            var event = req.body;

            // Updating event.
            eventService.updateEvent(event).then(function(event)
            {
                res.status(200).json({"count": (event ? 1 : 0), "data": event});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Add an event's guest */
        updateGuest: function(req, res)
        {
            var event = req.body;

            eventService.updateGuest(event).then(function(event)
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

        /** Get event's informations by date. */
        getEventsByDate: function(req, res)
        {
            // Get event date.
            var date = req.params.eventdate;

            // Get event.
            eventService.getEventsByDate(date).then(function(event)
            {
                res.status(event ? 200 : 204).json({"count": 1, "data": event});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get event's informations by type. */
        getEventsByCategory: function(req, res)
        {
            // Get event type.
            var category = req.params.eventcategory;

            // Get event.
            eventService.getEventsByCategory(category).then(function(event)
            {
                res.status(event ? 200 : 204).json({"count": 1, "data": event});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get event's informations by type. */
        getEventsByCreator: function(req, res)
        {
            // Get event type.
            var creator = req.params.eventcreator;

            // Get event.
            eventService.getEventsByCreator(creator).then(function(event)
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
            eventService.getEvents().then(function(events)
            {
                var ical= "BEGIN:VCALENDAR\r\n" +
                    "METHOD:PUBLISH\r\n" +
                    "VERSION:2.0\r\n" +
                    "PRODID:-//ArchTailors//Acrobatt//FR\r\n";

                for(var i=0; i<events.length; i++)
                {
                    var start = moment(events[i].dtstart).subtract(1, 'hours').format("YYYYMMDDTHHmmss") + "Z";
                    var end = moment(events[i].dtend).subtract(1, 'hours').format("YYYYMMDDTHHmmss") + "Z";

                    ical = ical + "BEGIN:VEVENT\r\n" +
                        "SUMMARY:" + events[i].summary + "\r\n" +
                        "UID:" + events[i]._id + "\r\n" +
                        "DTSTART:" + start + "\r\n" +
                        "DTEND:" + end + "\r\n" +
                        "LOCATION:" + events[i].location + "\r\n" +
                        "DESCRIPTION:" + events[i].description + "\r\n" +
                        "TRANSP:" + events[i].transp + "\r\n" +
                        "SEQUENCE:" + events[i].sequence + "\r\n" +
                        "END:VEVENT\r\n";
                }

                ical = ical + "END:VCALENDAR";

                fs.writeFile('archtailor.ics', ical, function(err)
                {
                    res.header("Content-Type", "text/plain");
                    res.download('archtailor.ics', 'archtailor.ics');
                });

            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });

        }
    }
};
