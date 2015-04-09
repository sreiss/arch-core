module.exports = function (Guest, qService) {
    return {
        /** Save guest. */
        saveGuest: function(guestData)
        {
            var deferred = qService.defer();
            //console.log(guestData);
            var guest = new Guest();
            guest.usr_id = guestData.usr_id;
            guest.evt_id = guestData.evt_id;

            guest.save(function(err)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(guest);
                }
            });

            return deferred.promise;
        },

        /** Delete guest. */
        deleteGuest: function(guestId)
        {
            var deferred = qService.defer();

            Guest.findOneAndRemove({_id: guestId}, function(err, guest)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!guest)
                {
                    deferred.reject(new Error('No guest matching [guest_ID] : ' + guestId + "."));
                }
                else
                {
                    deferred.resolve(guest);
                }
            });

            return deferred.promise;
        },

        /** Get guest. */
        getGuest: function(guestId)
        {
            var deferred = qService.defer();

            Guest.findOne({_id: guestId}).populate('evt_id').exec(function (err, guest)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                else
                {
                    deferred.resolve(guest);
                }
            });

            return deferred.promise;
        },

        /** Get all guests */
        getGuests: function()
        {
            var deferred = qService.defer();
    //'usr_id',
            Guest.find().populate('evt_id').exec(function (err, result)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(result);
                }
            });

            return deferred.promise;
        }
    };
};
