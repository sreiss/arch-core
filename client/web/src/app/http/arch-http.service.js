'use strict';

angular.module('archCore')
  .factory('archHttpService', function($http, $q, $cookieStore)
  {
    return {
      get: function(url, config)
      {
        var deferred = $q.defer();
        config = this.setDefaultConfig(config);

        $http.get(url, config).success(function(result)
        {
          deferred.resolve(result);
        })
          .error(function(err)
          {
            deferred.reject(err);
          });

        return deferred.promise;
      },

      post: function(url, data, config)
      {
        var deferred = $q.defer();
        config = this.setDefaultConfig(config);

        $http.post(url, data, config).success(function(result)
        {
          deferred.resolve(result);
        })
          .error(function(err)
          {
            deferred.reject(err);
          });

        return deferred.promise;
      },

      put: function(url, data, config)
      {
        var deferred = $q.defer();
        config = this.setDefaultConfig(config);

        $http.put(url, data, config).success(function(result)
        {
          deferred.resolve(result);
        })
          .error(function(err)
          {
            deferred.reject(err);
          });

        return deferred.promise;
      },

      delete: function(url, config)
      {
        var deferred = $q.defer();
        config = this.setDefaultConfig(config);

        $http.delete(url, config).success(function(result)
        {
          deferred.resolve(result);
        })
          .error(function(err)
          {
            deferred.reject(err);
          });

        return deferred.promise;
      },

      setDefaultConfig: function(config)
      {
        var config = config || {};
        var token = $cookieStore.get('token') || null;

        if(token !== null)
        {
          config.headers = config.headers || {};
          config.headers["Authorization"] = 'Bearer ' + btoa(JSON.stringify(token));
        }

        return config;
      },

      getFactoryHeader: function()
      {
        var token = $cookieStore.get('token') || null;
        var headers = {'Content-Type' : 'application/json'};

        if(token !== null)
        {
          headers["Authorization"] = 'Bearer ' + btoa(JSON.stringify(token));
        }

        return headers;
      }
    }
  })
  .factory("CoreUsers", function($resource, httpConstant, archHttpService)
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
        headers: archHttpService.getFactoryHeader()
      },
      update:
      {
        method: 'PUT',
        headers: archHttpService.getFactoryHeader()
      }
    })
  })
  .factory("CoreUser", function($resource, httpConstant, archHttpService)
  {
    return $resource(httpConstant.coreServerUrl + '/users/user/:id', {},
    {
      query:
      {
        method: 'GET'
      },
      delete:
      {
        method: 'DELETE',
        headers: archHttpService.getFactoryHeader()
      }
    });
  })
  .factory("OAuthUsers", function($resource, httpConstant, archHttpService)
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
        headers: archHttpService.getFactoryHeader()
      },
      update:
      {
        method: 'PUT',
        headers: archHttpService.getFactoryHeader()
      }
    })
  })
  .factory("OAuthUser", function($resource, httpConstant, archHttpService)
  {
    return $resource(httpConstant.casServerUrl + '/oauth/user/:id', {},
    {
      query:
      {
        method: 'GET'
      },
      delete:
      {
        method: 'DELETE',
        headers: archHttpService.getFactoryHeader()
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
.factory("Event", function($resource, httpConstant, archHttpService)
  {
    return $resource(httpConstant.coreServerUrl + '/events/event/:id', {},
    {
      save:
      {
        method: 'POST',
        headers: archHttpService.getFactoryHeader()
      },
      update:
      {
        method: 'PUT',
        headers: archHttpService.getFactoryHeader()
      },
      query:
      {
        isArray: false
      },
      delete:
      {
        method: 'DELETE',
        headers: archHttpService.getFactoryHeader()
      }
    });
  })
  .factory("Events", function($resource, httpConstant, archHttpService)
  {
    return $resource(httpConstant.coreServerUrl + '/events/event/creator/:id', {},
    {
      save:
      {
        method: 'POST',
        headers: archHttpService.getFactoryHeader()
      },
      update:
      {
        method: 'PUT',
        headers: archHttpService.getFactoryHeader()
      },
      query:
      {
        isArray: false
      },
      delete:
      {
        method: 'DELETE',
        headers: archHttpService.getFactoryHeader()
      }
    });
  })
  .factory("EventGuest", function($resource, httpConstant, archHttpService)
  {
    return $resource(httpConstant.coreServerUrl + '/events/event/updateGuest', {},
    {
      save:
      {
        method: 'POST',
        headers: archHttpService.getFactoryHeader()
      }
    });
  })
  .factory("Participant", function ($resource,httpConstant, archHttpService) {
    return $resource(httpConstant.kidServerUrl + '/kidoikoiaki/participant/:id', {  },
    {
      save:
      {
        method: 'POST',
        headers: archHttpService.getFactoryHeader()
      },
      update:
      {
        method: 'PUT',
        headers: archHttpService.getFactoryHeader()
      }
    });
  })
  .factory("Sheet", function ($resource,httpConstant, archHttpService) {
    return $resource(httpConstant.kidServerUrl + '/kidoikoiaki/sheet/:id', {},
    {
      save:
      {
        method: 'POST',
        headers: archHttpService.getFactoryHeader()
      },
      update:
      {
        method: 'PUT',
        headers: archHttpService.getFactoryHeader()
      }
    });
  });
