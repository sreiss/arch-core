angular.module('archCore')
  .factory("Users", function($resource, httpConstant)
  {
    return $resource(httpConstant.apiUrl + '/users/user', {},
    {
      findAll:
      {
        isArray: false
      }
  });
 /* .factory("User", function($resource, httpConstant)
  {
    return $resource(httpConstant.apiUrl + '/users/user/:id', { },
    {
      save:
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
    });
  });*/
});
