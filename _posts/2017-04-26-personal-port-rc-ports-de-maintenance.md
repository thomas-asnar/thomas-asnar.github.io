---
layout: post
title: Port de maintenance .personalport_rc
date: 2017-04-26 23:07:05
author: Thomas ASNAR
categories: [unix, vtom, .personalport_rc, vtserver, vtsgbd, ports de maintenance]
---

You know `.personalport_rc` ? moi non plus, jusqu'à il y a peu de temps.

C'est bien pratique pour :
 * mettre temporairement les ports des services VTOM en maintenance
 * avoir plusieurs installations VTOM sur un seul serveur
 
## How ?!

Il est à placer dans le répertoire home du user d'admin vtom.

On fait correspondre les ports :

```
[ports]
vtserver:<le nom que je veux que j'aurais mis dans /etc/services>
vtsgbd:<le nom que je veux que j'aurais mis dans /etc/services>

etc etc pour tous les ports VTOM que je veux
```

### Exemple : ports de maintenance

J'ai un serveur VTOM classique, les ports sont :

```
# ---------------------
# Demons tcp Visual TOM
# ---------------------
tomDBd 30001/tcp
bdaemon 30004/tcp
vtserver 30007/tcp
vtnotifier 30008/tcp
vtsgbd 30009/tcp
vthttpd 30080/tcp
vtmanager 30000/tcp
```

Je veux passer mon serveur en maintenance (pour que personne ne s'y connecte par exemple). Je rajoute cette ligne dans `/etc/services` :

```
vtserverm 30107/tcp # port de maintenance vtom
```

Je prépare 2 fichiers .personalport_rc.origin et .personalport_rc.maint (les noms n'ont pas d'importance) :

```
~vtom/.personnalport_rc.origin et je fais correspondre le vtserver au service d'origine vtserver
[ports]
vtserver:vtserver
```

```
~vtom/.personnalport_rc.maint et je fais correspondre le vtserver au service de maintenance vtserverm qui pointe sur un port différent
[ports]
vtserver:vtserverm
```

Le plus évident pour bien voir que ça fonctionne, c'est la commande `vtping`.

En temps normal, `vtping` :

```
vtom@cedfc0a2778f:~$ vtping
[serveur locaux (172.17.0.2)]
vtsgbd     vtsgbd:30009     actif
vtserver   vtserver:30007   actif
vtnotifier vtnotifier:30008 actif
dserver    tomDBd:30001     actif
vtmanager  vtmanager:30000  arrete
bdaemon    bdaemon:30004    arrete
vthttpd    vthttpd:30080    actif

[moteurs]
tengine    exploitation             arrete
...
```

Par exemple, je copie `~vtom/.personnalport_rc.maint` sur `~vtom/.personnalport_rc`, je fais `vtping` :

```
je vois que le vtserver a bien été pris en compte avec le port de maintenance
vtom@cedfc0a2778f:~$ vtping
[serveur locaux (172.17.0.2)]
vtsgbd     vtsgbd:30009     actif
vtserver   vtserver:30107   arrete
vtnotifier vtnotifier:30008 actif
dserver    tomDBd:30001     actif
vtmanager  vtmanager:30000  arrete
bdaemon    bdaemon:30004    arrete
vthttpd    vthttpd:30080    actif
```

### Exemple : plusieurs installations VTOM sur un même serveur

J'ai une installation classique avec un user vtom. J'ai les services classiques dans `/etc/services` :

```
# ---------------------
# Demons tcp Visual TOM
# ---------------------
tomDBd 30001/tcp
bdaemon 30004/tcp
vtserver 30007/tcp
vtnotifier 30008/tcp
vtsgbd 30009/tcp
vthttpd 30080/tcp
vtmanager 30000/tcp
```

J'installe un autre serveur VTOM sur le même serveur avec le user `vtomd` par exemple : 
```
# ---------------------
# Demons tcp Visual TOM
# ---------------------
tomDBd 40001/tcp
bdaemon 40004/tcp
vtserver 40007/tcp
vtnotifier 40008/tcp
vtsgbd 40009/tcp
vthttpd 40080/tcp
vtmanager 40000/tcp
```


Et je personnalise le `.personnalport_rc` dans le répertoire home de `vtomd` :

```
(vtomd)/usr/vtomd$ cat .personalport_rc
[ports]
tomDBd:tomDBdd
bdaemon:bdaemond
vtserver:vtserverd
vtmanager:vtmanagerd
vtnotifier:vtnotifierd
vtsgbd:vtsgbdd
vthttpd:vthttpdd
```
