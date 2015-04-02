var ArchSaveError = GLOBAL.ArchSaveError;

module.exports = function(guestService) {
    return {
        saveGuest: function(req, res)
        {
            // Get posted guest.
            var guest = req.body;
            //console.log(guest);

            // Saving guest.
            guestService.saveGuest(guest).then(function(result) {
                res.status(200).json({"count" : (result ? 1 : 0), "data" : result});
            })
            .catch(function(err)
            {
                throw new ArchSaveError(err.message);
            });
        },

        /** Delete existing guest. */
        deleteGuest: function(req, res)
        {
            // Get guest id.
            var id = req.params.guestid;

            if(id)
            {
                // Deleting guest.
                guestService.deleteGuest(id).then(function(guest)
                    {
                        res.status(200).json({"message" : "Guest deleted successfully.", "data" : guest});
                    },
                    function(err)
                    {
                        res.status(500).json({"message" : "An error occurred while deleting guest.", "data" : err.message});
                    });
            }
            else
            {
                res.status(500).json({"message" : "Missing parameters.", "data" : false});
            }
        },

        /** Get guest's informations. */
        getGuest: function(req, res)
        {
            // Get guest id.
            var id = req.params.guestid;

            if(id)
            {
                // Get guest.
                guestService.getGuest(id).then(function(guest)
                    {
                        res.status(200).json({"message" : "Guest found successfully.", "data" : guest});
                    },
                    function(err)
                    {
                        res.status(500).json({"message" : "An error occurred while founding guest.", "data" : err.message});
                    });
            }
            else
            {
                // Get all guests.
                guestService.getGuests().then(function(guests)
                    {
                        res.status(200).json({"message" : "guests found successfully.", "data" : guests});
                    },
                    function(err)
                    {
                        res.status(500).json({"message" : "An error occurred while founding guests.", "data" : err.message});
                    });
            }
        },

        /** Get guests by event */
        getGuests: function(req, res)
        {
            // Get event id.
            var id = req.params.eventid;

                // Get guest.
            guestService.getGuests(id).then(function(guest)
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