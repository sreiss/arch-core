'use strict';

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
  .factory("CoreUsers", function($resource, httpConstant)
  {
    return $resource(httpConstant.coreServerUrl + '/users/user', {},
    {
      query:
      {
        isArray: false
      },
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
    })
  })
  .factory("CoreUser", function($resource, httpConstant)
  {
    return $resource(httpConstant.coreServerUrl + '/users/user/:id', {},
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
  })
  .factory("OAuthUsers", function($resource, httpConstant)
  {
    return $resource(httpConstant.casServerUrl + '/oauth/user', {},
    {
      query:
      {
        isArray: false
      },
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
    })
  })
  .factory("OAuthUser", function($resource, httpConstant)
  {
    return $resource(httpConstant.casServerUrl + '/oauth/user/:id', {},
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
  })
  .factory("SignupTypeUsers", function($resource, httpConstant)
  {
    return $resource(httpConstant.casServerUrl + '/oauth/signuptype/:signupType', {},
      {
        query:
        {
          isArray: false
        }
      })
  })
.factory("Event", function($resource, httpConstant)
  {
    return $resource(httpConstant.coreServerUrl + '/events/event/:id', {},
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
        },
        delete:
        {
          method: 'DELETE'
        }
      });
  })
  .factory("EventGuest", function($resource, httpConstant)
  {
    return $resource(httpConstant.coreServerUrl + '/events/event/addGuest', {},
      {
        save:
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      });
  });
