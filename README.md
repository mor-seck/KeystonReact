# Pulse.digital - Lepori

Installation de base de développement de technology React + Keystone.

* Initié par @alioune
* Technologie: **React & Keystone**
* Projet Git: https://git.pulse.digital/lepori/lepori
* Intégré le 2020-11-18 9:05:11 AM

## Environnement de développement

Domaine: https://lepori.dev.pulse.digital

* Base de données:
  * Database: **lepori**
  * User: **admin@pulse.digital**
  * Password: **adminpul$e**

Vous pouvez vous connecter sur https://lepori.dev.pulse.digital/admin pour administrer
la base de données.

## Environnement de production

Domaine: https://

* Base de données:
  * Database: **lepori-prod**
  * User: **lepori-prod**
  * Password: **__**

Si le site de production est hébergé chez Pulse.digital alors vous pouvez vous
connecter sur https://lepori.dev.pulse.digital/admin pour administrer la base de données.

## Mise à jour

La mise à jour automatique est simplement désactivé dans la configuration

## Modèle de développement

Ce projet a été configuré de facon a pouvoir gérer de multiples environnements. Ainsi il existe 2 environnements

* **dev**: Qui correspond à la branche principale de développe et qui est associée à la branche Git **develop**
* **prod**: Qui correspond à la branche de déploiement en production et qui est associée à la branche Git **master**

En principe il ne faut pas commiter directement l'une ou l'autre branche mais passer par des Merges Requests (MR).
L’intérêt de la MR est de regrouper du code, une issue, des commits et de mettre en place un mécanisme de review.

Cet intégration n'est pour le moment pas obligatoire chez Pulse.digital pour le moment, mais le deviendra un jour.


## Comment entrer le processus

* Aller dans l'issue que vous devez développer
* Cliquez sur "Create merge request"
* A partir de ce moment une branche a été créer pour les développements de l'issue
* Vous pouvez cloner le répertoire et pointer sur votre branche
* Dans la Merge Request on peut constater le terme **WIP** qui veut dire que le travail est en cours
* Lorsque vous avez fini de travailler vous pouvez enlever le terme **WIP** pour indiquer que le travail est fini
* A ce moment vous devez appeler votre supérieur pour qu'il **review** le travail: par exemple @mykiimike please review
* Une fois que la review est réalisée le code peut être fusionner avec la branche **develop** (qui va lancer le CICD)
* Plus tard on pourra fusionner **develop** avec **master**

Comme indiqué **cette méthodologie n'est pour le moment pas obligatoire**, elle n'est décrite ici que pour
commencer à y penser.

## En cas de modification

Si vous modifiez les données d'authentification du projet (db ou admin) alors il faut les modifier aussi dans ce README.

## Ne pas oublier

Merci de ne pas oublier de saisir vos timesheets avec **/spend**!
