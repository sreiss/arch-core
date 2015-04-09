'use strict'

angular.module('archCore').constant('httpConstant',
{
  apiUrl: 'http://localhost:3008',
  loginUrl: 'http://localhost:3002',
  casUrl: 'http://localhost:3008',

  signupType: {
    name: 'ASCPA',
    description: 'User of ASCPA',
    isPublic: 'true'
  },

  clientName: 'ARCH-ASCPA',
  clientRedirectUri : 'http://localhost:3000'
});
