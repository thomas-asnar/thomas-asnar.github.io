---
layout: post
title: Service agent vtom dans /etc/init.d/ et chkconfig
date: 2014-07-28 17:13
author: Thomas ASNAR
comments: true
categories: [/etc/init.d, agent, Linux, Script, service, shell, Visual TOM, VTOM, VTOM]
---
L'installation agent VTOM sur linux ne fournit pas de service dans /etc/init.d/ pour vérifier le statut, stopper ou démarrer l'agent. 
VTOM fournit en revanche les scripts permettant d'administrer l'agent (stop et start). 
Je vous dévoile le script agent_vtom (à copier coller dans /etc/init.d/agent_vtom en 755) permettant de s'intégrer dans le chkconfig.
<!--more-->
<pre lang="bash">
#!/bin/bash
#
# chkconfig: 345 90 20
# description: Agent VTOM.
#========================================================
 
USER_VTOM=vtom
if [ "$USER_VTOM" = "`whoami`" ]; then
  SUBMIT=""
elif [ "root" = "`whoami`" ]; then
  SUBMIT="su - $USER_VTOM -c "
else
  echo "Ce script doit etre lance en tant que root ou $USER_VTOM => sortie"
  exit 2
fi
TOM_HOME=${TOM_HOME:-/opt/vtom}
RETVAL=0
 
prog="Agent VTOM"
 
start(){
        echo -n $"Démarrage $prog: "
 
        if test -z "$SUBMIT"; then
                        eval "${TOM_HOME}/admin/start_client &"
        else
                        $SUBMIT "${TOM_HOME}/admin/start_client &"
        fi
 
        limite=5
        cpt=0
 
        while test $cpt -lt $limite
        do
                if test $RETVAL -eq 1; then
                        cpt=`expr $cpt + 1`
                        status
                else
                        break
                fi
                sleep 2
        done
 
        if test $RETVAL -eq 1; then
                echo "Problème lors du démarrage $prog"
                RETVAL=0
        else
                echo -e "\nAgent VTOM \033[0;32mDEMARRé\e[0m\n"
        fi
}
 
stop(){
        echo -n $"Arrêt $prog: "
 
        if test -z "$SUBMIT" ; then
                        eval "${TOM_HOME}/admin/stop_client &"
        else                                                                                                                                                                                                             28 07 2014 16:52:45
                        $SUBMIT "${TOM_HOME}/admin/stop_client &"
        fi
 
        limite=5
        cpt=0
 
        while test $cpt -lt $limite
        do
                if test $RETVAL -eq 0; then
                        cpt=`expr $cpt + 1`
                        status
                else
                        break
                fi
                sleep 2
        done
 
        if test $RETVAL -eq 0; then
                echo "Problème lors de l'arrêt $prog"
        else
                echo -e "\nAgent VTOM \033[0;31mARRETé\e[0m\n"
                RETVAL=0
        fi
 
        }
 
status(){
        ps -ef|grep vtom|grep bdaemon|grep -v status 1> /dev/null 2> /dev/null
        if [ $? != 0 ] ; then
                        echo -e "\n$prog : \033[0;31mOFF\e[0m\n"
                        RETVAL=1
        else
                echo -e "\n$prog : \033[0;32mON\e[0m\n"
                RETVAL=0
        fi
}
 
restart(){
    stop
    start
}
 
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        echo $"Usage: $0 {start|stop|status|restart}"
        RETVAL=1
esac
 
exit $RETVAL
</pre>
Voilà comment installer un service agent vtom linux dans /etc/init.d et chkconfig.
