/**
 * User routes.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(userController, userRouter, userMiddleware) {
    userRouter.route('/')
        .get(userController.getUsers)
        .post(userMiddleware.checkUser)
        .post(userController.saveUser);

    userRouter.route('/:userId')
        .get(userMiddleware.checkUserId)
        .get(userController.getUser);
}