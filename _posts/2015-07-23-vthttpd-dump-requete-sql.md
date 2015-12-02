---
layout: post
title: vthttpd -dump et requêtes SQL 
date: 2015-07-23 17:40
author: Thomas ASNAR
categories: [vthttpd, dump,SQL, Visual TOM, VTOM]
---
Une autre astuce avec le Webaccess VTOM vthttpd : on peut dump tout le contenu de la base VTOM en un fichier exploitable par SQLITE !

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
sqlite> select e.NAME, a.NAME, j.NAME, j.SCRIPT, h.NAME, u.NAME, q.NAME, d.NAME
   ...> from jobs j
   ...> left join applications a on j.APP_SID = a.APP_SID
   ...> left join environments e on a.ENV_SID = e.ENV_SID
   ...> left join hosts h on j.HOST_SID = h.HOST_SID or (ifnull(j.HOST_SID,'') = '' and ( a.HOST_SID = h.HOST_SID or (ifnull(a.HOST_SID,'') = '' and e.HOST_SID = h.HOST_SID) ) )
   ...> left join users u on j.USER_SID = u.USER_SID or (ifnull(j.USER_SID,'') = '' and ( a.USER_SID = u.USER_SID or (ifnull(a.USER_SID,'') = '' and e.USER_SID = u.USER_SID) ) )
   ...> left join queues q on j.QUEUE_SID = q.QUEUE_SID or (ifnull(j.QUEUE_SID,'') = '' and ( a.QUEUE_SID = q.QUEUE_SID or (ifnull(a.QUEUE_SID,'') = '' and e.QUEUE_SID = q.QUEUE_SID) ) )
   ...> left join dates d on j.DATE_SID = d.DATE_SID or (ifnull(j.DATE_SID,'') = '' and ( a.DATE_SID = d.DATE_SID or (ifnull(a.DATE_SID,'') = '' and e.DATE_SID = d.DATE_SID) ) ) ;
exploitation|appli_test|job1|jobok.bat|client_local|vtom|queue_wnt|date_exp
exploitation|appli_test|job2|jobok.bat|client_local|vtom|queue_wnt|date_exp
exploitation|appli_test|job3|jobok.bat|client_local|vtom|queue_wnt|date_exp




select j.JOB_SID, e.NAME, a.NAME, j.NAME, j.SCRIPT, h.NAME, u.NAME, q.NAME, d.NAME
from jobs j
left join applications a on j.APP_SID = a.APP_SID
left join environments e on a.ENV_SID = e.ENV_SID
left join hosts h on j.HOST_SID = h.HOST_SID or (ifnull(j.HOST_SID,'') = '' and ( a.HOST_SID = h.HOST_SID or (ifnull(a.HOST_SID,'') = '' and e.HOST_SID = h.HOST_SID) ) )
left join users u on j.USER_SID = u.USER_SID or (ifnull(j.USER_SID,'') = '' and ( a.USER_SID = u.USER_SID or (ifnull(a.USER_SID,'') = '' and e.USER_SID = u.USER_SID) ) )
left join queues q on j.QUEUE_SID = q.QUEUE_SID or (ifnull(j.QUEUE_SID,'') = '' and ( a.QUEUE_SID = q.QUEUE_SID or (ifnull(a.QUEUE_SID,'') = '' and e.QUEUE_SID = q.QUEUE_SID) ) )
left join dates d on j.DATE_SID = d.DATE_SID or (ifnull(j.DATE_SID,'') = '' and ( a.DATE_SID = d.DATE_SID or (ifnull(a.DATE_SID,'') = '' and e.DATE_SID = d.DATE_SID) ) ) ;
```

On peut exécuter un script .sql :

```bash
sqlite3 /var/tmp/vthttpd.dat < /var/tmp/monfichier.sql
```

Et on grep sur ce qu'on souhaite

(je cherche comment requêter les paramètres si quelqu'un est doué en langage SQL !)

edit) alors j'ai trouvé ça mais le problème, c'est que ça me fait une ligne par job et par paramètre (ex. 4 paramètres = 4 lignes du coup)

```sql
select j.JOB_SID, e.NAME, a.NAME, j.NAME, j.SCRIPT, h.NAME, u.NAME, q.NAME, d.NAME, p.POSITION, p.VALUE
from jobs j
left join applications a on j.APP_SID = a.APP_SID
left join environments e on a.ENV_SID = e.ENV_SID
left join hosts h on j.HOST_SID = h.HOST_SID or (ifnull(j.HOST_SID,'') = '' and ( a.HOST_SID = h.HOST_SID or (ifnull(a.HOST_SID,'') = '' and e.HOST_SID = h.HOST_SID) ) )
left join users u on j.USER_SID = u.USER_SID or (ifnull(j.USER_SID,'') = '' and ( a.USER_SID = u.USER_SID or (ifnull(a.USER_SID,'') = '' and e.USER_SID = u.USER_SID) ) )
left join queues q on j.QUEUE_SID = q.QUEUE_SID or (ifnull(j.QUEUE_SID,'') = '' and ( a.QUEUE_SID = q.QUEUE_SID or (ifnull(a.QUEUE_SID,'') = '' and e.QUEUE_SID = q.QUEUE_SID) ) )
left join dates d on j.DATE_SID = d.DATE_SID or (ifnull(j.DATE_SID,'') = '' and ( a.DATE_SID = d.DATE_SID or (ifnull(a.DATE_SID,'') = '' and e.DATE_SID = d.DATE_SID) ) )
left join job_parameters p on j.JOB_SID = p.JOB_SID ;
```

Après, on peut faire assez simplement des recherches avec awk :

```bash
# Exemple : je cherche les jobs qui ont pour paramètre la 3ème position, l'environnement TEST et l'application DATE-RUEIL
sqlite3 /var/tmp/vthttpd.dat < /var/tmp/all_jobs.sql | awk -F"|" '$10 ~ /3/ && $2 ~ /TEST/ && $3 ~ /DATE-RUEIL/ {print}'

# mettre tous les paramètres sur une seule ligne 
sqlite3 /var/tmp/vthttpd.dat < /var/tmp/all_jobs.sql | sort | awk -F "|" 'BEGIN{ job_sid=null;} {if($1 == job_sid){ printf "%s:%s;",$10,$11 }else{ if(job_sid != null){ printf "\n" } ; printf "%s|%s|%s|%s|%s|%s|%s|%s|%s:%s;",$2,$3,$4,$5,$6,$7,$8,$9,$10,$11 } ; job_sid=$1 ;}'
```
