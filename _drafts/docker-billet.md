# Comprendre et Exploiter Docker

La virtualisation des infrastructures est omniprésente. Les besoins et les méthodes de travail évoluant, les conteneurs ont pris de plus en plus d'importance.

Notamment très populaire chez les développeurs et leur méthode AGILE, Docker permet facilement de partager les applications entre les équipes, de les tester simplement dans n'importe quel environnement et de les publier versionnées sur le cloud (controle, agilité et portabilité).

Par exemple, Google exécute environ 3300 conteneurs à la seconde ! 

> Everything at Google, from Search to Gmail, is packaged and run in a Linux container. Each week we launch more than 2 billion container instances 

Après une légère introduction, je vous montrerai un exemple d'utilisation de Docker (niveau novice à intermédiaire).

## Introduction à Docker

Docker propose plusieurs produits pour construire, déployer et exécuter des conteneurs. La plupart du temps, on associera le terme de conteneur à une application ou à un espace de travail avec toutes les librairies, dépendances, outils nécessaires.

Notez que la notion de conteneur n'est pas toute jeune (voir les zones Solaris par exemple, ou namespace + cgroups linux pour isoler) mais la grande force de Docker est, pour moi, sa facilité d'utilisation.

Le plus facile pour appréhender Docker est de comprendre la différence entre une machine virtuelle et un conteneur.

### Différence entre les VM's et les Conteneurs

(mettre les images)

Les machines virtuelles ont leur propre système d'exploitation et ressources allouées (CPU, mémoire, stockage, etc.) C'est un avantage car on a ce que l'on paye (ressources réservées). Mais c'est aussi un inconvéniant car : d'une part, la limite de ressources à allouer est vite atteinte, et, d'autre part, les VM's en exécution sont bien souvent sous-exploitées (gaspillage). 

Les conteneurs Docker, eux, se basent sur le système d'exploitation (noyau linux > à 3.10). Avec Docker, on peut lancer des milliers d'applications hétérogènes (sgbd, serveur web, serveur d'application, big data, etc.) sur le même host ; et cela, sans la complexité ni la lourde charge d'un hyperviseur (comme par exemple un gros vCenter pour VMWare).

Un autre avantage des conteneurs : ils garantissent que le code qui a été écrit et testé directement chez les Dev' sera exécuté de la même manière une fois déployé ailleurs (que ça soit sur le cloud, sur des VM's ou sur une infrastructure complètement différente, l'application dispose déjà dans son conteneur des librairies dont elle a besoin)

Une autre différence de taille (si je puis dire) : le poids du conteneur. Contraitement aux VMs qui embarquent le SE et qui pèsent plusieurs dizaines de Giga Octets, les conteneurs sont très légers et leur poids dépend des librairies qui font tourner l'application (en général quelques centaines de Méga Octets, par exemple pour le serveur web nginx : )

Les PCA et PRA (Plan de Continuité d'Activité ou Plan de Reprise d'Activité) deviendraient presque un jeu d'enfant (réplication et déploiement facilités)


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

 
