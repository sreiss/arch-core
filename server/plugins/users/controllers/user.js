/**
 * User controller.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(userService) {
    return {
        /** Save user. */
        saveUser: function(req, res)
        {
            // Get posted user.
            var user = req.body;

            // Saving user.
            userService.saveUser(user).then(function(result)
            {
                res.status(200).json({"count": (result ? 1 : 0), "data": result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Get user's informations. */
        getUser: function(req, res)
        {
            // Get user id.
            var id = req.params.userId;

            // Get user.
            userService.getUserById(id).then(function(result)
            {
                res.status(200).json({"count": (result ? 1 : 0), "data": result});
            },
            function (err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get users informations. */
        getUsers: function(req, res)
        {
            // Get all users.
            userService.getUsers().then(function(result)
            {
                res.status(200).json({"count" : result.length, "data" : result});
            },
            function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};
