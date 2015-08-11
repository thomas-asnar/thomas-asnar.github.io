---
layout: post
title: API VTOM webaccess
date: 2015-02-10 20:45
author: Thomas ASNAR
categories: [API, webaccess, Visual TOM, VTOM]
---
Vous n'êtes pas sans savoir que VTOM fournit, depuis quelques versions maintenant, un webaccess (un portail web d'accès à VTOM / vthttpd).

Sur une question de Stephane, je me suis penché sur son fonctionnement.

Voici quelques API VTOM glannées dans les pages du webaccess.

Peu importe comment vous y accédez, ici en curl (user:passwd à changer).

# Liste de tous les environnements
```bash
curl -k -u user:passwd "http://localhost:30080/api/environment/list" -X GET  | python -m json.tool
```

# Liste de toutes les applications
```bash
curl -k -u user:passwd "http://localhost:30080/api/application/list" -X GET  | python -m json.tool
curl -k -u user:passwd "http://localhost:30080/api/application/list?envSId=ENV7f00000102a3106054b8e57700000014" -X GET  | python -m json.tool
curl -k -u user:passwd "http://localhost:30080/api/application/list?environmentName=VAGUE5_INT" -X GET  | python -m json.tool
```

# Liste de tous les jobs
```bash
curl -k -u user:passwd "http://localhost:30080/api/job/list" -X GET  | python -m json.tool
curl -k -u user:passwd "http://localhost:30080/api/job/list?appSId=APP7f00000129a98189539f1cb000000023" -X GET  | python -m json.tool
curl -k -u user:passwd "http://localhost:30080/api/job/list?applicationName=BASCULE_DATE" -X GET  | python -m json.tool
```

# Détails d'un job
```bash
curl -k -u user:passwd "http://localhost:30080/api/job/getById?id=JOB7f0000012b10ca88539f1cb4000000c2" -X GET  | python -m json.tool
```

# Détails de tous les jobs (ou autres items)
```bash
curl -k -u user:passwd "http://localhost:30080/api/job/getAll" -X GET  | python -m json.tool
```

## Exemple de résultat 
```json
{
    "rc": 0, 
    "result": {
        "ExpectedContexts": [], 
        "ExpectedResources": [], 
        "Script": "D:\\Script\\rotation_log_dxserver\\Rotate_log_dxserver.bat", 
        "appInErr": "1", 
        "applicationSId": "APP7f00000129a98189539f1cb000000023", 
        "blockDate": "0", 
        "cycle": "00:00:00", 
        "cycleEnabled": "0", 
        "descOnErr": "0", 
        "exploited": "E", 
        "frequency": "D", 
        "id": "JOB7f0000012b10ca88539f1cb4000000c2", 
        "information": " ", 
        "isAsked": "0", 
        "maxStart": "37:59:00", 
        "minStart": "25:30:00", 
        "mode": "E", 
        "movementTime": "0", 
        "name": "ROT_LOG_DXSERVER", 
        "onDemand": "0", 
        "restartCount": "0", 
        "restartLabel": "0", 
        "restartMax": "1", 
        "restartType": "M", 
        "retained": "0", 
        "retcode": "-1", 
        "status": "W", 
        "timeBegin": "1421112600", 
        "timeEnd": "1421112630", 
        "xid": "JOBc2"
    }
}
```
On a vérifié avec Stephane, les attributs sont hiérarchisés comme dans le vtexport xml (si pas dans Job, on remonte dans Application, si pas dans Application, on remonte sur Environnement).

# carrément le contenu du script !!!
```bash
curl -k -u user:passwd "http://localhost:30080/api/job/getScript?id=JOB7f0000012b10ca88539f1cb4000000c2"  -X GET  | python -m json.tool
```

# Liste des Logs (utiliser le job xid et non l'id tout court)
```bash
curl -k -u user:passwd "http://localhost:30080/api/log/getLogList?id=JOBc2"  -X GET  | python -m json.tool
```

# Si je résume :
```
Pour avoir toutes les informations détaillées d'un ensemble d'items (environment, application, job, date, host etc)
http://localhost:30080/api/<item>/getAll

Pour avoir toute la liste d'un ensemble d'items mais avec moins de détails 
http://localhost:30080/api/<item>/list

Pour avoir le détail d'un item en particulier
http://localhost:30080/api/<item>/getById?id=<id>

Pour filtrer la liste d'un ensemble d'item sur un attribut particulier
http://localhost:30080/api/<item>/list?<attribut>=<valeur>

Si l'attribut n'est pas présent dans l'item le plus bas (job), il faut remonter d'un cran (application) et encore d'un cran si besoin (environment). Notion de hiérarchie, notamment pour les dates, host, queue, user.
```

# Petite astuce côté client pour effectuer une request REST sur l'api VTOM sans utiliser jQuery
```javascript
var serveurVtom = "http://monserveurvtom:30080" ;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
      var status = xhr.status;

      if (status == 200) {
        
        if(xhr.response != null) {
                // toute la réponse avec les columns et les rows
                console.log( xhr.response ) ;
                // on récupère le nom par exemple et on l'affiche dans la console
                xhr.response.result.rows.forEach(function(entry){
                        console.log(entry.name);
                });
        }
        
      } else {
        console.log("error");
        console.log(status);
      }
}
xhr.open('GET', serveurVtom + '/api/job/list');
xhr.responseType = 'json';

// attention sous unix echo "user:passwdord" | base64 interprète le saut de ligne du echo et vous donne une mauvaise authentification
// il faut utiliser l'option -n, echo -n "user:password" | base64
// on peut utiliser un encodage base64 via javascript directement mais dans ce cas le user:mdp est en clair dans le code
xhr.setRequestHeader('Authorization', 'Basic dGFzbmFyOlZ0MG0xbkB0MHI=');
xhr.send();
```
[Un exemple pour lister tous les jobs, il faut changer l'ip, le port et encoder le user:password](/wp-content/uploads/list_all_jobs.html)
