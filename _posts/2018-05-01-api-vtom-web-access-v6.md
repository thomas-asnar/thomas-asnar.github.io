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
* Ouvrez votre navigateur Chrome F12 et allez dans l’onglet Network pour voir les appels aux API. Baladez vous sur l’interface Web du web access et glannez les différentes adresses et requêtes XHR.
* Les APIs ne sont pas soutenues pas Absyss pour le moment (ni documentées). Vous pouvez les utiliser mais on ne vous fournira aucune aide, assistance, ou débuggage d'après moi.
* Requêter : 
  * Rajouter dans le header des requêtes le user:mdp en base64 (voir mon premier post pour les détails) : ex. pour une XMLHttpRequest `xhr.setRequestHeader('Authorization', 'Basic VE9NOlRPTQ==')`
  * En local depuis le même serveur VTOM, les appels directs XMLHttpRequest Chrome passent sans soucis. En revanche, je n'ai pas réussi à faire fonctionner depuis un autre domaine (à cause du Cross-origin resource sharing - [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS))
  * sinon les appels en back-end fonctionnent très bien de n'importe où : `curl`, `node js`, `php` etc. 

## La grosse nouveauté que j'attendais !

Le Suivi en temps réel du WebAccess était pas trop mal pour avoir les statuts en temps réel sur VTOM. Malheureusement, on était limité à 1000 jobs dans la requête (très peu donc). Bref, ça n'allait pas. 

Maintenant, on a une nouvellLe fonctionnalité depuis la v6.2, le "Suivi d'exploitation". On peut filtrer par env, app, ou job. C'est excellent, on a tout ce qu'il faut pour un suivi météo : vtbegin, vtend, status etc.

Voici un exemple (notez qu'on n'est pas obligé de mettre les noms en entier, genre de LIKE %) : 

```
/api/suiviExploit?environmentName=thom&name=te
```

Et une capture d'écran :

![Suivi d'exploitation VTOM WebAccess API](/wp-content/uploads/suivi_exploitation.png)
