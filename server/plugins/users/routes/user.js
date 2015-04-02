/**
 * User routes.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(userController, userRouter) {
    userRouter.route('/')
        .get(userController.getUsers)
        .post(userController.saveUser);

    userRouter.route('/:userId')
        .get(userController.getUser);
}