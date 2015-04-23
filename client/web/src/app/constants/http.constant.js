'use strict'

angular.module('archCore').constant('httpConstant',
{
  casClientUrl: 'http://localhost:3010',
  casServerUrl: 'http://localhost:3020',
  coreClientUrl: 'http://localhost:3011',
  coreServerUrl: 'http://localhost:3021',

  signupType: {
    name: 'ASCPA',
    description: 'User of ASCPA',
    isPublic: 'true'
  },

  clientName: 'ARCH-ASCPA',
  clientRedirectUri : 'http://localhost:3011'
});
