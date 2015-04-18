# Arch Core

[Wiki](https://github.com/sreiss/arch-core/wiki) | [Arch Carto](https://github.com/sreiss/arch-carto) | [Arch Website](https://github.com/sreiss/arch-website) | [Arch Kidoikoiaki](https://github.com/sreiss/arch-kidoikoiaki) | [Arch CAS](https://github.com/sreiss/arch-cas)

Le wiki sera également sur ce dépôt.

Arch Core contient toute la logique métier liée aux évènements.

Tout est sur le [wiki](https://github.com/sreiss/arch-core/wiki).



# Gestion des événements

Il existe 5 types d'événements: officialRun, personalTraining, training, discovery et event. Ces 5 types se partagent 9 champs identiques: leur catégorie (=type) et 7 autres correspondant aux champs utilisés pour générer un fichier ics (icalendar): dtstart (date de début), dtend (date de fin), summary (titre de l'événement), location (lieu de l'événement), description (description de l'événement), transp (???) et sequence (nombre de màj). Le neuvième champ correspond à la liste des participants couplé avec leur statut.

En plus de ces 9 champs communs, certains événements en possèdent d'autres en plus. Voici la liste des types avec leurs champs respectifs:

Le type "event" est composé de:
  - "dtstart" de type Date,
  - "dtend" de type Date,
  - "summary" de type String,
  - location de type String,
  - "description" de type String,
  - "transp" de type String,
  - "sequence" de type String,
  - "category" de type String (correspond à l'un des 5 types d'événements, "event" ici),
  - "participants" de type User couplé avec son "status" de type String (comme pour les participants à un kidoikoi et leur(s) part(s))(il peut y en avoir plusieurs)

Le type "discovery" est composé des exacts même champs que "event" avec en plus le champ:
  - "course" de type Course (il s'agit d'une référence à un parcours du plugin cartho et non à un officialRun)

Le type "training" est composé des exacts même champs que "event" avec en plus les champs:
  - "program" de type String,
  - "runs" de type OfficialRun (il peut y en avoir plusieurs),
  - "course" de type Course (il s'agit d'une référence à un parcours du plugin cartho et non à un officialRun)

Le type "officialRun" est composé des exacts même champs que "event" avec en plus les champs:
  - "website" de type String,
  - "informations" de type String,
  - "trainings" de type Training (il peut y en avoir plusieurs),
  - "course" de type Course (il s'agit d'une référence à un parcours du plugin cartho et non à un officialRun)

Le type "personalTraining" est composé des exacts même champs que "event" avec en plus les champs:
  - "course" de type Course (il s'agit d'une référence à un parcours du plugin cartho et non à un officialRun)
  - "creator" de type User (champ masqué qui sera remplit avec l'utilisateur créant l'événement)


Les URL pour ajouter/supprimer/récupérer un événement sont crées de la manière suivante: /events/<type événement>/(:id)
Pour créer un training par exemple, l'url sera: /events/training, pour récupérer ou supprimer le training d'id 84322: /events/training/84322
