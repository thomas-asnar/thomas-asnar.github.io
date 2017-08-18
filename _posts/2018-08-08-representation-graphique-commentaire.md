---
layout: post
title: Représentation graphique Nom + Commentaire
date: 2017-08-08 22:00:01
author: Thomas ASNAR
categories: [VTOM, graphique, commentaire]
---
Testé en version 5.7

Vous en avez rêvé, ils l'ont fait. Mais on n'était pas au courant. Merci alain pour l'astuce !

Vous n'êtes pas sans savoir que l'on peut changer le mode d'affichage dans l'IHM en cliquant droit dans le vide > Afficher et en choisissant parmis ce qu'on nous propose :

![VTOM IHM Afficher](/wp-content/uploads/vtom_ihm_afficher.jpg)

Mais quand on est pénible comme moi, on aimerait bien avoir le Nom + Commentaire par exemple. Et ça ne nous est pas proposé ! 

Qu'à cela ne tienne, on peut changer la représentation graphique (soit du/des noeuds, soit du graphique par défaut).

![VTOM IHM Représentation Graphique](/wp-content/uploads/vtom_ihm_representation_graphique.jpg)

```
<html>
{prefix}<b>{name}</b>{suffix}<br>{comment}
</html>
```

Et ça nous donne ce joli graphique :

![VTOM IHM Afficher Commentaire](/wp-content/uploads/vtom_ihm_afficher_commentaire.jpg)

Encore eût-il fallu qu'on le susse !

Après si vous êtes joueur comme moi, vous testez d'autres variables :

```
<html>
{prefix}<b>{name}</b>{suffix}<br>{comment}<br>{host}
</html>
```

etc.
