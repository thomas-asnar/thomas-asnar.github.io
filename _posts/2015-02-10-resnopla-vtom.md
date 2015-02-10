---
layout: post
title: Exécuter une application si parent déplanifié
date: 2015-02-10 21:10
author: Thomas ASNAR
categories: [resnopla, vtom.ini, déplanification, Visual TOM, VTOM]
---
Une question de Bertrand :

Comment exécuter une application seulement si la précédente se déplanifie et sans passer par des ressources ?
(notamment utile sur une déplanification suite à une heure maximum dépassée ou une "non" ressource)

Le plus simple est de configurer resnopla dans le fichier vtom.ini, dans la section du tengine en question :

```
[TENGINE:exploitation]
resnopla=1
```

<img class="img-responsive" src="/assets/img/resnopla.png" alt="resnopla vtom" />