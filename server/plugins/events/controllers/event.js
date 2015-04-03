/**
 * event controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;
var ArchDeleteError = GLOBAL.ArchDeleteError;

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
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Delete existing event. */
        deleteEvent: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

            // PIERRE : Utilise les middleware pour vérifier la présence des champs (regarde users).
            if(id)
            {
                // Deleting event.
                eventService.deleteEvent(id).then(function(result)
                {
                    res.status(200).json({"count": (result ? 1 : 0), "data": result});
                })
                .catch(function(err)
                {
                    res.status(500).json({"error" : new ArchDeleteError(err.message)});
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

            // PIERRE : Utilise les middleware pour vérifier la présence des champs (regarde users).
            if(id)
            {
                // Get event.
                eventService.getEventById(id).then(function(result)
                {
                    res.status(200).json({"count": (result ? 1 : 0), "data": result});
                })
                .catch(function(err)
                {
                    res.status(500).json({"error" : new ArchFindError(err.message)});
                });
            }
            else
            {
                // Get all events.
                eventService.getEvents().then(function(result)
                {
                    res.status(200).json({"count": (result ? 1 : 0), "data": result});
                })
                .catch(function(err)
                {
                    res.status(500).json({"error" : new ArchFindError(err.message)});
                });
            }
        }
    };
};
