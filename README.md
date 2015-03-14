# Arch-Core

## server

Tout d'abord, voici l'arboresence du coeur applicatif.

```
server/
├── config
│   └── config.json
├── core
│   ├── lib
│   │   ├── db
│   │   │   ├── db.js
│   │   │   └── types.js
│   │   ├── loaders
│   │   │   ├── controllersLoader.js
│   │   │   ├── middlewaresLoader.js
│   │   │   ├── modelsLoader.js
│   │   │   ├── pluginLoader.js
│   │   │   ├── routesLoader.js
│   │   │   └── servicesLoader.js
│   │   ├── oauth
│   │   │   ├── oauth.js
│   │   │   └── oauthModels.js
│   │   ├── config.js
│   │   ├── expressApp.js
│   │   ├── loader.js
│   │   ├── server.js
│   │   └── utils.js
│   ├── public
│   │   └── stylesheets
│   │       └── style.css
│   ├── views
│   │   ├── error.jade
│   │   └── layout.jade
│   └── app.js
├── package.json
└── plugins
    ├── events
    │   ├── controllers
    │   │   ├── event.js
    │   │   └── guest.js
    │   ├── middlewares
    │   │   ├── event.js
    │   │   └── guest.js
    │   ├── models
    │   │   ├── event.js
    │   │   └── guest.js
    │   ├── plugin.js
    │   ├── routes
    │   │   ├── event.js
    │   │   └── guest.js
    │   └── services
    │       ├── eventService.js
    │       └── guestService.js
    └── users
	├── controllers
	│   └── user.js
	├── middlewares
	│   └── user.js
	├── models
	│   ├── user.js
	│   └── signuptype.js
	├── plugin.js
    	├── routes
    	│   ├── users.js
        └── services
            ├── userService.js
            └── signuptypeService.js
```

Je ne vais pas passer en détail sur tous les dossiers du coeur. Les plugins, quand à eux seront les moteurs de l'application. Il se composeront de différentes parties que je vais exposer.

### Premiers pas

Avant de pouvoir utiliser Arch-Core, quelques action doivent être exécutées :

1. Se rendre dans **arch-core** et exécuter la commande : ```nmp install```.
2. Lancer MongoDB. Pour cela, il faut se rendre dans le dossier **bin** de votre installation de MongoDB et exécuter la commande : ```./mongod --dbpath <data>``` où **<data>** correspond au dossier où vous souhaitez stocker la base de données de l'application.

### Plugins

#### middlewares

Il est a présent possible d'injecter des middlewares en donnant leur nom dans des routes ! Mais à quoi servent les middlewares ? Et bien, à vérifier les données avant de les envoyer au controller par exemple, ou authentifier un utilisateur ! Voyez les comme les filtres de JEE. Voici un exemple de middleware "consoleMessageMiddleware" :
```javascript
// plugins/*/middlewares/consoleMessageMiddleware
module.exports = function(eventService, userService) {

    return {
        writeMessage: function(req, res, next) {
            console.log('Un middleware qui écrit un message dans la console');
            // TRES important, ne jamais l'oublier ! Sinon, on rompt la chaine de middlewares.
            next();
        }
    };

};

```
Et son utilisation sur les routes :
```javascript

module.exports = function(aController, aRouter, consoleMessageMiddleware) {

    // De cette façon, l'accès en get ou en post affichera un message dans la console
    aRouter.route('/')
        .all(consoleMessageMiddleware.writeMessage)
        .get(aController.getMethod)
        .post(aController.postMethod);
    
    // Ici en revanche, seule la route get affichera un message.
    aRouter.route('/details')
        .get(consoleMessageMiddleware.writeMessage, aController.getDetailsMethod)
        .post(aController.postDetailsMethod);

};
```

#### plugin

Un nouveau fichier fait son apparition dans l'arborescence d'un plugin : plugin.js. Ce dernier contiendra les dépendance avec d'autres plugins.
```javascript
// plugins/events/plugin.js

module.exports = {
    dependencies: ['users']
};
```
De cette façon, vous pourez injecter les services du plugin "users" dans les services du plugin "events". Si un service de "users" porte le même nom qu'un service de "events", le service de events sera injecté dans le plugin events. De façon générale, les services du plugin courant seront toujours prioritaires par rapport aux services d'un autre plugin.

#### controllers

Les controllers correspondent aux actions attachées au routes sous Express. Il reçoivent donc les même paramètres, la requête http dans **req** et la réponse dans **res**.

```javascript
// plugins/events/controllers/event.js 

module.exports = function(eventService) {
    return {
        getEvents: function (req, res) {
            var events = eventService.getEventGuests();
            res.json(events);
        },
        getDetails: function (req, res) {
            res.json('details');
        }
    }
};
```

Le bon service est passé au controller qui prendra comme seul argument ce dernier.

#### models

C'est ici que vous pourrez placer vos modèles de données. Ces derniers sont basés sur [Mongoose](http://mongoosejs.com/docs/schematypes.html). Vous n'aurez qu'à déclarer la structure du Schema comme dans l'example suivant.

Pour suivre la convention mongoose, le modèle sera appelé dans les services avec une majuscule. (e.g. **Event**).

Le paramètre **Types** ne contient rien d'autre que les types de Mongoose. Par soucis de flexibilité et pour wrapper les modèles, ce paramètre est passé (vous noterez aussi l'absence de "require" :)).
```javascript
// plugins/users/models/user.js

module.exports = function(Types) {
    return {
        schema: {
            fname: {type: String, required: true},
            lname: {type: String, required: true},
            role: {type: String, required: true},
            email: {type: String, required: true},
            password: {type: String, required: true},
            lastConnexion: String,
            lastIp: String,
            signupType: {type: Types.ObjectId, ref: 'signuptype'},
            profile: {type: Types.ObjectId, ref: 'Profile'},
            block: {type: Boolean, default: false},
            created: {type: Date, default: Date.now, required: true},
            createdBy: {type: Types.ObjectId, ref: 'User', required: true},
            modified: Date,
            modifiedBy: {type: Types.ObjectId, ref: 'User'},
            archived: Date,
            archivedBy: {type: Types.ObjectId, ref: 'User'},
            published: {type: Number, default: 1}
        },
        onSchemaReady: function(schema) {
            // Attacher ici des méthodes au schéma (voir doc de mongoose: http://mongoosejs.com/docs/guide.html)
            // Typiquement
            // Inspiré de http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
            schema.methods.verifyPassword = function(password, cb) {
                // Vérification du mot de passe
            };
            
            // Hook avec méthode exécuté avant chaque sauvegarde
            schema.pre('save', function(callback) {
                // Vérification de l'user, de son mot de passe...
            });
        }
    };
};
```

#### routes

Les routes sont simplement des routes Express et reçoivent en paramètre le controller qui leur est associé et le router.

```javascript
// eventController correspond à plugins/events/controllers/event.js

module.exports = function(eventController, eventRouter) {

    // This route will be available under /events/event/

    eventRouter.route('/')
        .get(eventController.getEvents);

    // This route will be available under /events/event/details

    eventRouter.route('/details')
        .get(eventController.getDetails);

};
```

#### services

Probablement une des parties les plus importantes de l'application. Il est possible d'injecter d'autres services et modèles dans le service juste en donnant leur nom.

```javascript
// plugins/events/services/eventService.js

// userService, guestService et le modèle Event sont injectés en donnant leur nom.

module.exports = function(userService, guestService, Event) {
    return {
        getEvents: function () {
            return userService.getUser();
        },
        getEventGuests: function () {
            var guests = guestService.getGuests();
            return guests;
        }
    };
};

```

# KeystoneJS
Pour installer KeystoneJS, il vous faudra :

1. installer MongoDB.
2. vous rendre dans le dossier "/bin" de MongoDB et exécuter la commande "./mongod --dbpath <votre-dossier-de-stockage>". Ce chemin vous permettra en fait de créer un magasin spécial pour ArchTailors par exemple.
3. Une fois MongoDB lancé avec "mongod", rendez vous dans le dossier de KeystoneJS ("src/website") et tapez la commande "node keystone".
4. Si tout va bien, vous venez de lancer Keystone sur le port 3000 de votre localhost.
5. Sinon, l'erreur de configuration de cloudinary est a regle soit avec la creation d'un compte(https://cloudinary.com/users/register/free). Soit rajouter cette ligne dans keystone.js:
keystone.set('cloudinary config', { cloud_name: 'dfcalfikm', api_key: '178696354252521', api_secret: 'SnJ_GLS9jtAjxUJbfZC4n1lnTEw' });
6. Autre possibilité d'erreur de dependance a régler en lancant un npm install dans le dossier website.

## OAuth - Authentification

### Enregistrement du client

Au lancement de l'application, celle-ci va vérifier si dans ses coockies elle dispose d'un élément clientId et clientSecret. Si oui, cela signifie qu'elle a déjà été enregistrée auprès du serveur d'authentification. Dans le cas contraire, celle-ci doit s'enregistrer grâce aux paramètres suivant :

* URL : POST /oauth/oauth/client
  * name : "ASCPA" (1)
  * redirect_uri : "http://www.ascpa.fr" (2)

```
{
    "message": "Client saved successfully.",
    "data": {
        "__v": 0,
        "clientSecret": "6815fd98a6d1ec8bdf96195e9cd6979af1778e3a",
        "clientId": "ASCPA_1426177377479_4342",
        "_id": "5501bd61f38f8d2545508701"
    }
}
```

(1) Il s'agit du nom de l'application cliente enregistré dans la configuration.
(2) Il s'agit de l'URL vers laquelle le serveur d'authentification va rediriger l'utilisateur après connexion.

Il est possible de re-consulter ses informations en pointant vers l'URL : GET /oauth/oauth/client/:clientId/:clientSecret.

### Enregistrement de l'utilisateur

La totalité des utilisateurs vont être centralités dans la base du données du serveur d'authentification. Il faut donc au préalable créer un compte au nouveau utilisateur à cet endroit. Pour se faire, il faut utiliser les paramètres suivant :

* URL : POST /oauth/oauth/user
  * username : "email@email.fr"
  * firstname : "First Name"
  * lastname : "Last Name"
  * email : "email@email.fr" 

```
{
    "message": "User saved successfully.",
    "data": {
        "__v": 0,
        "lastname": "Last Name",
        "firstname": "First Name",
        "username": "email@email.fr",
        "_id": "5501bc26f38f8d2545508700",
        "email": "email@email.fr"
    }
}
```

Grâce à cet ObjectId, il va vous être possible d'enregistrer les informations complémentaires de ces utilisateurs (profil ASCPA, profil carto, etc) dans les diverses bases de données. Grâce à la jointure des informations on aura les informations de connexions et du profil.

### Récupération des tokens

#### Authentification par mot de passe

L'application cliente va s'occuper de vérifier si elle dispose d'un access_token et d'un refresh_token dans ses coockies lorsque l'utilisateur souhaite accéder à une ressource privée. Si ce n'est pas le cas, il va falloir faire une demande au serveur d'authentification en spécifiant les informations suivantes :

* Header : 
  * Authorization : Basic clientId:clientSecret (3)
* URL : POST /oauth/oauth/token
  * grant_type : "password"
  * username : "email@email.fr"
  * password : "mon_mot_de_passe"

```
{
    "token_type": "bearer",
    "access_token": "4b20cbf0e8e6ab57085ba719b818abe8e486300f",
    "expires_in": 3600,
    "refresh_token": "a9d00845f22e60ef72950951db790a7a72f8371d"
}
```

Le serveur d'authentification va dans un premier temps récupérer les informations du client et vérifier son existante. Suite à cela, il va vérifier l'existance de l'utilisateur utilisant ce couple username/password. On va donc récupérer un access_token qui doit être stocké et renvoyé à chaque accès à une ressource privée. Lorsque l'access_token arrive à expiration, on va pouvoir en re-demander un nouveau en utilisant refresh_token, sans avoir à demander l'utilisateur de resaisir ses identifiants.

(3) Le couple clientId:clientSecret doit être encodé en base64.

#### Authentification par token

* Header : 
  * Authorization : Basic clientId:clientSecret*
* URL : POST /oauth/oauth/token
  * grant_type : "refresh_token"
  * refresh_token : "a9d00845f22e60ef72950951db790a7a72f8371d"

On va récupérer un objet similaire à l'authentification par mot de passe avec un nouveau access_token ainsi qu'un nouveau refresh_token.



