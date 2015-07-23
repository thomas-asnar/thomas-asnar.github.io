---
layout: post
title: vthttpd -dump et requêtes SQL 
date: 2015-07-23 22:40
author: Thomas ASNAR
categories: [vthttpd, dump,SQL, Visual TOM, VTOM]
---
Une autre astuce avec le Webaccess VTOM vthttpd : on peut dump tout le contenu en un fichier exploitable par SQLITE !

Voici un petit exemple :

```
vthttpd -dump /var/tmp/vthttpd.dat
sqlite3 /var/tmp/vthttpd.dat
>
.tables  -- liste toutes les tables
pragma table_info(JOBS) ; -- liste les champs de la table JOBS
.schema JOBS ; -- idem mais avec le type de la colonne (varchar(35) par ex.)
```

On peut par exemple lister tous les jobs avec quelques propriétés importantes. On le script dans un fichier .sql :

```sql
select e.NAME, a.NAME, j.NAME, j.SCRIPT, h.NAME, u.NAME, q.NAME, d.NAME

from jobs j

left join applications a on j.APP_SID = a.APP_SID

left join environments e on a.ENV_SID = e.ENV_SID

left join hosts h on j.HOST_SID = h.HOST_SID or (ifnull(j.HOST_SID,'') = '' and ( a.HOST_SID = h.HOST_SID or (ifnull(a.HOST_SID,'') = '' and e.HOST_SID = h.HOST_SID) ) )

left join users u on j.USER_SID = u.USER_SID or (ifnull(j.USER_SID,'') = '' and ( a.USER_SID = u.USER_SID or (ifnull(a.USER_SID,'') = '' and e.USER_SID = u.USER_SID) ) )

left join queues q on j.QUEUE_SID = q.QUEUE_SID or (ifnull(j.QUEUE_SID,'') = '' and ( a.QUEUE_SID = q.QUEUE_SID or (ifnull(a.QUEUE_SID,'') = '' and e.QUEUE_SID = q.QUEUE_SID) ) )

left join dates d on j.DATE_SID = d.DATE_SID or (ifnull(j.DATE_SID,'') = '' and ( a.DATE_SID = d.DATE_SID or (ifnull(a.DATE_SID,'') = '' and e.DATE_SID = d.DATE_SID) ) 

;
```

On peut exécuter un script .sql :

```bash
sqlite3 /var/tmp/vthttpd.dat < /var/tmp/monfichier.sql
```

Et on grep sur ce qu'on souhaite

(je cherche comment requêter les paramètres si quelqu'un est doué en langage SQL !)
