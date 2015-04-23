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
        checkEvent: function(req, res, next)
        {
            // Get event data.
            var eventData = req.body;

            // Check event start
            var eventStart = eventData.dtstart || '';
            if(!validator.isDate(eventStart))
            {
                throw new ArchParameterError("Event start isn't a date.");
            }

			// Check event end
            var eventEnd = eventData.dtend || '';
            if(!validator.isDate(eventEnd))
            {
                throw new ArchParameterError("Event end isn't a date.");
            }
			
            // Check event summary (length >= 3).
            var eventSum = evenData.summary || '';
            if(!validator.isLength(eventSum, 3))
            {
                throw new ArchParameterError("Event summary must contain at least 3 chars.");
            }
			
            // Check event location
            var eventLoc = eventData.location || '';
            if(!validator.isLength(eventLoc, 3))
            {
                throw new ArchParameterError("Event location must contain at least 3 chars.");
            }

            // Check event description
            var eventDescription = eventData.description || '';
            if(!validator.isLength(eventDescription, 5))
            {
                throw new ArchParameterError("Event description must contain at least 5 chars.");
            }

            // Check event transp
            var eventTp = eventData.transp || '';
            if(!validator.isLength(eventTp, 3))
            {
                throw new ArchParameterError("Event transp must contain at least 3 chars.");
            }

            // Check event sequence 
            var eventSeq = eventData.sequence || '';
            if(!validator.isNumeric(eventSeq))
            {
                throw new ArchParameterError("Event sequence must be numeric.");
            }
			
			// Check event category (length >= 3).
            var eventCat = eventData.category || '';
            if(!validator.isLength(eventCat, 3))
            {
                throw new ArchParameterError("Event sequence must contain at least 3 chars.");
            }
			
			// Check event participants
            var eventPart = eventData.participants || [];
            for(var i = 0; i < eventPart.length; i++)
            {
                if(!validator.isMongoId(eventPart[i].guest))
                {
                    throw new ArchParameterError("Guest ID isn't a valid MongoId.");
                }

                if(!validator.isLength(eventPart[i].status))
                {
                    throw new ArchParameterError("Participants status must contain at least 3 chars.");
                }
            }

            // Check event course
            var eventCourse = eventData.course || '';
            if(!validator.isMongoId(eventCourse))
            {
                throw new ArchParameterError("Course ID isn't a valid MongoId.");
            }

            // Check event website (length >= 3).
            var eventWebsite = eventData.website || '';
            if(!validator.isLength(eventWebsite, 3))
            {
                throw new ArchParameterError("Event website must contain at least 3 chars.");
            }

            // Check event information (length >= 3).
            var eventInfo = eventData.information || '';
            if(!validator.isLength(eventInfo, 3))
            {
                throw new ArchParameterError("Event information must contain at least 3 chars.");
            }

            // Check event trainings
            var eventTrainings = eventData.trainings || [];
            for(var i = 0; i < eventTrainings.length; i++)
            {
                if(!validator.isMongoId(eventTrainings[i].training))
                {
                    throw new ArchParameterError("Training ID isn't a valid MongoId.");
                }
            }

            // Check event creator
            var eventCreator = eventData.creator || '';
            if(!validator.isMongoId(eventCreator))
            {
                throw new ArchParameterError("Creator ID isn't a valid MongoId.");
            }

            // Check event runs
            var eventRuns = eventData.runs || [];
            for(var i = 0; i < eventRuns.length; i++)
            {
                if(!validator.isMongoId(eventRuns[i].run))
                {
                    throw new ArchParameterError("Training ID isn't a valid MongoId.");
                }
            }

            // Check training program (length >= 3).
            var eventProg = evenData.program || '';
            if(!validator.isLength(eventProg, 3))
            {
                throw new ArchParameterError("Event program must contain at least 3 chars.");
            }

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