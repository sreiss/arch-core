'use strict'

angular.module('archCore').constant('httpConstant',
{
  apiUrl: 'http://localhost:3021',
  loginUrl: 'http://localhost:3010',
  casUrl: 'http://localhost:3021',

  signupType: {
    name: 'ASCPA',
    description: 'User of ASCPA',
    isPublic: 'true'
  },

  clientName: 'ARCH-ASCPA',
  clientRedirectUri : 'http://localhost:3011'
});
