---
layout: post
title: Lister les processus java weblogic
date: 2015-03-21 21:10
author: Thomas ASNAR
categories: [Java, Weblogic, ps, /usr/ucb/ps -auxwww, ps, nom complet processus, processus tronqué]
---

Petite astuce pour lister les processus java weblogic, avec le nom de l'application. 
En effet, un simple `ps -ef` ne vous donnera, bien souvent, qu'une ligne tronquée ne contenant pas toutes les informations que vous aimeraiez.

Première solution, si vous avez ce binaire, le fameux /usr/ucb/ps -auxwww.

Deuxième solution :

```bash
# On fait un simple ps et on récupère les PID des process grepés (ici par exemple, les processus java lancés par l'utilisateur webadm
# Ensuite on passe ce PID dans pargs -l pour les détails
ps -ef | grep java | grep webadm | while read line; do pargs -l $(echo $line | awk '{print $2}') 2> /dev/null ; done
```

Encore une autre solution si on a pas `pargs`

```
/proc/<pid>/cmdline

# attention si on fait du grep sur du binary file comme dans /proc il faut utiliser l'option --text ou -a
egrep --color --text "pattern" /proc/<pid>/cmdline
```
