'use strict';
angular.module('archCore')
  .constant('i18nfrFRConstant', {
    'CUSTOMER_NAME' : "ArchCore",
    'CUSTOMER_DESC' : "Administration de l'ASCPA",

    'SIDEBAR_HOME' : "Accueil",
    'SIDEBAR_USERS' : "Membres",
    'SIDEBAR_EVENTS' : "Evènements",
    'SIDEBAR_CALENDAR' : "Calendrier",
    'SIDEBAR_TRACKS' : "Parcours",
    'SIDEBAR_ACCOUNT' : "Mon compte",
    'SIDEBAR_LOGOUT' : "Déconnexion",

    'HOME_TITLE' : "Accueil",
    'HOME_P1' : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse magna neque, condimentum id odio eget, dapibus dictum mauris. Cras at fermentum velit. Nullam nibh diam, tincidunt quis leo non, vehicula placerat nisi. Nunc auctor, quam vitae venenatis imperdiet, nunc mauris vehicula nibh eget scelerisque est sapien ac odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam ligula lorem, molestie id neque ac, consequat iaculis ante.",
    'HOME_P2' : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse magna neque, condimentum id odio eget, dapibus dictum mauris. Cras at fermentum velit. Nullam nibh diam, tincidunt quis leo non, vehicula placerat nisi. Nunc auctor, quam vitae venenatis imperdiet, nunc mauris vehicula nibh eget scelerisque est sapien ac odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam ligula lorem, molestie id neque ac, consequat iaculis ante.",

    'USERS_TITLE' : "Membres",
    'USERS_ADD_USER' : "Nouveau membre",
    'USERS_NO_USERS' : "Vous n'avez à ce jour ajouté aucun membre.",
    'USERS_TABLE_NOM' : "Nom",
    'USERS_TABLE_PRENOM' : "Prénom",
    'USERS_TABLE_EMAIL' : "Adresse e-mail",
    'USERS_TABLE_ROLE' : "Rôle",
    'USERS_TABLE_CREATED' : 'Inscrit le',

    'USERS_ADD_TITLE': "Ajout d'un membre",
    'USERS_EDIT_TITLE': "Modification d'un membre",
    'USERS_VIEW_TITLE': "Fiche d'un membre",
    'USERS_PROFILE' : "Mon profil",
    'USER_FORM_BACK' : "Retour",
    'USER_FORM_SUBMIT': "Valider",
    'USER_FORM_EDIT' : "Modifier",
    'USER_MAIL_TO_ALL' : "Message groupé",
    'USER_FORM_FNAME': "Prénom",
    'USER_FORM_LNAME': "Nom",
    'USER_FORM_EMAIL': "Adresse e-mail",
    'USER_FORM_PASSWORD': "Mot de passe",
    'USER_FORM_CONFIRM': "Confirmation",
    'USER_FORM_BIRTHDATE': "Date de naissance",
    'USER_FORM_NOTICE_RANDOM_PASSWORD': "Un mot de passe aléatoire sera généré et communiqué par courrier électronique à la création du membre.",
    'USER_FORM_PHONE' : "Téléphone",
    'USER_FORM_ADRESS' : "Adresse",
    'USER_FORM_AVATAR' : "Avatar",
    'USER_FORM_FFA' : "Licence FFA",
    'USER_FORM_CHOOSE' : "Choisir ...",
    'EVENT_FORM_RUN' : "Course",
    'USER_FORM_ROLE': "Rôle",
    'USER_FORM_ROLE_AUTHENTICATED': "Authentifié",
    'USER_FORM_ROLE_MEMBER': "Membre",
    'USER_FORM_ROLE_ADMIN': "Administrateur",
    'USER_FORM_ROLE_CARTOGRAPHER': "Cartographe",
    'USER_FORM_NC' : "Non renseigné",

    'EVENTS_TITLE' : "Evènements",
    'DISCOVERIES_TITLE' : "Sorties découvertes",
    'OFFICIAL_RUNS_TITLE' : "Courses officielles",
    'PERSONAL_TRAININGS_TITLE' : "Entraînements personnelles",
    'TRAININGS_TITLE' : "Entraînements",

    'EVENT_TITLE_ADD' : "Nouvel évènement",
    'DISCOVERY_TITLE_ADD' : "Nouvelle sortie découverte",
    'OFFICIAL_RUN_TITLE_ADD' : "Nouvelle course officielle",
    'PERSONAL_TRAINING_TITLE_ADD' : "Nouvel entraînement personnel",
    'TRAINING_TITLE_ADD' : "Nouvel entraînement",

    'EVENT_ADD_TITLE': "Nouvel évènement",
    'EVENT_ADD_EVENT' : "Ajout d'un évènement",
    'EVENT_EDIT_EVENT' : "Modification d'un évenement",
    'EVENT_FORM_NAME' : "Nom de l'évènement",
    'EVENT_FORM_TYPE' : "Type de l'évènement",
    'EVENT_FORM_TYPE_RACE' : "Course",
    'EVENT_FORM_TYPE_DISCOVERY' : "Découverte",
    'EVENT_FORM_TYPE_TRAINING' : "Entrainement",
    'EVENT_FORM_START' : "Date de début de l'évènement",
    'EVENT_FORM_DAY' : "Jour",
    'EVENT_FORM_MONTH' : "Mois",
    'EVENT_FORM_YEAR' : "Année",
    'EVENT_FORM_HOUR' : "Heure",
    'EVENT_FORM_MINUTE' : "Minute",
    'EVENT_FORM_END' : "Date de fin de l'évènement",
    'EVENT_FORM_DESCRIPTION' : "Description",
    'EVENT_FORM_LOCATION' : "Adresse",
    'EVENT_FORM_ZIP' : "Code postal",
    'EVENT_FORM_WEBSITE' : "Site internet",
    'EVENT_FORM_INFORMATIONS' : "Informations",
    'EVENT_TAKE_PART' : "Participer",
    'EVENT_MAYBE' : "Peut-être",
    'EVENT_LIST_GUEST' : "Liste des participants",
    'EVENT_EDIT' : "Modifer",
    'EVENT_DELETE' : "Supprimer",


    'TRACKS_TITLE': "Parcours",
    'TRACKS_ADD_TRACK': "Nouveau parcours",
    'TRACKS_NO_TRACK': "Vous n'avez à ce jour ajouté aucun parcours.",
    'TRACKS_ADD_TITLE': "Ajout d'un parcours",
    'TRACKS_EDIT_TITLE': "Modification d'un parcours",

    'CALENDAR_TITLE' : "Calendrier",

    'SIDEBAR_GALLERIES' : "Photos",
    'GALLERY_TITLE' : "Photos",
    'GALLERY_ADD' : "Ajouter des photos",
    'GALLERY_ADD_TITLE' : "Ajouter une gallerie de photo",
    'GALLERY_NAME' : "Nom de la gallerie",
    'DROP_IMAGES' : "Glisser/déposer ou cliquer ici pour ajouter des photos",
    'LIST_FILES' : "Liste des fichiers",
    'LOADING_ERROR' : 'Une erreur est servenue au chargement des données',
    'EDIT_SUCCESS' : "Modifications enregistrées",
    'ADD_PARTICIPANT_SUCCESS' : "Participant ajouté au kidoikoiaki",
    'KID_ERROR' : "Une erreur de communication avec l'application Kidoikoiaki est survenue",
    'GUEST_UPDATE_SUCCESS' : "Votre statut à été mit à jour",
    'SENDING_ERROR' : "Une erreur est servenue à l'envoi des données",
    'EVENT_ADD_SUCCESS' : "Evénement sauvegardé",
    'USER_ADD_SUCCESS' : "Membre sauvegardé",
    'DATE_ERROR' : "La date de fin doit être après la date de début",
    'HOW_TO_ICAL' : "Pour vous abonner au calendrier, il suffit de vous abonner au lien ci-dessous dans votre calendrier",
    'EVENT_FORM_START_DATE' : "Date de début",
    'EVENT_FORM_END_DATE' : "Date de fin",
    'EVENT_FORM_START_TIME' : "Heure de début",
    'EVENT_FORM_END_TIME' : "Heure de fin",
    'CANCEL' : "Annuler",
    'EVENT_DETAILS' : "Détails",
    'EVENT_GUEST' : "Participants",
    'EVENT_YES' : "Participe",
    'EVENT_NO' : "Ne participe pas",
    'PARTICIPANT_STATUS' : "Statut",
    'EVENT_FORM_SITE' : "Site internet",
    'EVENT_FORM_PROGRAM' : "Programme",
    'EMAIL_ERROR': "L'adresse e-mail renseignée est déjà associée à un autre compte.",
    'IMAGE_AVATAR' : "L'avatar du membre doit être une image."


  });
