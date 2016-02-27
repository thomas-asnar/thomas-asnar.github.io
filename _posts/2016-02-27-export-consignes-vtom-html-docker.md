---
layout: post
title: VTOM export consigne html - Docker et python 
date: 2016-02-27 08:44
author: Thomas ASNAR
categories: [ordonnancement, vtom, astuce, consignes, python, docker]
---
Voici mon premier Tuto en image ! soyez indulgent ! 
Si ça plait, j'en ferai d'autres (mieux, avec le son etc)

Ce tuto permet d'exporter les consignes VTOM.

J'utilise Docker pour l'environenemnt de test (voir mon tuto sur Docker : [Environnement de test VTOM avec Docker](https://thomas-asnar.github.io/docker-installation-serveur-vtom-test/) )

Et python pour le code d'export des consignes VTOM.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kkIw48L9EA0" frameborder="0" allowfullscreen></iframe>


Code et commandes utilisés : 

```bash
# construire l'image à partir du DockerFile
docker built <répertoire>

# lister les images docker
docker images

# lancer un conteneur de votre image en interactif tty et en redirigeant les ports de votre machine vers le conteneur (IHM)
docker run -ti -p 30007-30008:30007-30008 <nomImage|ID>

# les instances de container qui sont en cours
docker ps

# connaitre l'adresse IP de votre machine docker (utile sous Windows)
docker-machine ip

# pour donner un nom à votre image
docker tag imageID imageName

# pour supprimer l'image
docker rmi -f monImage

# Export de la base VTOM en xml
vtexport -x > /var/tmp/vtexport.xml
```

```python
import encodings
from lxml import etree
tree = etree.parse('/var/tmp/vtexport.xml')

for Instruction in tree.xpath('/Domain/Instructions/Instruction'):
		nameFileConsigne = Instruction.get('name')
		for Content in Instruction.xpath('Content'):
			f = open(nameFileConsigne +  ".html","w")
			s = Content.text
			s = s.decode('base64').decode('zlib')
			f.write(s)
			f.close
```
