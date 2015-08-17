---
layout: post
title: Horaires cron pour les cycliques VTOM
date: 2012-10-06 10:11
author: Thomas ASNAR
comments: true
categories: [cron, cyclique, horaire cron, Ordonnancement, Visual TOM, VTOM, VTOM]
---
On ne s'en sert pas souvent mais ça a le mérite d'exister et c'est bien pratique dans certains cas : les horaires en format cron dans les cycliques VTOM.

MM HH1,HH2 -> se lance à HH1:MM, et HH2:MM
MM1,MM2 HH1,HH2 -> se lance à HH1:MM1, HH1:MM2, HH2:MM1, et HH2:MM2


Pour l'exemple de Guillaume, il faudra définir un cycle comme cela : 

00 13,16,19

Attention cependant : 

Dans la crontab, il me semble que l'exécution peut s'effectuer en parallèle et plusieurs occurences peuvent se lancer en parralèle si le temps d'exécution est supérieur au temps du cycle.

Sous VTOM, non. La prochaine heure du cycle est evaluée à la fin du cycle précédant. Idem si on éteint le moteur, on peut perdre les cycles qui ont dépassé les heures cron.

(mais ça peut être bien si c'est voulu : on ne veut lancer le job qu'à ces heures précises et pas en dehors)

Merci à ma référence au sommet, alias Dieu, pour les confirmations.
