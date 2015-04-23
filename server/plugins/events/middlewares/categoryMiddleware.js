/**
 * Category middleware.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var validator = require('validator');
var ArchParameterError = GLOBAL.ArchParameterError;

module.exports = function()
{
    return {
        checkCategory: function(req, res, next)
        {
            // Get category data.
            var categoryData = req.body;



            next();
        },

        checkCategoryId: function(req, res, next)
        {
            // Check category id.
            var categoryId = req.params.categoryid || '';
            if(!validator.isMongoId(categoryId))
            {
                throw new ArchParameterError("Category ID isn't a valid MongoId.");
            }

            next();
        }
    };
};