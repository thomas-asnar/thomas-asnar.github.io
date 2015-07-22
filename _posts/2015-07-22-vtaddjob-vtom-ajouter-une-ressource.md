---
layout: post
title: VTOM ajouter une ressource en mode commande 
date: 2015-07-22 23:40
author: Thomas ASNAR
comments: true
categories: [vtom, vtaddjob, ressource vtom]
---
Le vthelp vtaddjob est pourtant assez clair, n'empêche que ça n'est pas très intuitif.
Voici un exmple pour rajouter une ressource texte VTOM avec les options d'attente indéfiniment.

`vtaddjob /nom=env/app/job /script='monscript' /res="+nom_ressource = OK [attend==oui jusqu'a==Illimité]"`
