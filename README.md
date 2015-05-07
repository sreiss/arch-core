# Arch Core

[Wiki](https://github.com/sreiss/arch-core/wiki) | [Arch Carto](https://github.com/sreiss/arch-carto) | [Arch Website](https://github.com/sreiss/arch-website) | [Arch Kidoikoiaki](https://github.com/sreiss/arch-kidoikoiaki) | [Arch CAS](https://github.com/sreiss/arch-cas)

Le wiki sera également sur ce dépôt.

Arch Core contient toute la logique métier liée aux évènements.

Tout est sur le [wiki](https://github.com/sreiss/arch-core/wiki).



#### Gestion des événements

Il existe 5 catégories d'événements: officialRun, personalTraining, training, discovery et event. Ces 5 catégories se partagent 9 champs identiques: leur catégorie et 7 autres correspondant aux champs utilisés pour générer un fichier ics (icalendar): dtstart (date de début), dtend (date de fin), summary (titre de l'événement), location (lieu de l'événement), description (description de l'événement), transp (visibilité de l'événement) et sequence (nombre de màj). Le neuvième champ correspond à la liste des participants couplé avec leur statut.

En plus de ces 9 champs communs, certains événements en possèdent d'autres en plus. Voici la liste des catégories avec leurs champs respectifs:

La catégorie "event" est composé de:
  - "dtstart" de type Date,
  - "dtend" de type Date,
  - "summary" de type String,
  - location de type String,
  - "description" de type String,
  - "transp" de type String,
  - "sequence" de type Integer,
  - "category" de type String (correspond à l'un des 5 types d'événements, "event" ici),
  - "participants" de type User couplé avec son "status" de type String (comme pour les participants à un kidoikoi et leur(s) part(s))(il peut y en avoir plusieurs)

La catégorie "discovery" est composé des exacts même champs que "event" avec en plus le champ:
  - "course" de type Course (il s'agit d'une référence à un parcours du plugin cartho et non à un officialRun)

La catégorie "training" est composé des exacts même champs que "event" avec en plus les champs:
  - "program" de type String,
  - "runs" de type OfficialRun (il peut y en avoir plusieurs),
  - "course" de type Course (il s'agit d'une référence à un parcours du plugin cartho et non à un officialRun)

La catégorie "officialRun" est composé des exacts même champs que "event" avec en plus les champs:
  - "website" de type String,
  - "informations" de type String,
  - "trainings" de type Training (il peut y en avoir plusieurs),
  - "course" de type Course (il s'agit d'une référence à un parcours du plugin cartho et non à un officialRun)

La catégorie "personalTraining" est composé des exacts même champs que "event" avec en plus les champs:
  - "course" de type Course (il s'agit d'une référence à un parcours du plugin cartho et non à un officialRun)
  - "creator" de type User (champ masqué qui sera remplit avec l'utilisateur créant l'événement)

Toutes ces catégories sont représentées dans un même model qui est composé de tous les champs. Suivant la catégorie de l'événement, certains de ces champs seront donc remplit tandis que d'autres seront ignorés.


### Routes

Les URL pour ajouter/supprimer/récupérer un événement sont crées de la manière suivante: /events/type événement/(id)
Pour créer un training (POST) ou récupèrer l'ensemble des trainings (GET) par exemple, l'url sera: /events/training, pour récupérer (GET) ou supprimer le training (POST) d'id 84322: /events/training/84322

* Catégories
  * POST /events/category : ajout d'une catégorie
    * name : nom de la categ
    * label : label de la categ
    * description : description de la categ
  * DELETE /events/category/:idcateg : suppresion d'une catégorie
  * GET /events/category/:idcateg : récupération d'une catégorie
  * GET /event/category/ : récupération de l'ensemble des catégories

* Evénements
  * POST /events/event : ajout d'un événement
    * dtstart
    * dtend
    * summary
    * location
    * description
    * transp
    * sequence
    * category
    * participants : tableau d'objet
      * guest
      * status
    * course
    * website
    * information
    * trainings : tableau d'objet
      * training
    * creator
    * program
    * runs : tableau d'objet
      * run
  * DELETE /events/event/:idevent : suppresion d'un événement
  * GET /events/event/:idevent : récupération d'un événement
  * GET /event/event/ : récupération de l'ensemble des événements

  * Exemple de JSON
    * Pour créer une categ
      {
         "name": "Training",
         "label": "training",
         "description": "entrainement"
       }
    * Pour créer une event avec des objectid bidons sinon ça marche pas (problème à régler)
      {
       "dtstart": "10/05/2015",
       "dtend": "11/05/2015",
       "summary": "testevent",
       "location": "colmar",
       "description": "test",
       "transp" : "idk",
       "sequence" : "0",
       "category": "5547a7bfbe6fe65c144d2d6d",
       "participants": [{"guest":"5547a7bfbe6fe65c144d2d6d", "status":"pd"}],
       "course": "",
       "website": "",
       "information": "",
       "trainings": [{"training":"5547a7bfbe6fe65c144d2d6d"}],
       "creator": "5547a7bfbe6fe65c144d2d6d",
       "program": "",
       "runs": [{"run":"5547a7bfbe6fe65c144d2d6d"}]
      }
