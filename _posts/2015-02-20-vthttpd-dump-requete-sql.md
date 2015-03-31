---
layout: post
title: vthttpd -dump et requêtes SQL 
date: 2015-02-20 22:40
author: Thomas ASNAR
categories: [vthttpd, dump,SQL, Visual TOM, VTOM]
---
Une autre astuce avec le Webaccess VTOM vthttpd : on peut dump tout le contenu en un fichier exploitable par SQLITE !

Voici un petit exemple :

```
vthttpd -dump /var/tmp/vthttpd.dat
sqlite3 /var/tmp/vthttpd.dat
>
.tables;
pragma table_info(JOBS);
pragma table_info(HOSTS);
.schema JOBS;
select JOBS.NAME,HOSTS.NAME from JOBS left join HOSTS on JOBS.HOST_SID = HOSTS.HOST_SID ;
```
