module.exports = function(roleController, roleRouter)
{
    roleRouter.route('/')
        .get(roleController.getList);
};