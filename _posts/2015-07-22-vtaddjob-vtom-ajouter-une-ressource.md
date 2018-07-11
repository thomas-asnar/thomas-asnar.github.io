---
layout: post
title: VTOM ajouter une ressource en mode commande 
date: 2015-07-22 23:40
author: Thomas ASNAR
comments: true
categories: [vtom, vtaddjob, ressource vtom]
---
Le vthelp vtaddjob n'est pas très intuitif.
Voici un exmple pour rajouter (+) une ressource texte VTOM avec les options d'attente indéfiniment.

`vtaddjob /nom=env/app/job /script='monscript' /res="+nom_ressource = OK [attend==oui jusqu'a==Illimité]"`


 * Modifier (~) une ressource de type poids en ligne de commande avec libération

`vtaddapp /nom=$ITEM_VTOM /Res="~${ITEM_VTOM_RES} ! 1 [attend==oui jusqu'a==Illimité liberation==oui]"`


exemple de changement de masse sur des jobs. Retrait d'une ressource poids et ajout d'une autre (prend 1, libère et attente illimité) :

```
tlist jobs -f MONENV | egrep -i "UNPATTERN.*I2" | awk '{printf"vtaddjob /nom=%s/%s/%s /res=\"-P_ENV_00_PARAOAG P, +P_ENV_00_PARAING ! 1 [attend==oui jusqu'"'"'a==Illimite liberation==oui]\"\n",$1,$2,$3}'
# donne
vtaddjob /nom=MONENV/UNEAPP/UNPATTERNXXXI2 /res="-P_ENV_00_PARAOAG P, +P_ENV_00_PARAING ! 1 [attend==oui jusqu'a==Illimite liberation==oui]"
(...)
```
