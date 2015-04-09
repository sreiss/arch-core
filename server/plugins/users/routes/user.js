/**
 * User routes.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(userController, userRouter, userMiddleware) {
    userRouter.route('/')
        .get(userController.getUsers)
        .post(userMiddleware.checkSaveUser)
        .post(userController.saveUser)
        .put(userMiddleware.checkUpdateUser)
        .put(userController.updateUser);

    userRouter.route('/:oauthUserId')
        .all(userMiddleware.checkOauthUserId)
        .get(userController.getUser)
        .delete(userController.deleteUser);
}