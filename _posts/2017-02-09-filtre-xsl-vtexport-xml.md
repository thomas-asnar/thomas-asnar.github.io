---
layout: post
title: Ultimate tlist filter VTOM ! Filtre XSL du vtexport XML
date: 2017-02-09 20:45
author: Thomas ASNAR
categories: [xsl, xslt, xml, vtexport, vtom, filtre, tlist]
---
Merci à JOEY de m’avoir inspriré ! :)

# Liste des filtres XSL que je créé au fil des besoins

 * [Toutes les ressources VTOM](http://thomas-asnar.github.io/wp-content/uploads/ResourcesAll.xsl)
 * [Tous les jobs VTOM](http://thomas-asnar.github.io/wp-content/uploads/JobsAll.xsl)
 * [Tous les jobs qui attendent une ressource VTOM](http://thomas-asnar.github.io/wp-content/uploads/JobsExpectedRes.xsl)
 * [Tous les applications qui attendent une ressource VTOM](http://thomas-asnar.github.io/wp-content/uploads/ApplicationsExpectedRes.xsl)

# Pour ceux et celles qui ne connaissent pas

## A quoi ça sert ?

XSLT (eXtensible Stylesheet Language Transformations), défini au sein de la recommandation XSL du W3C, est un langage de transformation XML de type fonctionnel. Il permet notamment de transformer un document XML dans un autre format, tel PDF ou encore HTML pour être affiché comme une page web.

Dans mon cas, appliquée à mon vtexport XML, cette feuille de style sera une sortie texte ! `<xsl:output method="text" encoding="utf-8" />`, utile dans mes scripts batchs.

## Comment ça fonctionne ?

Pour appliquer le fichier XSL au fichier XML vtexport VTOM, on peut faire ça assez simplement avec une class Java (Stylizer) fournie par Oracle.

Si vous voulez plus d’information sur la classe et la télécharger, voici le lien (Oracle Transforming XML Data with XSLT)[https://docs.oracle.com/javase/tutorial/jaxp/xslt/transformingXML.html].

Compiler le code source java pour créer votre class Stylizer.class. A ne faire qu'une fois. La classe doit se trouver dans votre CLASSPATH (variable d'environnement)

```
javac Stylizer.java
```

Lancer la commande pour transformer votre XML avec le fichier XSL

(ajouter les options -Xms512m -Xmx1g  au java si le XML est trop gros)

(ajouter le classpath si vous souhaitez avoir la classe dans un répertoire spécifique)

```
java Stylizer votrefichier.xsl vtorefichier.xml
ou
java -Xms512m -Xmx1g -cp /votrechemincompletcontenantlesclasses Stylizer votrefichier.xsl vtorefichier.xml  
```

Notez que si vous avez une autre manière d'appliquer un filtre XSL sur du XML et de récupérer la sortie d'écran, ça m'intéresse (dans les commentaires svp) - python, PERL, bash, powershell, etc.

## Exemple Fichier XSL : Tous les jobs

```xml
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="text" encoding="utf-8" />
  
  <xsl:param name="delimCSV" select="'£'" />
  <xsl:param name="delimParam" select="';'" />
  <xsl:param name="delimCom" select="' '" />
  <xsl:param name="break" select="'&#xA;'" />
  <!--
  <xsl:value-of select="$delimCSV" />
   -->

  <xsl:template match="/">
	  <xsl:apply-templates select="Domain/Environments/Environment/Applications/Application/Jobs/Job" />
  </xsl:template>

  <!-- All Job node for root node -->
  <xsl:template match="Domain/Environments/Environment/Applications/Application/Jobs/Job">
    <xsl:value-of select="../../../../@name" /><xsl:value-of select="$delimCSV" />              <!-- EnvironmentName -->
    <xsl:value-of select="../../@name" /><xsl:value-of select="$delimCSV" />                    <!-- ApplicationName -->
    <xsl:value-of select="@name" /><xsl:value-of select="$delimCSV" />                          <!-- JobName -->
    <xsl:value-of select="../../@mode" /><xsl:value-of select="$delimCSV" />                    <!-- ApplicationMode -->
    <xsl:value-of select="@mode" /><xsl:value-of select="$delimCSV" />                          <!-- JobMode -->
    <xsl:value-of select="../../@onDemand" /><xsl:value-of select="$delimCSV" />                <!-- ApplicationOnDemand -->
    <xsl:value-of select="@onDemand" /><xsl:value-of select="$delimCSV" />                      <!-- JobOnDemand -->
    <xsl:value-of select="Script/text()" /><xsl:value-of select="$delimCSV" />                  <!-- Script -->
    <xsl:apply-templates select="Parameters/Parameter" /><xsl:value-of select="$delimCSV" />    <!-- Parameters -->
    <xsl:value-of select="../../../../../../@name" /><xsl:value-of select="$delimCSV" />        <!-- DomainName -->
   <xsl:choose>
      <xsl:when test="../../@date">
        <xsl:value-of select="../../@date" />
      </xsl:when>
      <xsl:otherwise>
      	<xsl:value-of select="../../../../@date" />
      </xsl:otherwise>
    </xsl:choose><xsl:value-of select="$delimCSV" />                                            <!-- DateExpName -->
    <xsl:value-of select="../../@comment" /><xsl:value-of select="$delimCom" />
    <xsl:value-of select="@comment" /><xsl:value-of select="$delimCSV" />                       <!-- Comment -->
    <xsl:value-of select="$break" />
  </xsl:template>

  <!-- All Parameter node for Job node -->
  <xsl:template match="Parameters/Parameter">
    <xsl:value-of select="text()" /><xsl:value-of select="$delimParam" />                       <!-- Parameter -->
  </xsl:template>  

</xsl:stylesheet>
```



