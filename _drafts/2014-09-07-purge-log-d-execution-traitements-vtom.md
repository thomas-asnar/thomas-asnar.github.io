---
layout: post
title: Purge log d'exécution des traitements VTOM
date: 2014-09-07 20:41
author: Thomas ASNAR
comments: true
categories: [Linux, purge log VTOM, Script, shell, Visual TOM, VTOM]
---
Sans plus de cérémonie, un exemple de script pour la purge des logs d'exécution VTOM.
<!--more-->
<pre lang="bash">
# Purge des logs d'exécution
#Initialisation variables
chaine_var_glob=""
grep_global=""

# Recuperation des arguments
NbJoursJOUR=${1:-31}
NbJoursHebdo=${2:-62}
NbJoursMens=${3:-100}
NbJoursCYCL=${4:-7}
NbJoursAUTRES=${5:-31}
taille_max=${6:-300}
# Si le répertoire de logs est plus souvent modifié, le passer en 1er param
LOG_REP=${7:-'/opt/vtom/logs'}


#Repertoire LOG
if test -d "${LOG_REP}"
then
  cd ${LOG_REP}
else
  echo "Le repertoire ${LOG_REP} n'existe pas"
  echo "Exit -> 1"
  exit 1
fi

#Fonction affichage date_heure
date_heure(){
date_heure_var=`date +"%d/%m/%Y - %H:%M:%S"`
echo "${date_heure_var} : $1"
}

#Fonction suppr. logs, deux parametres attendus
#Grâce à une charte de nommage, la chaine recherchée pourra affiner les
#périodes de rétention des logs
find_log_suppr(){

if test -n $1
then
  chaine_var=$1
  mtime_var=${2:-31}
  chaine_var_global=`echo "${chaine_var_global} ${chaine_var}"`
else
  echo "Parametre 1 attendu : nom de la recherche"
  echo "Exit 1"
  exit 1
fi

find "${LOG_REP}" -mtime "+${mtime_var}" -name "*${chaine_var}*" -exec echo "-> suppr " {} \; -exec rm -f {} \;
}

#Fonction suppr logs autres avec grep -v tous les autres logs deja cherche et suppr
find_log_suppr_autres(){

for var in ${chaine_var_global}
do
  grep_global=`echo "${grep_global} | grep -v \"${var}\""`
done

cmd=`echo "find \"${LOG_REP}\" -mtime \"+${NbJoursAUTRES}\" | grep -e \".*\.o\" -e \".*\.e\" ${grep_global}"`

for var in $(eval ${cmd})
do
  echo "-> suppr. ${var}"
  rm -f ${var}
done
}


# debut suppr log
# Partie Personnalisable
# La fonction date_heure accepte un parametre : texte a afficher
# La fonction find_log_suppr doit avoir 2 parametres
#             Premier parametre : la chaine de caractere que l'on cherche
#             Deuxieme parametre : le nombre de jour depuis lequel le fichier n'a pas ete modifie
#             Si vous utilisez d'autres variables que celles definies dans # Recuperation des arguments :
#                             Penser a les definir dans # Recuperation des arguments
#                             ou rentrer les valeurs de jours en dur entre doubles quotes ex : "14"
# La fonction find_log_suppr_autres doit s'utiliser en fin de la partie personnalisable sans parametre
#             cette fonction supprime tous les fichiers logs qui n'ont pas ete traite en amont

date_heure " -> Repertoire ${LOG_REP}"

date_heure "Suppression logs journaliers de plus de ${NbJoursJOUR} jours"

find_log_suppr "ONL" "${NbJoursJOUR}"
find_log_suppr "INC" "${NbJoursJOUR}"

date_heure "Suppression logs hebdomadaires de plus de ${NbJoursHebdo} jours"

find_log_suppr "FUL" "${NbJoursHebdo}"
find_log_suppr "OFL" "${NbJoursHebdo}"
find_log_suppr "DR-" "${NbJoursHebdo}"
find_log_suppr "IGNITE-" "${NbJoursHebdo}"

date_heure "Suppression logs mensuels de plus de ${NbJoursMens} jours"

find_log_suppr "SAX" "${NbJoursMens}"

date_heure "Suppression logs cycliques de plus de ${NbJoursCYCL} jours"

find_log_suppr "JNL" "${NbJoursCYCL}"
find_log_suppr "C-RBTD" "${NbJoursCYCL}"
find_log_suppr "C-RSCO" "${NbJoursCYCL}"
find_log_suppr "C-RSN3" "${NbJoursCYCL}"

date_heure "Suppression logs des autres traitements de plus de ${NbJoursAUTRES} jours"

find_log_suppr_autres
#fin partie personnalisable

#Test de la taille occupe par le repertoire ${LOG_REP}, exit si superieur a ${taille_max} en Mo
date_heure

date_heure "Test espace occupe dans ${LOG_REP}"
test_taille=`du -ks ${LOG_REP} | awk '{print $1}'`
test_taille=`expr ${test_taille} / 1024`
if test -z "${test_taille}"
then
  echo "Test non effectue"
  echo "Exit -> 1"
  exit 1
fi

if test ${test_taille} -gt ${taille_max}
then
  CR=123
  echo "L'espace occupe dans le repertoire ${LOG_REP} excede les ${taille_max} Mo"
else
  CR=0
  echo "Espace occupe = ${test_taille} Mo, Total espace a ne pas depasser = ${taille_max} Mo"
fi


#Test presence autre que fichiers logs
presence_autrefichier=`ls "${LOG_REP}" | grep -v ".*\.e" | grep -v ".*\.o"`
if test -n "${presence_autrefichier}"
then
  date_heure "D'autres fichiers sont presents dans le repertoire ${LOG_REP} : "
  echo "   ${presence_autrefichier}"
  date_heure "Veuillez verifier la necessite de leur presence et supprimer les au besoin(voir administrateur VTOM)"
  CR=1
fi


date_heure "Exit -> ${CR}"

exit ${CR}

</pre>
