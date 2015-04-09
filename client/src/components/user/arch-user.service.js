'use strict'

angular.module('archCore')
  .factory('archUserService', function($q)
  {
    return {
      generateRandomPassword: function()
      {
        var pwd = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(var i= 0; i < 8; i++ )
        {
          pwd += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return pwd;
      },

      sendUserMail: function(fname, lname, password, email)
      {
        alert("sendUserMail");
      }
    }
  });
