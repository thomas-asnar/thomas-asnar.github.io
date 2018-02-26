---
layout: post
title: Parcel bundler - Dev Web
date: 2018-02-26 20:14
author: Thomas ASNAR
categories: [parcel, parcel-bundler, developpement, web, js, javascript, es6]
---
Après quelques projets web montés avec webpack, je suis tombé sur `parcel-bundler` grace à Grafikart.

C'est tellement plus simple ! Webpack est beaucoup trop compliqué à configurer. On passe plus de temps à peaufiner la conf qu'à écrire l'application.

En gros `parcel-bundler` et vous êtes good to go pour dev en ECMAScript 6  et autres fioritures intéressantes dont on rafole en tant que dev web.

Si vous l'installez localement `npm install -D parcel-bundler`, le binaire pour monter la DEV ou build la dist est sous `node_modules/.bin/parcel`

# Petit exemple

`package.json`
```
{
  "name": "top100exportoracle",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "./node_modules/.bin/parcel build --public-url ./ index.html",
    "dev": "./node_modules/.bin/parcel index.html",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "bootstrap": "^4.0.0",
    "node-sass": "^4.7.2",
    "parcel-bundler": "^1.6.2"
  }
}
```

`index.html`
```
...
<link rel="stylesheet" href="./src/styles/index.scss">
...
<img src="./src/images/logo.png">
...
<script src="./src/js/index.js"></script>
```

`src/index.js` (on se fiche du code, c'est juste pour montrer qu'on peut utiliser du code en ES6, comme avec webpack)
```javascript
class Stats{
    constructor() {
        this.rows = new Array()
        
        this.orderby = ""

        this.vue = "lastexec"
        
        this.filters = {
            'vtenvname': [],
            'appsjobsstopdem': "",
            'vtbegin-to': "",
            'vtbegin-from': ""
        }
        ...
        ...
}
import { getURLAPI } from './confidentials'
var urlAPI = getURLAPI()

let allStats = new Stats()
allStats.setTrHead()
// mise à jour du table header
let trTh = document.createElement("tr")
allStats.trHead.forEach((th, i) => {
    trTh.innerHTML += "<th data-col='"+allStats.trHeadLastExecDataset[i]+"'>" + th + "</th>"
})
...
```

```
    mon package.json ou à la main
    "build": "./node_modules/.bin/parcel build --public-url ./ index.html",
    "dev": "./node_modules/.bin/parcel index.html",
    
npm run build
npm run dev
```

THAT SIMPLE ! 

# Liens utiles

[site officiel avec la documentation](https://parceljs.org)

[Excellente vidéo de Grafikart](https://www.grafikart.fr/tutoriels/javascript/parcel-bundler-985)

