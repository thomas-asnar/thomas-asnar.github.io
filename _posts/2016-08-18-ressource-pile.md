---
layout: post
title: Ressource pile
date: 2016-08-18 22:03
author: Thomas ASNAR
categories: [ordonnancement, vtom, ressource pile, ressource VTOM]
---
# Lister le contenu de la ressource pile

`tpush -name <nom ressource pile> -info`

```
valeur         : 1
contenu:
1
2
3
```

Le problème, c'est qu'on a des informations qu'on ne souhaite pas forcément. Pas très pratique pour faire une boucle for par exemple.

On filtre avec `awk` tous les élements de la ressource pile VTOM qui sont après le mot `contenu` et qui n'est pas vide (dernière ligne vide dans le résultat de mon `tpush`)

```bash
tpush -name <nom ressource pile> | awk '\
BEGIN{ligneContenu="x";nbValues=0;}\
($1 ~ /contenu/ || NR > ligneContenu) && $1 != ""\
{\
if(ligneContenu == "x"){ ligneContenu = NR ; next } ;\
print $1;\
}'
1
2
3
```

# Compter le nombre d'éléments dans la pile

```bash
tpush -name <nom ressource pile> | awk '\
BEGIN{ligneContenu="x";nbValues=0;}\
($1 ~ /contenu/ || NR > ligneContenu) && $1 != ""\
{\
if(ligneContenu == "x"){ ligneContenu = NR ; next } ;\
nbValues++;\
}\
END{print nbValues}'
3
```
