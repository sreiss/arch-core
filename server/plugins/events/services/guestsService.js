/**
 * Guests service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function (Guest, qService)
{
    return {
        /** Get guests by event */
        getGuestsByEvent: function(eventId)
        {
            var deferred = qService.defer();

            Guest.find({evt_id: eventId}).populate('usr_id evt_id').exec(function (err, result)
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
