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
