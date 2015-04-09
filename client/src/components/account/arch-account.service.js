'use strict'
angular.module('archCore')
  .factory('archAccountService', function(archHttpService, $q, httpConstant) {
    var casUrl = httpConstant.casUrl + '/oauth/oauth';

    return {
      saveClient: function()
      {
        var client =
        {
          "name" : httpConstant.clientName,
          "redirect_uri" : httpConstant.clientRedirectUri
        }

        var deferred = $q.defer();

        archHttpService.post(casUrl + '/client', client).then(function(result)
        {
          deferred.resolve(result);
        })
          .catch(function(err)
          {
            deferred.reject(err.message);
          });

        return deferred.promise;
      }
    };
  });
