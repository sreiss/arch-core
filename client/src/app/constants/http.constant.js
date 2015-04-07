'use strict'

angular.module('archCore').constant('httpConstant',
{
  apiUrl: 'http://localhost:3008',

  signupType: {
    name: 'ASCPA',
    description: 'User of ASCPA',
    isPublic: 'true'
  },

  clientName: 'ARCH-ASCPA',
  clientRedirectUri : 'http://localhost:3001'
});
