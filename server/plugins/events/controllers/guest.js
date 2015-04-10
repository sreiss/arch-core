/**
 * Guest controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(guestService)
{
    return {
        saveGuest: function(req, res)
        {
            // Get posted guest.
            var guest = req.body;

            // Saving guest.
            guestService.saveGuest(guest).then(function(guest)
            {
                res.status(200).json({"count" : (guest ? 1 : 0), "data" : guest});
            })
            .catch(function(err)
            {
                res.status(500).json({"error": new ArchSaveError(err.message)});
            });
        },

        /** Delete existing guest. */
        deleteGuest: function(req, res)
        {
            // Get guest id.
            var id = req.params.guestid;

            // Deleting guest.
            guestService.deleteGuest(id).then(function(guest)
            {
                res.status(200).json({"count" : (guest ? 1 : 0), "data" : guest});
            })
            .catch(function(err)
            {
                res.status(500).json({"message" : "An error occurred while deleting guest.", "data" : err.message});
            });
        },

        /** Get guest's informations. */
        getGuest: function(req, res)
        {
            // Get guest id.
            var id = req.params.guestid;

            // Get guest.
            guestService.getGuest(id).then(function(guest)
            {
                res.status(guest ? 200 : 204).json({"count": 0, "data": guest});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get all guests */
        getGuests: function(req, res)
        {
                // Get guest.
            guestService.getGuests().then(function(guests)
            {
                res.status(guests.length > 0 ? 200 : 204).json({"count": guests.length, "data": guests});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};