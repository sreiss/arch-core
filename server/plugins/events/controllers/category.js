/**
 * Category controller.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;
var ArchDeleteError = GLOBAL.ArchDeleteError;
var ics = require('ics');

var moment = require('moment');

module.exports = function(categoryService)
{
    return {
        /** Save category. */
        saveCategory: function(req, res)
        {
            // Get posted category.
            var category = req.body;

            // Saving category.
            categoryService.saveCategory(category).then(function(category)
            {
                res.status(200).json({"count": (category ? 1 : 0), "data": category});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Delete existing category. */
        deleteCategory: function(req, res)
        {
            // Get category id.
            var id = req.params.categoryid;

            // Deleting category.
            categoryService.deleteCategory(id).then(function(category)
            {
                res.status(200).json({"count": (category ? 1 : 0), "data": category});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        },

        /** Get category's information. */
        getCategory: function(req, res)
        {
            // Get category id.
            var id = req.params.categoryid;

            // Get category.
            categoryService.getCategory(id).then(function(category)
            {
                res.status(category ? 200 : 204).json({"count": 1, "data": category});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        getCategories: function(req, res)
        {
            // Get all categories.
            categoryService.getCategories().then(function(categories)
            {
                res.status(categories.length > 0 ? 200 : 204).json({"count": categories.length, "data": categories});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    }
};
