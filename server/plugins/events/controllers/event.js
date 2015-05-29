/**
 * Event controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
//var moment = require('moment');
var VCalendar = require('cozy-ical').VCalendar;
var VEvent = require('cozy-ical').VEvent;
//var icalendar = require('icalendar');

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

        /** Add guest to an existing event */
        addGuest: function(req, res)
        {
            var event = req.body;

            eventService.addGuest(event).then(function(event)
            {
                res.status(200).json({"count": (event ? 1 : 0), "data": event});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },


        /** Update guest's status */
        changeStatus: function(req, res)
        {
            var event = req.body;

            eventService.changeStatus(event).then(function(event)
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
            // Avec icalendar
            //var ical = new icalendar.iCalendar();
            //
            //eventService.getEvents().then(function(events)
            //{
            //    for(var i=0; i<events.length; i++)
            //    {
            //        var event = new icalendar.VEvent(i);
            //        event.setDate(events[i].dtstart, events[i].dtend);
            //        event.setSummary(events[i].summary);
            //        event.setLocation(events[i].location);
            //        event.setDescription(events[i].description);
            //        ical.addComponent(event);
            //    }
            //    res.status(200);
            //    console.log(ical.events());
            //})
            //.catch(function(err)
            //{
            //    res.status(500).json({"error" : new ArchFindError(err.message)});
            //});

            var cal = new VCalendar({
                organization:'ArchTailors',
                title:'Trail events'
            });

            eventService.getEvents().then(function(events)
            {
                for(var i=0; i<events.length; i++)
                {
                    var vevent = new VEvent({
                        startDate: events[i].dtstart,
                        endDate: events[i].dtend,
                        summary: events[i].summary,
                        location: events[i].location,
                        description: events[i].description,
                        transp: events[i].transp,
                        sequence: events[i].sequence,
                        categories: events[i].category,
                        stampDate: '2014-04-25T01:32:21.196Z',
                        uid: i
                    });
                    cal.add(vevent);
                }
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
            console.log(cal.toString());
            //console.log('lol');
        }
    }
};
