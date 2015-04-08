# Savory
Savory.global is a node.js web app/site using Express (http://expressjs.com) with Jade and Sass. Stylesheets are edited in /assets/stylesheets (everything compiled from app) and they automagically compile in /public/assets/stylesheets/app.css.

---

## Installation

- `npm install`
- `gulp`

This app has livereload bundeled with the `gulp` process. To use, install the livereload browser extension and turn it on.

---

## Asset Pipeline

The asset pipeline is fairly std except that images (which don't have to compile) live in /public/assets/images.

---

## Deployment

This app is deployed via capistrano. You'll need the capistrano-npm gem (`gem install capistrano-npm`). This of course assumes you have the proper keys installed on the host.

- `cap dev deploy` will deploy the dev branch to dev.savory.global
- `cap production deploy` will deploy the master to savory.global
