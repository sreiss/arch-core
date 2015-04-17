angular.module('archCore')
  .factory('archHttpService', function($http, $q)
  {
    return {
      get: function(url, config)
      {
        var deferred = $q.defer();
        config = config || {};
        $http.get(url, config)
          .success(function(result) {
            deferred.resolve(result);
          })
          .error(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },
      post: function(url, data, config)
      {
        var deferred = $q.defer();
        config = config || {};
        $http.post(url, data, config)
          .success(function(result) {
            deferred.resolve(result);
          })
          .error(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },
      delete: function(url, config)
      {
        var deferred = $q.defer();
        config = config || {};
        $http.delete(url, config)
          .success(function(result) {
            deferred.resolve(result);
          })
          .error(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      }
    }
  })
  .factory("Users", function($resource, httpConstant)
  {
    return $resource(httpConstant.apiUrl + '/users/user', {},
    {
      query:
      {
        isArray: false
      }
    })
  })
  .factory("User", function($resource, httpConstant)
  {
    return $resource(httpConstant.apiUrl + '/users/user', {},
    {
      save:
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      update:
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }
    });
  })
  .factory("Event", function($resource, httpConstant)
  {
    return $resource(httpConstant.apiUrl + '/events/event', {},
      {
        save:
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        },
        update:
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        },
        query:
        {
          isArray: false
        }
      });
  })
  .factory("OauthUser", function($resource, httpConstant)
  {
    return $resource(httpConstant.apiUrl + '/users/user/:id', {},
    {
      query:
      {
        method: 'GET'
      },
      delete:
      {
        method: 'DELETE'
      }
    });
  });

