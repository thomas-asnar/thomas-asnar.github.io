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

J'utilise Docker pour l'environenemnt de test (voir mon tuto sur Docker : 

Et python pour le code d'export des consignes VTOM.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kkIw48L9EA0" frameborder="0" allowfullscreen></iframe>


Code et commandes utilisés : 

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
