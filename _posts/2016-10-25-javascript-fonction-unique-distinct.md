---
layout: post
title: Javascript fonction unique (distinct) sur un tableau d'objet
date: 2016-10-25 22:10:04
author: Thomas ASNAR
categories: [javascript]
---
## Mon besoin en Javascript 
J'ai un tableau d'objets, et je veux récupérer un tableau de valeurs uniques d'objets ayant le même attribut.

## Fonction

```javascript
var _distinctUniqueValuesInArray = function(myArray, myUniqueObjProperty){
  var a = myArray.map(function(obj) { return obj[myUniqueObjProperty] })
  return a.filter(function(v,i){ return a.indexOf(v) == i })
}
```

## Exemple

```javascript
var monArray = [
{"VTENVNAME":"ENV1","VTDOMAINE":"MONDOMAINE25","NB_JOBS_NON_STATS":"15"},
{"VTENVNAME":"ENV2","VTDOMAINE":"MONDOMAINE15","NB_JOBS_NON_STATS":"58"},
{"VTENVNAME":"ENV2","VTDOMAINE":"MONDOMAINE35","NB_JOBS_NON_STATS":"18"},
{"VTENVNAME":"ENV2","VTDOMAINE":"MONDOMAINE25","NB_JOBS_NON_STATS":"50"},
{"VTENVNAME":"ENV5","VTDOMAINE":"MONDOMAINE36","NB_JOBS_NON_STATS":"2"},
{"VTENVNAME":"ENV5","VTDOMAINE":"MONDOMAINE26","NB_JOBS_NON_STATS":"10"},
{"VTENVNAME":"ENV7","VTDOMAINE":"MONDOMAINE26","NB_JOBS_NON_STATS":"81"},
{"VTENVNAME":"ENV7","VTDOMAINE":"MONDOMAINE36","NB_JOBS_NON_STATS":"47"},
{"VTENVNAME":"ENV7","VTDOMAINE":"MONDOMAINE16","NB_JOBS_NON_STATS":"71"},
{"VTENVNAME":"ENV8","VTDOMAINE":"MONDOMAINE25","NB_JOBS_NON_STATS":"45"},
{"VTENVNAME":"ENV8","VTDOMAINE":"MONDOMAINE15","NB_JOBS_NON_STATS":"31"},
{"VTENVNAME":"ENV8","VTDOMAINE":"MONDOMAINE35","NB_JOBS_NON_STATS":"62"},
{"VTENVNAME":"ENV13","VTDOMAINE":"MONDOMAINE36","NB_JOBS_NON_STATS":"2"},
{"VTENVNAME":"ENV13","VTDOMAINE":"MONDOMAINE16","NB_JOBS_NON_STATS":"2"},
{"VTENVNAME":"ENV13","VTDOMAINE":"MONDOMAINE26","NB_JOBS_NON_STATS":"2"},
{"VTENVNAME":"ENV14","VTDOMAINE":"MONDOMAINE16","NB_JOBS_NON_STATS":"56"},
{"VTENVNAME":"ENV14","VTDOMAINE":"MONDOMAINE36","NB_JOBS_NON_STATS":"29"},
{"VTENVNAME":"ENV14","VTDOMAINE":"MONDOMAINE26","NB_JOBS_NON_STATS":"77"},
{"VTENVNAME":"ENV15","VTDOMAINE":"MONDOMAINE26","NB_JOBS_NON_STATS":"164"},
{"VTENVNAME":"ENV15","VTDOMAINE":"MONDOMAINE36","NB_JOBS_NON_STATS":"90"},
{"VTENVNAME":"ENV15","VTDOMAINE":"MONDOMAINE16","NB_JOBS_NON_STATS":"139"},
{"VTENVNAME":"ENV16","VTDOMAINE":"MONDOMAINE16","NB_JOBS_NON_STATS":"113"},
{"VTENVNAME":"ENV16","VTDOMAINE":"MONDOMAINE36","NB_JOBS_NON_STATS":"123"},
{"VTENVNAME":"ENV16","VTDOMAINE":"MONDOMAINE26","NB_JOBS_NON_STATS":"410"}
]
_distinctUniqueValuesInArray(monArray,"VTDOMAINE")
```

```
["MONDOMAINE25", "MONDOMAINE15", "MONDOMAINE35", "MONDOMAINE36", "MONDOMAINE26", "MONDOMAINE16"]
```

```
_distinctUniqueValuesInArray(monArray,"VTENVNAME")
```

```
["ENV1", "ENV2", "ENV5", "ENV7", "ENV8", "ENV13", "ENV14", "ENV15", "ENV16"]
```

## Pour aller plus loin

[Array.prototype.map()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map)
[Array.prototype.filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter)
