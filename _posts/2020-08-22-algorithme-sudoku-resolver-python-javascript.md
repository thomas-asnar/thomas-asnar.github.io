---
layout: post
title: Algorithme pour résoudre un sudoku (python et javascript)
date: 2020-08-22 22:00
author: Thomas ASNAR
comments: true
categories: [javascript, python]
---
Plutôt que de me prendre la tête avec des grilles de sudoku, je me suis pris la tête avec un petit algorithme pour le résoudre.
Je sais que les solutions sur le net pullulent mais je n'arrivais pas à trouver un truc simple qui me plaisait.
Du coup, voici en 20 "vraies" lignes ~ une solution élégante.
[sudoku solver py](http://thomas-asnar.github.io/wp-content/uploads/sudoku_solver.py)  
[sudoku solver js](http://thomas-asnar.github.io/wp-content/uploads/sudoku_solver.js)  

<!--more-->
Honnêtement, peu importe du python ou du js, c'est exactement la même chose. J'ai juste rajouté une fonction d'affichage plus sympa à l'écran. Le script js n'est pas annoté.
```js
/*
  On définit une grille de sudoku en tableau de tableau, sorte de matrice où chaque valeur de cellule est accessible par ses coordonnées grid[y][x]. 
  Par facilité, les coordonnées commencent comme les index de tableau à 0.
  Une cellule vide a pour valeur 0.
  Voici un exemple pour bien comprendre :
  x 0 1 2 | 3 4 5 | 6 7 8 
y -----------------------
0 | 0 0 6 | 0 3 0 | 7 0 0
1 | 0 3 0 | 5 0 8 | 0 9 0
2 | 8 0 0 | 4 0 7 | 0 0 6
-------------------------
3 | 0 9 0 | 0 0 0 | 0 3 0
4 | 0 0 0 | 8 2 9 | 0 0 0
5 | 0 6 0 | 0 0 0 | 0 2 0
-------------------------
6 | 3 0 0 | 6 0 4 | 0 0 9
7 | 0 4 0 | 2 0 1 | 0 8 0
8 | 0 0 1 | 0 5 0 | 2 0 0
*/
// on reporte ça en tableau de tableau donc
let grid = [
  [0,0,6,0,3,0,7,0,0],
  [0,3,0,5,0,8,0,9,0],
  [8,0,0,4,0,7,0,0,6],
  [0,9,0,0,0,0,0,3,0],
  [0,0,0,8,2,9,0,0,0],
  [0,6,0,0,0,0,0,2,0],
  [3,0,0,6,0,4,0,0,9],
  [0,4,0,2,0,1,0,8,0],
  [0,0,1,0,5,0,2,0,0]
]

/* Fonction pour afficher la grille de façon plus sympa dans la console 
------------
|006|030|700
|030|508|090
|800|407|006
------------
|090|000|030
|000|829|000
|060|000|020
------------
|300|604|009
|040|201|000
|001|050|000
*/
function affiche(grid){
  if(!Array.isArray(grid)){
    if(!Array.isArray(grid[0])){
      console.log("Ceci n'est pas une matrice")
      return false
    }
    console.log("Ceci n'est même pas un tableau")
    return false
  }
  grid.forEach( (y, i) => {
    if(i % 3 == 0) console.log("------------")
    line = []
    y.forEach( (v, index) => {
      if(index % 3 == 0) line.push("|")
      line.push(v)
    })
    console.log(line.join(""))
  })
  return true
}

// est-ce que la valeur "n" est possible aux coordonnées (x,y) ? retourne true ou false
function possible(grid, y, x, n){
  // On passe par trois étapes pour vérifier si la valeur "n" est possible : la ligne, la colonne, le carré
  // ex. possible(grid, 1, 4, 1) la réponse est oui pour ce premier test car la valeur 1 n'apparait pas sur la ligne 1, on passe au test suivant
  // 1 | 0 3 0 | 5 0 8 | 0 9 0
  for(let i = 0 ; i < 9 ; i++){
    if(grid[y][i] == n){
      return false
    }
  }
  // ex. possible(grid, 1, 4, 1) la réponse est oui pour ce deuxième test car la valeur 1 n'apparait pas dans la colonne 3, on passe au test suivant
  /*
    4
    -
    3
    0
    0
    -
    0
    2
    0
    -
    0
    0
    5
   */
  for(let i = 0 ; i < 9 ; i++){
    if(grid[i][x] == n){
      return false
    }
  }
  // ex. possible(grid, 1, 4, 1) la réponse est oui pour ce troisième test car la valeur 1 n'apparait pas dans le carré où se trouve (4,1)
  /*
      x 3 4 5
    y -------
    0 | 0 3 0
    1 | 5 0 8
    2 | 4 0 7
    
    Il y a 3 carrés par 3 dans un sudoku.
    On cherche les coordonnées du carré où se trouve notre point (x,y).
    On cherche le point en haut à gauche.
    Ca sera plus facile pour itérer sur toutes les cases à partir de ce point. 
  */
  x0 = Math.floor(x/3) * 3 // J'ai 3 coordonnées x possibles par carré : 0 (accepte x0, x1, x2), 3 (accepte x3, x4, x5), 6 (accepte x6, x7, x8). 
  y0 = Math.floor(y/3) * 3 // Idem
  for(let i = 0 ; i < 3 ; i++){
    for(let j = 0 ; j < 3 ; j++){
      if(grid[y0 + i][x0 + j] == n){
        return false
      }
    }
  }

  return true
}
let solution = 0
// A ma grande surprise, voici la partie qui résout vraiment le sudoku, soit une dizaine de ligne
function solve(grid){
  // On teste toutes les coordonnées de la matrice
  for(let y = 0 ; y < 9 ; y++){
    for(let x = 0 ; x < 9 ; x++){
      if(grid[y][x] == 0){ // On ne vérifie que les cellules vides (valeur == 0)
        for(let n = 1 ; n < 10 ; n++){ // On teste toutes les valeurs possibles de 1 à 9
          if(possible(grid, y, x, n)){ // On a vu dans la fonction précédante comment on testait si une valeur n était possible ou non aux coordonnées (x,y)
            grid[y][x] = n // si c'est possible, on définit cette valeur pour cette case
            solve(grid) // on appelle la fonction encore et encore en éliminant petit à petit les cellules vides
            grid[y][x] = 0 // Il ne faut pas s'y méprendre, on appelle cette ligne de commande à chaque fois, solve() du dessus va s'exécuter en arrière plan et trouvera peut-être une solution où aucune des cellules n'est vide, et donc ne passe plus par cette itération.
            // it's very important to reset the coordinates to 0 (empty) so we can test another value n
            // c'est vraiment important de remettre à zéro les coordonnées (x, y) pour qu'on puisse tester d'autres valeurs n à la prochaine boucle n++
          }
        }
        return
      }
    }
  }
  
  solution += 1
  console.log( "Solution n°" + solution)
  affiche(grid) 
  console.log("#################")
}



console.log("Grille :")
if(!affiche(grid)) return
console.log("")
solve(grid)
```