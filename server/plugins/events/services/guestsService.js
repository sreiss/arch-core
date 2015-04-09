module.exports = function (Guest, qService) {
    return {
        /** Get guests by event */
        getGuestsByEvent: function(eventId)
        {
            var deferred = qService.defer();
    //'usr_id',
            Guest.find({evt_id: eventId}).populate('evt_id').exec(function (err, result)
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
