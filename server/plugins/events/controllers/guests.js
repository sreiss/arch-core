module.exports = function(guestsService) {
    return {

        /** Get guests by event */
        getGuestsByEvent: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

                // Get guest.
            guestsService.getGuestsByEvent(id).then(function(guest)
                {
                    res.status(200).json({"message" : "Guests found successfully.", "data" : guest});
                },
                function(err)
                {
                    res.status(500).json({"message" : "An error occurred while founding guest.", "data" : err.message});
                });
        }
    };
};