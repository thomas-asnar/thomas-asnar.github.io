---
layout: post
title: Priorité queue batch VTOM
date: 2016-03-10 22:53
author: Thomas ASNAR
categories: [queue, queue batch, Visual TOM, VTOM]
---
<iframe src="https://docs.google.com/presentation/d/1wbHTmCNdbhet1G1rL0MnCOfB8OqO2mcYNJgdoTw5GyM/embed?start=true&loop=false&delayms=10000" frameborder="0" width="960" height="749" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

Pour résumer et pour ceux dont le proxy bloque le slide Google :

Tous les jobs dont le moteur a validé les contraintes (horaires, liens, ressources) passent à « EN COURS » dans VTOM selon un ordre alphabétique propre au moteur. (ex. JOB_1 commence avant JOB_2 qui commence avant JOB_3 etc. ➔ peu importe la priorité des queues)

« EN COURS » dans VTOM != de en cours d’exécution sur le host

Seuls les 5 premiers jobs s’exécutent réellement sur le host, le reste passe en file d’attente. 

Quand un job se termine, la priorité des queues est prise en compte.

