---
layout: post
title: Ressource pile
date: 2016-08-18 22:03
author: Thomas ASNAR
categories: [ordonnancement, vtom, ressource pile, ressource VTOM]
---
# Lister le contenu de la ressource pile VTOM

`tpush -name <nom ressource pile> -info`

```
valeur         : 1
contenu:
1
2
3
```

Le problème, c'est qu'on a des informations qu'on ne souhaite pas forcément. Pas très pratique pour faire une boucle for par exemple.

On filtre avec `awk` tous les élements de la ressource pile VTOM qui sont après le mot `contenu` et où la ligne n'est pas vide (dernière ligne vide dans le résultat de mon `tpush`)

```bash
tpush -name <nom ressource pile> -info | awk '\
BEGIN{ligneContenu="x";nbValues=0;}\
($1 ~ /contenu/ || NR > ligneContenu) && $0 != ""\
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
tpush -name <nom ressource pile> -info | awk '\
BEGIN{ligneContenu="x";nbValues=0;}\
($1 ~ /contenu/ || NR > ligneContenu) && $0 != ""\
{\
if(ligneContenu == "x"){ ligneContenu = NR ; next } ;\
nbValues++;\
}\
END{print nbValues}'
3
```

# Vider le premier élément de la ressource pile VTOM

```
tpop -name <nom ressource pile>
OK: <nom ressource pile>

# le premier élément 1 que j'avais dans ma pile a été supprimé
tpush -name <nom ressource pile> -info
valeur         : 1
contenu:
2
3
```

# Ajouter un élément à la fin de la ressource pile VTOM

```
tpush -name <nom ressource pile> -value 1
OK: 1

# la valeur 1 a été rajoutée en fin de pile
tpush -name <nom ressource pile> -info
valeur         : 1
contenu:
2
3
1
```

# Vider tous les éléments de la ressource pile VTOM

`tempty -name <nom ressource pile>`

# A quoi ça sert ?
