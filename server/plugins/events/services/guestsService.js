module.exports = function (Guest, qService) {
    return {
        /** Get guests by event */
        getGuestsByEvent: function(eventId)
        {
            var deferred = qService.defer();
    //'usr_id',
            Guest.find({evt_id: eventId}).populate('evt_id').exec(function (err, guests)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(guests);
                }
            });

            return deferred.promise;
        }
    };
};
