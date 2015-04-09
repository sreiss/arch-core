angular.module('archCore')
  .factory("Users", function($resource, httpConstant)
  {
    return $resource(httpConstant.apiUrl + '/users/user', {},
    {
      findAll:
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
      delete:
      {
        method: 'DELETE'
      }
    });
  });

