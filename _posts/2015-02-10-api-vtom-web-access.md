---
layout: post
title: API VTOM webaccess
date: 2015-02-10 20:45
author: Thomas ASNAR
categories: [API, webaccess, Visual TOM, VTOM]
---
Vous n'êtes pas sans savoir que VTOM fournit, depuis quelques versions maintenant, un webaccess (un portail web d'accès à VTOM).

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

# Détail d'un job
```bash
curl -k -u user:passwd "http://localhost:30080/api/job/getById?id=JOB7f0000012b10ca88539f1cb4000000c2" -X GET  | python -m json.tool
```

# carrément le contenu du script !!!
```bash
curl -k -u user:passwd "http://localhost:30080/api/job/getScript?id=JOB7f0000012b10ca88539f1cb4000000c2"  -X GET  | python -m json.tool
```

# Liste des Logs (utiliser le job xid et non l'id tout court)
```bash
curl -k -u user:passwd "http://localhost:30080/api/log/getLogList?id=JOBc2"  -X GET  | python -m json.tool
```