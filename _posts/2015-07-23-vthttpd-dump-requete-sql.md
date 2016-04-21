---
layout: post
title: vthttpd -dump et requêtes SQL - tlist ameliore
date: 2015-07-23 17:40
author: Thomas ASNAR
categories: [vthttpd, dump,SQL, Visual TOM, VTOM, tlist]
---
Une autre astuce avec le Webaccess VTOM vthttpd : on peut dump tout le contenu de la base VTOM en un fichier exploitable par SQLITE !

L'utilisation principale est de lister tous les jobs, à la manière d'un `tlist`mais avec beaucoup plus d'informations (dont les paramètres et le script)

Voici un petit exemple :

```
vthttpd -dump /var/tmp/vthttpd.dat
sqlite3 /var/tmp/vthttpd.dat
>
.tables  -- liste toutes les tables
pragma table_info(JOBS) ; -- liste les champs de la table JOBS
.schema JOBS ; -- idem mais avec le type de la colonne (varchar(35) par ex.)
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
# 1er awk, on rajoute des 0 au numéro de paramètre pour pouvoir trier correctement (premier paramètre en premier, etc.)
# 2ème awk, on affiche sur la même ligne tant qu'on a le même jobID
sqlite3 /var/tmp/vthttpd.dat < /var/tmp/all_jobs.sql |  awk 'BEGIN{ FS="|" ; OFS="|" } { l=length($10) ; if(l == 2) { $10="0"$10 ;} ;  if(l == 1){ $10="00"$10 }  ; print}' | sort -g | awk -F "|" 'BEGIN{ job_sid=null;} {if($1 == job_sid){ printf "%s:%s;",$10,$11 }else{ if(job_sid != null){ printf "\n" } ; printf "%s|%s|%s|%s|%s|%s|%s|%s|%s:%s;",$2,$3,$4,$5,$6,$7,$8,$9,$10,$11 } ; job_sid=$1 ;}'
```


Reminder pour moi : consolidation des statistiques VTOM (en attendant que tout soit dans la base postgres, je passe par le vthttpd dump)

```bash
plateforme=up2
vthttpdDat=vthttpd_${plateforme}.dat
allJobsSQL=all_jobs.sql
allJobs1to1=all_jobsSID_1to1Param_${plateforme}.txt
allJobsManyTo1=all_jobsSID_manyTo1Param_${plateforme}.txt
outputStats=stats_${plateforme}
vtsgbdPort=30509
hostFilter=PDECIB10

test -f $vthttpdDat && rm $vthttpdDat
vthttpd -dump $vthttpdDat
sqlite3 $vthttpdDat < $allJobsSQL |  awk 'BEGIN{ FS="|" ; OFS="|" } { l=length($10) ; if(l == 2) { $10="0"$10 ;} ;  if(l == 1){ $10="00"$10 }  ; print}' | sort -g  >  $allJobs1to1

### All jobs manyto1 parameters
awk -F "|" 'BEGIN{ job_sid=null;} {if($1 == job_sid){ printf "|%s",$11 }else{ if(job_sid != null){ printf "\n" } ; printf "%s|%s|%s|%s|%s|%s|%s|%s|%s|%s",$1,$2,$3,$4,$5,$6,$7,$8,$9,$11 } ; job_sid=$1 ;}' $allJobs1to1 | sort > $allJobsManyTo1

# get stats with filters (modify where clauses)   
# select vtobjectsid,vtenvname, vtapplname, vtjobname, vtbegin, (vtend::timestamp - vtbegin::timestamp), vtend, vtexpdatevalue, vthostname, vtusername, vtbqueuename, vtdatename,vtstatus, vterrmess  
~/sgbd/bin/psql -d vtom -p $vtsgbdPort << EOF
\pset tuples_only
\pset footer off
\a
\o $outputStats
select vtobjectsid,vtbegin,(vtend::timestamp - vtbegin::timestamp),vtend,vtexpdatevalue,vtstatus,vterrmess
from vt_stats_job 
where vthostname = '$hostFilter' 
and (vtend::timestamp - vtbegin::timestamp) >= '00:10:00'
order by (vtend::timestamp - vtbegin::timestamp) 
;
EOF
```

Très long avec Awk (beaucoup d'itération :x)

```
awk -v fic=$allJobsManyTo1 'BEGIN{
    OFS="|";FS="|";
    i=0 ;
    while ((getline line < fic ) > 0){
        tAllJobsManyTo1[i]=line ;
        i++ ;
    }
    close (fic) ;
    
}{
    if($1 ~ /^APP/){
      print $0;
      next
    }
    jobSID=$1 ;
    lineStats=$0 ;
    
    for (i in tAllJobsManyTo1){
        split(tAllJobsManyTo1[i],tLine,"|");
   
        if( tLine[1] == jobSID ){
          script=tLine[5] ;
          printf "%s|%s\n",lineStats,script ;
          delete  tAllJobsManyTo1[i] ;
          break; 
        }
    }
    
}' /var/tmp/stats
```


Beaucoup plus rapide avec Pandas - Python :

```python
import pandas

my_cols_csv1 = [ "vtobjectsid","vtbegin","vtduration","vtend","vtexpdatevalue","vtstatus","vterrmess" ]
csv1 = pandas.read_csv('stats_up2',delimiter=r"|",names=my_cols_csv1)
my_cols=["vtobjectsid","env","app","job","script","host","user","queue","vtdatename","param"]
my_cols=my_cols + range(150)
csv2 = pandas.read_csv('all_jobsSID_manyTo1Param_up2.txt',names=my_cols, sep="|")
merge = pandas.merge(csv1,csv2, on='vtobjectsid')
merge.to_csv("output.csv")
```
