# Comprendre et Exploiter Docker

La virtualisation des infrastructures est omniprésente. Les besoins et les méthodes de travail évoluant, les conteneurs ont pris de plus en plus d'importance.

Notamment très populaire chez les développeurs et leur méthode AGILE, Docker permet facilement de partager les applications entre les équipes, de les tester simplement dans n'importe quel environnement et de les publier versionnées sur le cloud (controle, agilité et portabilité).

Par exemple, Google exécute environ 3300 conteneurs à la seconde ! 

> Everything at Google, from Search to Gmail, is packaged and run in a Linux container. Each week we launch more than 2 billion container instances 

Après une légère introduction, je vous montrerai un exemple d'utilisation de Docker (niveau novice à intermédiaire).

## Introduction à Docker

Docker propose plusieurs produits pour construire, déployer et exécuter des conteneurs. La plupart du temps, on associera le terme de conteneur à une application ou à un espace de travail avec toutes les dépendances et les outils nécessaires.

Notez que la notion de conteneur n'est pas toute jeune (voir les zones Solaris par exemple) mais la grande force de Docker est, pour moi, sa facilité d'utilisation.

Le plus facile pour appréhender Docker est de comprendre la différence entre une machine virtuelle et un conteneur.

### Différence entre les VM's et les Conteneurs

(mettre les images)

Les machines virtuelles ont leur propre système d'exploitation et ressources allouées (CPU, mémoire, stockage, etc.)

Les conteneurs ont comme base, le SE  

### Produits Docker

[Docker Engine](https://www.docker.com/products/docker-engine) est le moteur qui tourne sous Linux et permet la gestion/exécution des conteneurs.

[Docker Machine](https://www.docker.com/products/docker-machine) permet de configurer et d'exécuter Docker Engine sur une machine virtuelle linux très légère. Indispensable sous Windows.

[Docker Compose](https://www.docker.com/products/docker-compose) permet de définir la configuration d'un ou plusieurs conteneurs en un seul fichier puis, de les exécuter en une seule commande.

[Docker Hub](https://www.docker.com/products/docker-hub) permet de publier sur le cloud (privé ou public) vos conteneurs versionnés. 

D'autres produits existent cependant je ne les mentionnerai pas dans cet article. (voir # Pour aller plus loin)

## Exemple d'utilisation : Docker Compose

## Pour aller plus loin

[Documentation Docker](https://docs.docker.com/) : comment installer, utiliser les commandes en détails etc.

[Doker Swarm](https://www.docker.com/products/docker-swarm) : Docker en mode cluster

[Kubernetes](http://kubernetes.io/) : Automatisation des opérations d'exploitation de conteneurs à travers le cloud et clusters de machines

J'adore les tutoriels Grafikart et c'est en français :

[Présentation de Docker](https://www.grafikart.fr/tutoriels/docker/docker-intro-634)

[Environnement de développement basé sur Docker](https://www.grafikart.fr/tutoriels/docker/docker-stack-web-635)

 
