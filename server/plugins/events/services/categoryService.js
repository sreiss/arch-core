/**
 * Category service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');
var q = require('q');

module.exports = function(Category)
{
    return {
        /** Save category. */
        saveCategory: function(categoryData)
        {
            var deferred = q.defer();
            var category = new Category();

            // Assign data.
            category.name = categoryData.name;
            category.label = categoryData.label;
            category.description = categoryData.description;

            category.save(function(err)
            {
                if(err)
                {
                    deferred.reject(err.message);
                }
                else
                {
                    deferred.resolve(category);
                }
            })

            return deferred.promise;
        },

        /** Delete existing category. */
        deleteCategory: function(categoryId)
        {
            var deferred = q.defer();

            Category.findOneAndRemove({_id: categoryId}, function(err, category)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!category)
                {
                    deferred.reject(new Error('No category matching [CATEGORY_ID] : ' + categoryId + "."));
                }
                else
                {
                    deferred.resolve(category);
                }
            });

            return deferred.promise;
        },

        /** Get category's information by categoryId. */
        getCategory: function(categoryId)
        {
            var deferred = q.defer();

            Category.findOne({_id: categoryId}).exec(function (err, category)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!category)
                {
                    deferred.reject(new Error('No category matching [CATEGORY_ID] : ' + categoryId + "."));
                }
                else
                {
                    deferred.resolve(category);
                }
            });

            return deferred.promise;
        },

        /** Get all categories' information. */
        getCategories: function() {
            var deferred = q.defer();

            Category.find().exec(function (err, categories) {
                if (err) {
                    deferred.reject(err);
                }
                else if (!categories) {
                    deferred.reject(new Error('No categories found.'));
                }
                else {
                    deferred.resolve(categories);
                }
            });

            return deferred.promise;
        }
    };
};