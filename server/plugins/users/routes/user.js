/**
 * User routes.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(userController, userRouter, userMiddleware, authMiddleware) {
    userRouter.route('/')
        .post(authMiddleware.authenticate)
        .post(userController.saveUser)
        .put(authMiddleware.authenticate)
        .put(userController.updateUser);

    userRouter.route('/:oauthUserId')
        .all(userMiddleware.checkOauthUserId)
        .get(userController.getUser)
        .delete(authMiddleware.authenticate)
        .delete(userController.deleteUser);
}