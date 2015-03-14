/**
 * User controller.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(userService) {
    return {
        /** Save user. */
        saveUser: function(req, res)
        {
            // Get posted user.
            var user = req.body;

            if(user)
            {
                // Saving user.
                userService.saveUser(user, function(err, result)
                {
                    if(err)
                    {
                        res.status(500).json({"message" : "An error occurred while saving new user.", "data" : err.message});
                    }
                    else
                    {
                        res.status(200).json({"message" : "User saved successfully.", "data" : result});
                    }
                });
            }
            else
            {
                res.status(500).json({"message" : "Missing parameters.", "data" : false});
            }
        },

        /** Delete existing user. */
        deleteUser: function(req, res)
        {
            // Get user id.
            var id = req.params.userId;

            if(id)
            {
                // Deleting user.
                userService.deleteUser(id).then(function(user)
                {
                    res.status(200).json({"message" : "User deleted successfully.", "data" : user});
                },
                function(err)
                {
                    res.status(500).json({"message" : "An error occurred while deleting user.", "data" : err.message});
                });
            }
            else
            {
                res.status(500).json({"message" : "Missing parameters.", "data" : false});
            }
        },

        /** Get user's informations. */
        getUser: function(req, res)
        {
            // Get user id.
            var id = req.params.userId;

            if(id)
            {
                // Get user.
                userService.getUserById(id).then(function(user)
                {
                    res.status(200).json({"message" : "User found successfully.", "data" : user});
                },
                function(err)
                {
                    res.status(500).json({"message" : "An error occurred while founding user.", "data" : err.message});
                });
            }
            else
            {
                // Get all users.
                userService.getUsers().then(function(users)
                {
                    res.status(200).json({"message" : "Users found successfully.", "data" : users});
                },
                function(err)
                {
                    res.status(500).json({"message" : "An error occurred while founding users.", "data" : err.message});
                });
            }
        }
    };
};
