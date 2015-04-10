/**
 * Guest middleware.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var validator = require('validator');
var ArchParameterError = GLOBAL.ArchParameterError;

module.exports = function()
{
    return {
        /*checkGuest: function(req, res, next)
        {
            // Get guest data.
            var guestData = req.body;

            console.log(guestData);

            next();
        },*/

        checkGuestId: function(req, res, next)
        {
            // Check guest id.
            var guestId = req.params.guestid || '';
            if(!validator.isMongoId(guestId))
            {
                throw new ArchParameterError("Guest ID isn't a valid MongoId.");
            }

            next();
        }
    };
};
