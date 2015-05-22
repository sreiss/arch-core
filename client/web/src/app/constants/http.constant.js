'use strict'

angular.module('archCore').constant('httpConstant',
{
  /* DEV
  casClientUrl: 'http://localhost:3010',
  casServerUrl: 'http://localhost:3020',
  coreClientUrl: 'http://localhost:3011',
  coreServerUrl: 'http://localhost:3021',
  */
  casClientUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3010',
  casServerUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3020',
  coreClientUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3011',
  coreServerUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3021',

  signupType: {
    name: 'ASCPA',
    description: 'User of ASCPA',
    isPublic: 'true'
  },

  clientName: 'ARCH-ASCPA',
  clientRedirectUri : 'http://acrobatt-vm11.psi.ad.unistra.fr:3011'
  /*
  clientRedirectUri : 'http://localhost:3011'
  */
});
