/**
 * Guests controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(guestsService)
{
    return {
        /** Get guests by event */
        getGuestsByEvent: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

                // Get guest.
            guestsService.getGuestsByEvent(id).then(function(guests)
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