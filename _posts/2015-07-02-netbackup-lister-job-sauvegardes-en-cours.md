---
layout: post
title: Lister les sauvegardes Netbackup en cours 
date: 2015-07-01 21:19
author: Thomas ASNAR
comments: true
categories: [netbackup,jobs, sauvegardes, en cours, shell, commande netbackup, awk, bpdbjobs]
---
Si le champ de la colonne n°3 de la commande netbackup `bpdbjobs -report -most_columns` est inférieur à 3, c'est qu'il y a des sauvegardes en cours, ou en préparation.

```bash
	bpdbjobs -report -most_columns | awk -F"," '{ if( $3 < 3 ){ print } }' 
```
