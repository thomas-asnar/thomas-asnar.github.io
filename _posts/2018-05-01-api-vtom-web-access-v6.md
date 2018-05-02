---
layout: post
title: API VTOM webaccess (update)
date: 2018-05-01 20:00:00
author: Thomas ASNAR
categories: [API, webaccess, Visual TOM, VTOM]
---
Petite update du [1 er post API VTOM via le WebAccess ici](/api-vtom-web-access).

## Rappels importants sur le portail web et les API

* Côté serveur : Démarrez le service `vthttpd` et tapez `vtping` pour voir son état et son port. (le port est défini dans `/etc/services`). Le démarrage automatique peut être décommenté du script `$TOM_ADMIN/start_servers`
* Côté client : Interface web type client léger afin d'explorer, piloter, et suivre l'exploitation d'un serveur VTOM. Rendez-vous sur l'url http://&lt;nomdevotreserveur ou sonIP&gt;:&lt;port&gt; et authentifiez-vous.
* Ouvrez votre navigateur Chrome F12 et allez dans l’onglet Network pour voir les appels aux API. Baladez dans les menus du portail web et glannez les différentes adresses et requêtes XHR.
* Les APIs ne sont pas soutenues pas Absyss pour le moment (ni documentées). Vous pouvez les utiliser mais on ne vous fournira aucune aide, assistance, ou débuggage d'après moi.
* Requêter : 
  * Rajouter dans le header des requêtes le user:mdp en base64 (voir mon premier post pour les détails) : ex. pour une XMLHttpRequest `xhr.setRequestHeader('Authorization', 'Basic VE9NOlRPTQ==')`
  * En local depuis le même serveur VTOM, les appels directs XMLHttpRequest Chrome passent sans soucis. En revanche, je n'ai pas réussi à faire fonctionner depuis un autre domaine (à cause du Cross-origin resource sharing - [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS))
  * sinon les appels en back-end fonctionnent très bien de n'importe où : `curl`, `node js`, `php` etc. 

Exemple avec NodeJS

```node
// ./vtom-api-client.js
const rp = require('request-promise-native')

module.exports = class VtomApiClient {
    constructor(url, token, options) {
        this.url = url
        this.token = token
        this.options = options || {}
    }
    
    getJob(env, app, job){
        return this._request('GET',
        "/api/job/list?"+
            "environmentName="+env+
            "&applicationName="+app+
            "&name="+job
        )
    }

    _buildOptions(method, endpoint, data) {
        return {
            method: method,
            uri: this.url + endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token ? `Basic ${this.token}` : undefined,
            },
            body: data,
            json: true,
            strictSSL: this.options.strictSSL,
        };
    }

    _request(method, endpoint, data) {
        const options = this._buildOptions(method, endpoint, data);
        //console.log(options);
        return rp(options);
    }
};
```

```node
// ./server.js 
// (...)
const VtomApiClient = require('./vtom-api-client.js')
const makeBasicToken = (user,password) => {
  return Buffer.from(
    user+":"+Buffer.from(password, 'base64').toString('ascii')
  ).toString('base64')
}
let monVtomApiClient = new VtomApiClient(
  Config.vthttpd[domaine].url,
  makeBasicToken(Config.vthttpd[domaine].user,Config.vthttpd[domaine].password),
  {strictSSL: false}
)
// (...)
monVtomApiClient.getJob(Jalon.env,Jalon.app,Jalon.job)
            .then(data => {
              // data resultat de la requête API webaccess
              io.emit('updateAllStatus', data)
            })
            .catch((e) => console.log('Error: ' + e))
// (...)
```

## La grosse nouveauté que j'attendais !

Le Suivi en temps réel du WebAccess était pas trop mal pour avoir les statuts en temps réel sur VTOM. Malheureusement, on était limité à 1000 jobs dans la requête (très peu donc). Bref, ça n'allait pas. 

Maintenant, on a une nouvelle fonctionnalité depuis la v6.2, le "Suivi d'exploitation". On peut filtrer par env, app, ou job. C'est excellent. On a tout ce qu'il faut pour un suivi météo : vtbegin, vtend, status etc.

Voici un exemple (notez qu'on n'est pas obligé de mettre les noms en entier, genre de LIKE %) : 

```
/api/suiviExploit?environmentName=thom&name=te
```

Et une capture d'écran :

![Suivi d'exploitation VTOM WebAccess API](/wp-content/uploads/suivi_exploitation_webaccess.png)
