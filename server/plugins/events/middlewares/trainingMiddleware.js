/**
 * Event middleware.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var validator = require('validator');
var ArchParameterError = GLOBAL.ArchParameterError;

module.exports = function()
{
    return {
        checkTraining: function(req, res, next)
        {
            // Get event data.
            var eventData = req.body;

            // Check event first name (length >= 3).
            var eventName = eventData.name || '';
            if(!validator.isLength(eventName, 3))
            {
                throw new ArchParameterError("event name must contain at least 3 chars.")
            }

            // Check event type (length >= 3).
            var eventType = evenData.type || '';
            if(!validator.isLength(eventType, 3))
            {
                throw new ArchParameterError("event type must contain at least 3 chars.")
            }

            // Check event start.
            var eventBegin = eventData.begin || '';
            if(!validator.isDate(eventBegin))
            {
                throw new ArchParameterError("event start isn't a date.")
            }

            // Check event end.
            var eventEnd = eventData.end || '';
            if(!validator.isDate(eventEnd))
            {
                throw new ArchParameterError("event end isn't a date.")
            }

            // Check event description.
            var eventDescription = eventData.description || '';
            if(!validator.isLength(eventDescription, 5))
            {
                throw new ArchParameterError("event description must contain at least 5 chars.")
            }

            // Check event address.
            var eventAddress = eventData.address || '';
            if(!validator.isLength(eventAddress, 5))
            {
                throw new ArchParameterError("event address must contain at least 5 chars.")
            }

            // Check event ville (length >= 3).
            var eventVille = evenData.ville || '';
            if(!validator.isLength(eventVille, 3))
            {
                throw new ArchParameterError("event ville must contain at least 3 chars.")
            }

            // Check event type (length >= 3).
            var eventCountry = evenData.country || '';
            if(!validator.isLength(eventCountry, 3))
            {
                throw new ArchParameterError("event country must contain at least 3 chars.")
            }

            // Check event zip (length >= 3).
            var eventZip = evenData.zip || '';
            if(!validator.isNumeric(eventZip, 3))
            {
                throw new ArchParameterError("event zip must be numeric.")
            }

            next();
        },

        checkTrainingId: function(req, res, next)
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
