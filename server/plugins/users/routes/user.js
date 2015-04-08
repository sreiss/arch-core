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

    userRouter.route('/:oauthUserId')
        .all(userMiddleware.checkOauthUserId)
        .get(userController.getUser)
        .delete(userController.deleteUser);
}