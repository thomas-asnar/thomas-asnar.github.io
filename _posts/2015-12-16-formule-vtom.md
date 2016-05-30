---
layout: post
title: Formules VTOM
date: 2016-05-30 12:00
author: Thomas ASNAR
categories: [ordonnancement, vtom, formule]
---
Je rassemble ici les formules VTOM que je rencontre de temps en temps qui valent le coup d'oeil.

 * Veille du premier jour ouvre mois : By Fred 

```
test{(aujourd'hui=1.jour.ouvr.mois-1.jour.cale) ou (aujourd'hui=dern.jour.cale.mois+1.jour.ouvr-1.jour.cale)}
```

 * Premier Lundi du mois s'il est ouvré, sinon le jour ouvré qui suit : By Serge D.

```
test { (aujourd'hui=prem.lu.cale.mois et aujourd'hui=ouvr) ou (prem.lu.cale.mois=chom et aujourd'hui=prem.lu.cale.mois+1.jour et aujourd'hui=ouvr) }
```
