---
layout: post
title: Toutes les options du tengine
date: 2016-02-20 22:44
author: Thomas ASNAR
categories: [ordonnancement, vtom, astuce, vtom.ini, tengine]
---
Une astuce de Fred, simple mais efficace, pour connaitre toutes les options possibles (du vtom.ini) de votre tengine (moteur VTOM) quand on n'a pas la documentation sous la main.

```
strings $TOM_BIN/tengine
```

Faites un grep sur le = ou %s par exemple

