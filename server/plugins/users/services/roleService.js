var Q = require('q');

module.exports = function(Role) {
    return {
        getList: function() {
            var deferred = Q.defer();
            Role.find({}, function(err, roles) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(roles);
                }
            });
            return deferred.promise;
        }
    };
};