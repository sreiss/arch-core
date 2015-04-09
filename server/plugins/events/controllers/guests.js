var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(guestsService) {
    return {

        /** Get guests by event */
        getGuestsByEvent: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

                // Get guest.
            guestsService.getGuestsByEvent(id).then(function(guests)
                {
                    if(guests.length == 0)
                    {
                        res.status(204).json({"count": guests.length, "data": guests});
                    }
                    else
                    {
                        res.status(200).json({"count": guests.length, "data": guests});
                    }
                },
                function(err)
                {
                    res.status(500).json({"error" : new ArchFindError(err.message)});
                });
        }
    };
};