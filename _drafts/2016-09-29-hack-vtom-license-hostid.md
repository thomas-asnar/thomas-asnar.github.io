---
layout: post
title: Hack VTOM (fichier license.xml et hostid)
date: 2016-09-29 22:00
author: Thomas ASNAR
categories: [Visual TOM, VTOM, license.xml, licence vtom, hostid]
---
Vous avez une licence VTOM valide et vous aimeriez bien la déployer sur votre bac à sable (par exemple, vos containeurs Docker si vous êtes comme moi) ?

C'est possible. L'idée est de changer votre `hostid` avant d'installer le serveur VTOM pour le faire correspondre à celui de la clé de licence.

Premier chose, récupérer le `hostid` dans le fichier license.xml (dans $TOM_BIN de votre serveur où la licence est valide). Il suffit de récupérer les 8 caractères de l'attribut hostid du tag License.

```
<?xml ....
<License hostid="8caractères" ...
...
```

Si vous êtes sur une distribution Linux, ce script, trouvé sur le net, devrait être amplement suffisant pour modifier votre `hostid`.

```bash
#!/bin/bash
#
# ~/set_hostid.sh nouveau_hostid
#
# Purpose: Write the passed in parameter as hostid to /etc/hostid
#          If no parameter is passed, write current hostid to /etc/hostid
# Author:  Fazle Arefin

if [[ -n "$1" ]]; then
  host_id=$1
  # chars must be 0-9, a-f, A-F and exactly 8 chars
  egrep -o '^[a-fA-F0-9]{8}$' <<< $host_id || exit 1
else
  host_id=$(hostid)
fi

a=${host_id:6:2}
b=${host_id:4:2}
c=${host_id:2:2}
d=${host_id:0:2}

echo -ne \\x$a\\x$b\\x$c\\x$d > /etc/hostid &&
  echo "Success" 1>&2

exit 0
```

```
# en root
# admettons que le hostid récupéré dans le fichier license.xml soit 7e7f0100
~/set_hostid.sh 7e7f0100

# va créer un fichier /etc/hostid qui restera au reboot
```

Si vous voulez aller plus loin dans la compréhension, sachez qu'il suffit de découper votre hostid de 8 en 4x2 caractères (les derniers en premier, why je ne sais pas) et de dire qu'on écrit en héxadécimal (\x).

Pour reprendre l'exemple, si mon `hostid` est 7e7f0100. Je découpe : `00 01 7f 7e`

Si vous voyez des caractères bizarre dans /etc/hostid, c'est que votre putty interprète les caractères.

Par exemple :

```bash
cat /etc/hostid
# donne des caractères bizarres ¯pö~
# mais ce sont jamais que les nombres héxa qui sont décodés en 'ascii' (ou toute autre translation de votre outil, voir dans le menu de Window > Translation dans Putty par exemple)
# par exemple si on remet en héxa >>> base64.b16encode('~') donne '7E'
```

Maintenant, il suffit d'installer normalement votre serveur VTOM et le tour est joué.

Testé et validé en VTOM 5.7.4.

