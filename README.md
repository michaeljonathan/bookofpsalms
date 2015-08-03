# ![Book of Psalms](http://michaeljonathan.github.io/bookofpsalms/images/logo-1.png)

Book of Psalms is the back-end RESTful API server for [Psalmist](http://github.com/michaeljonathan/psalmist), a simple web app I created to learn [Ember.js](emberjs.com). Book of Psalms is therefore built to serve Ember's REST API (that said, I could have done it the other way around).

Book of Psalms is built on [Sails.js](http://sailsjs.org) wired to a [MongoDB](http://mongodb.com) database. Once running, it will provide an Ember-friendly RESTful API for Psalmist at `http://localhost:1337/`.


## Prerequisites

Psalmist needs the following:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Sails](http://sailsjs.org/) (via`npm -g install sails`)
* [MongoDB](http://mongodb.com)

## Installation

* `git clone https://github.com/michaeljonathan/bookofpsalms`
* `cd bookofpsalms`
* `npm install`

## Running

* `mongod` (if MongoDB is not yet running in the background)
* `sails lift`