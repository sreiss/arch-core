/**
 * event plugin.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var validator = require('validator');
var ArchParameterError = GLOBAL.ArchParameterError;

module.exports = function() {
    return {
        checkEvent: function(req, res, next)
        {
            // Get event data.
            var eventData = req.body;

            //// Check event first name (length >= 3).
            //var eventFirstName = eventData.fname || '';
            //if(!validator.isLength(eventFirstName, 3))
            //{
            //    throw new ArchParameterError("event first name must contain at least 3 chars.")
            //}
            //
            //// Check event first name (length >= 3).
            //var eventLastName = eventData.lname || '';
            //if(!validator.isLength(eventLastName, 3))
            //{
            //    throw new ArchParameterError("event last name must contain at least 3 chars.")
            //}
            //
            //// Check event email.
            //var eventEmail = eventData.email || '';
            //if(!validator.isEmail(eventEmail))
            //{
            //    throw new ArchParameterError("event email isn't a valid mail address.")
            //}
            //
            //// Check event password.
            //var eventPassword = eventData.password || '';
            //if(!validator.isLength(eventPassword, 5))
            //{
            //    throw new ArchParameterError("event password must contain at least 5 chars.")
            //}
            //
            //// Check event signuptype.
            //var eventSignupTypeName = eventData.signuptype || {};
            //if(!validator.isLength(eventSignupTypeName, 3))
            //{
            //    throw new ArchParameterError("event signup type must contain at least 3 chars.")
            //}

            console.log('ok');

            next();
        },

        checkEventId: function(req, res, next)
        {
            // Check event id.
            var eventId = req.params.eventid || '';
            if(!validator.isMongoId(eventId))
            {
                throw new ArchParameterError("Event ID isn't a valid MongoId.");
            }

            next();
        }
    };
};
