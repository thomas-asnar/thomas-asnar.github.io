---
layout: post
title: Lister en ajax le contenu d'un répertoire Github
date: 2015-02-28 09:14
author: Thomas ASNAR
categories: [ajax, github, lister, répertoire, images]
---
# But du jeu
* Héberger un site de photographies sur les [pages Github](https://pages.github.com/)
* Le site doit pouvoir récupérer dynamiquement les images push sur Github

# Démo 
[Laure Photographies](http://laure-photographies.github.io)

# Structure du site 
* img
  * &lt;prefix&gt;&lt;nom d'un répertoire images&gt;
  * img_dyptique (exemple)
    * image1.jpg
    * image2.jpg

# Méthode : ajax et API Github
Le principe est simple : il faut récupérer les informations du repository via l'API Github en ajax. Pas d'authentification, c'est juste du GET.

Les API Github :
* [repos](https://developer.github.com/v3/repos)
* [trees](https://developer.github.com/v3/git/trees)

