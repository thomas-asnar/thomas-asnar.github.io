---
layout: post
title: Formules excel
date: 2017-01-01 00:00:00
author: Thomas ASNAR
categories: [excel, formule]
---
Recherche dans une feuille qui check si une de ces colonnes (test de chaque ligne d'une colonne IP Adresse) est présente dans deux feuilles différentes (correspondance adresse)

Les formules présentes pourraient être utile pour : 
 * supprimer une retour chariot, saut de ligne, d'une cellule à plusieurs lignes
 * trouver des valeurs identiques dans des colonnes différentes
 * modifier la valeur d'une cellule

```
=SI.NON.DISP(
  SI.NON.DISP(
    SI.NON.DISP(
      RECHERCHEV(
        GAUCHE(
          SUBSTITUE([@adresses];"0.0.0.0";"");
          CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";"")) - 1
        );
        LastExec!$S:$S;
        1;
        FAUX
      );
      RECHERCHEV(
        GAUCHE(
          SUBSTITUE([@adresses];"0.0.0.0";"");
          CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";"")) - 1
        );
        Tableau2[[#Tout];[IP]:[IP]];1;FAUX
      )
    );
    SI.NON.DISP(
      RECHERCHEV(
        GAUCHE(
          DROITE(
            SUBSTITUE([@adresses];"0.0.0.0";"");
            CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";""))
          );
          CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";"")) - 1
        );
        LastExec!$S:$S;
        1;
        FAUX
      );
      RECHERCHEV(
        GAUCHE(
          DROITE(
            SUBSTITUE([@adresses];"0.0.0.0";"");
            CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";""))
          );
          CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";"")) - 1
        );
        Tableau2[[#Tout];[IP]:[IP]];
        1;
        FAUX
      )
    )
  );
  SI.NON.DISP(
    RECHERCHEV(
      GAUCHE(
        DROITE(
          DROITE(
            SUBSTITUE([@adresses];"0.0.0.0";"");
            CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";""))
          );
          CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";""))
        );
        CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";"")) - 1
      );
      LastExec!$S:$S;
      1;
      FAUX
    );
    RECHERCHEV(
      GAUCHE(
        DROITE(
          DROITE(
            SUBSTITUE([@adresses];"0.0.0.0";"");
            CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";""))
          );
          CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";""))
        );
        CHERCHE(CAR(10);SUBSTITUE([@adresses];"0.0.0.0";"")) - 1
      );
      Tableau2[[#Tout];[IP]:[IP]];
      1;
      FAUX
    )
  )
)
```
