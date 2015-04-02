/**
 * event controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;

module.exports = function(eventService) {
    return {
        /** Save event. */
        saveEvent: function(req, res)
        {
            // Get posted event.
            var event = req.body;
            //console.log(event);

            // Saving event.
            eventService.saveEvent(event).then(function(result)
            {
                res.status(200).json({"count": (result ? 1 : 0), "data": result});
            })
            .catch(function(err)
            {
                throw new ArchSaveError(err.message);
            });
        },

        /** Delete existing event. */
        deleteEvent: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

            if(id)
            {
                // Deleting event.
                eventService.deleteEvent(id).then(function(event)
                    {
                        res.status(200).json({"message" : "Event deleted successfully.", "data" : event});
                    },
                    function(err)
                    {
                        res.status(500).json({"message" : "An error occurred while deleting event.", "data" : err.message});
                    });
            }
            else
            {
                res.status(500).json({"message" : "Missing parameters.", "data" : false});
            }
        },

        /** Get event's informations. */
        getEvent: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

            if(id)
            {
                // Get event.
                eventService.getEventById(id).then(function(event)
                    {
                        res.status(200).json({"message" : "Event found successfully.", "data" : event});
                    },
                    function(err)
                    {
                        res.status(500).json({"message" : "An error occurred while founding event.", "data" : err.message});
                    });
            }
            else
            {
                // Get all events.
                eventService.getEvents().then(function(events)
                    {
                        res.status(200).json({"message" : "Events found successfully.", "data" : events});
                    },
                    function(err)
                    {
                        res.status(500).json({"message" : "An error occurred while founding events.", "data" : err.message});
                    });
            }
        }
    };
};
