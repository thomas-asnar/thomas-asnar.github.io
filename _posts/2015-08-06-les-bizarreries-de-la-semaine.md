---
layout: post
title: les bizarreries de la semaine 
date: 2015-08-06 17:58
author: Thomas ASNAR
categories: [log VTOM, .i, ERRORLEVEL, batch, VTOM, echo]
---
Quelques bizarreries de le semaine :

* Script batch : Le echo ne modifie pas le errorlevel ! 
* Attention aux & dans les paramètres ou dans les ressources VTOM. Ca peut avoir comme résultat assez drôle de n'afficher aucun log VTOM tout en ayant un retour tsend
* Les fichiers avec extension .i dans le répertoire de logs VTOM est normal depuis la 5.7xx ! Il semblerait que ça serve aux alarmes.


Quelques bouts de code de la semaine : 
* Script PERL : charger un fichier XML et récupérer des informations

```perl 
#!/usr/bin/perl
use XML::LibXML ;


# Load DOM du fichier XML
my $dom = XML::LibXML->new()->parse_file($ARGV[0]) ;
# Item à récupérer
my $item = $ARGV[1] ;


my $logVTOM =  $dom->findvalue('/runResponse/runReturn/item/name[contains(text(),\'flowResult\')]/../value') ;
my $flowResponse =  $dom->findvalue('/runResponse/runReturn/item/name[contains(text(),\'flowResponse\')]/../value') ;

# On clean le flowResult pour construire un résultat XML et on charge le DOM en mémoire
$logVTOM =~ s/.*(<VTOM_RESULT>.*)/$1/ ;
$logVTOM =~ s/(.*<\/VTOM_RESULT>).*/$1/ ;

my $domLogVTOM = XML::LibXML->load_xml(
	string => $logVTOM
) ;

print $domLogVTOM->findvalue('/VTOM_RESULT/VTOM_STDERR') if($item eq "VTOM_STDERR"); 
print $domLogVTOM->findvalue('/VTOM_RESULT/VTOM_STDOUT') if($item eq "VTOM_STDOUT"); 
print $domLogVTOM->findvalue('/VTOM_RESULT/VTOM_CR') if($item eq "VTOM_CR"); 
print $flowResponse if($item eq "flowResponse");
```

* Script VTOM : lister les machines Windows VTOM et y associer l'utilisateur Log On "AbsyssBatchManager"

```bash
vtmachine | grep -i Win | awk -F"|" '{print $2}' | sed 's/[   ]//g' | while read machine; do vtmachine -i $machine ; done > /var/tmp/vtmachine_windows_infotag.txt
egrep "(Logical Name|Username)" /var/tmp/vtmachine_windows_infotag.txt | awk -F"|" '{print $3}' | sed 's/[    ]//g' > /var/tmp/liste_machine_user_windows.txt
compteur=0; while read line ; do echo -en "$line" ; if test `expr $compteur % 2` -eq 1 ; then echo "" ; else echo -en ";" ; fi ; compteur=`expr $compteur + 1` ; done < /var/tmp/liste_machine_user_windows.txt
```

(Attention des fois le vtmachine /info ne donne pas de Username)
