/**
 * Category routes.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

module.exports = function(categoryController, categoryRouter, categoryMiddleware)
{
    categoryRouter.route('/')
        //.post(categoryMiddleware.checkCategory)
        .post(categoryController.saveCategory)
        .get(categoryController.getCategories);

    categoryRouter.route('/:categoryid')
        //.all(categoryMiddleware.checkCategoryId)
        .delete(categoryController.deleteCategory)
        .get(categoryController.getCategory);
};
