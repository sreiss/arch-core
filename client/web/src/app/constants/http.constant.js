'use strict'

angular.module('archCore').constant('httpConstant',
{
  /* DEV
  casClientUrl: 'http://localhost:3010',
  casServerUrl: 'http://localhost:3020',
  coreClientUrl: 'http://localhost:3011',
  coreServerUrl: 'http://localhost:3021',

   */
  /* PROD   */
  casClientUrl: 'http://acrobatt-vm12.psi.ad.unistra.fr:3020',
  casServerUrl: 'http://acrobatt-vm12.psi.ad.unistra.fr:3020',
  coreClientUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3021',
  coreServerUrl: 'http://acrobatt-vm11.psi.ad.unistra.fr:3021',

  signupType: {
    name: 'ASCPA',
    description: 'User of ASCPA',
    isPublic: 'true'
  },

  clientName: 'ARCH-ASCPA',
  /* */
  clientRedirectUri : 'http://acrobatt-vm11.psi.ad.unistra.fr:3021',

  //clientRedirectUri : 'http://localhost:3011',
  test : {
    "sProcessing":     "Traitement en cours...",
    "sSearch":         "Rechercher&nbsp;:",
    "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
    "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
    "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
    "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
    "sInfoPostFix":    "",
    "sLoadingRecords": "Chargement en cours...",
    "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
    "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
    "oPaginate": {
      "sFirst":      "Premier",
      "sPrevious":   "Pr&eacute;c&eacute;dent",
      "sNext":       "Suivant",
      "sLast":       "Dernier"
    },
    "oAria": {
      "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
      "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
    }
  }

});
