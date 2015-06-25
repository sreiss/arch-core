'use strict'

angular.module('archCore').constant('httpConstant',
  {
    /* DEV
     casClientUrl: 'http://localhost:3010',
     casServerUrl: 'http://localhost:3020',
     coreClientUrl: 'http://localhost:3011',
     coreServerUrl: 'http://localhost:3021',
     kidClientUrl: 'http://localhost:3014',
     kidServerUrl: 'http://localhost:3024',
     keystoneClientUrl: 'http://localhost:3013',
     clientRedirectUri : 'http://localhost:3011', */

    /* PROD */
    casClientUrl: 'http://acrobatt-vm12.psi.ad.unistra.fr:3020',
    casServerUrl: 'http://acrobatt-vm12.psi.ad.unistra.fr:3020',
    coreClientUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3021',
    coreServerUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3021',
    kidServerUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3024',
    kidClientUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3024',
    keystoneClientUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3023',
    clientRedirectUri : 'http://acrobatt-vm11.psi.ad.unistra.fr:3021',

    signupType: {
      name: 'ASCPA',
      description: 'User of ASCPA',
      isPublic: 'true'
    },

    clientName: 'ARCH-ASCPA'
  });
