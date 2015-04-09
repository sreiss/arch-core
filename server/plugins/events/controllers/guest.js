var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;


module.exports = function(guestService) {
    return {
        saveGuest: function(req, res)
        {
            // Get posted guest.
            var guest = req.body;
            //console.log(guest);

            // Saving guest.
            guestService.saveGuest(guest).then(function(guest)
                {
                    res.status(200).json({"count" : (guest ? 1 : 0), "data" : guest});
                },
                function(err)
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
                },
                function(err)
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
                    if(!guest)
                    {
                        res.status(204).json({"count": 0, "data": guest});
                    }
                    else
                    {
                        res.status(200).json({"count":  1, "data": guest});
                    }
                },
                function(err)
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