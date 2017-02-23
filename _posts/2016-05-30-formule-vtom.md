---
layout: post
title: Formules VTOM
date: 2016-05-30 12:00
author: Thomas ASNAR
categories: [ordonnancement, vtom, formule]
---
Je rassemble ici un recueil des formules VTOM qui valent le coup d'oeil.

Attention, une formule VTOM dépend du calendrier sur lequel elle s'appuie. (jours fériés et jour chômés)

 * Veille du premier jour ouvre mois : By Fred 

```
test{(aujourd'hui=1.jour.ouvr.mois-1.jour.cale) ou (aujourd'hui=dern.jour.cale.mois+1.jour.ouvr-1.jour.cale)}
```

 * Premier Lundi du mois s'il est ouvré, sinon le jour ouvré qui suit

```
test { (aujourd'hui=prem.lu.cale.mois et aujourd'hui=ouvr) ou (prem.lu.cale.mois=chom et aujourd'hui=prem.lu.cale.mois+1.jour et aujourd'hui=ouvr) }
```

version corrigée par Hervé G.

```
test { (aujourd'hui=prem.lu.cale.mois et aujourd'hui=ouvr) ou (prem.lu.cale.mois=chom et aujourd'hui=prem.lu.cale.mois+1.jour.ouvr ) }
ou plus "simple"
test { aujourd'hui>=prem.lu.cale.mois et aujourd'hui=ouvr et aujourd'hui-1.jour.ouvre<prem.lu.cale.mois}
```

 * premier jour ouvré du mois sauf en Janvier, et dernier jour ouvré de Décembre :
 
```
test{
(aujourd'hui = prem.jour.ouvr.mois et aujourd'hui <> janvier)
ou
(aujourd'hui = dern.jour.ouvr.annee)
}
```
