---
layout: post
title: Statuts dans le vtexport
date: 2016-12-12 20:45
author: Thomas ASNAR
categories: [vtom, status, vtexport]
---
        R = ENCOURS
        X = ENDIFFICULTE
        W = AVENIR
        F = TERMINE
        E = ENERREUR
        D = DEPLANIFIE
        U = NONPLANIFIE

```json
{
  "R" : {"rvb":"5,250,250","nom":"ENCOURS"},
  "X" : {"rvb":"255,200,0","nom":"ENDIFFICULTE"},
  "W" : {"rvb":"250,255,20","nom":"AVENIR"},
  "F" : {"rvb":"20,255,20","nom":"TERMINE"},
  "E" : {"rvb":"250,0,0","nom":"ENERREUR"},
  "D" : {"rvb":"195,195,195","nom":"DEPLANIFIE"},
  "U" : {"rvb":"250,250,250","nom":"NONPLANIFIE"}
}
```

Et dans la table vt_stats_job : (index de 0 à 6)

```
let Status = ["", "AVENIR ", "ENCOURS", "TERMINE", "ENERREUR", "DEPLANIFIE", "NONPLANIFIE"]
```
