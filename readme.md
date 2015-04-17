# Savory
Savory.global is a node.js web app/site using Express (http://expressjs.com) with Jade and Sass. Stylesheets are edited in /assets/stylesheets (everything compiled from app) and they automagically compile in /public/assets/stylesheets/app.css.

---

## Installation

- `npm install`
- `gulp`

Gulp runs on localhost:3000. This app has livereload bundeled with the `gulp` process. To use, install the livereload browser extension and turn it on.

---

## Asset Pipeline

The asset pipeline is fairly std except that images (which don't have to compile) live in /public/assets/images.

---

## Deployment

This app is deployed via capistrano. You'll need the capistrano-npm gem (`gem install capistrano-npm`). This of course assumes you have the proper keys installed on the host.

- `cap dev deploy` will deploy the dev branch to dev.savory.global
- `cap production deploy` will deploy the master to savory.global
 
---

## Prismic.io

The parts of this site that are updated often are pulling content from Prismic. As the site matures, more content can be moved in that direction. The initial goal with this site was to keep a lot of it as static to make it easier to continue to design the site and let it grow organically. And that parts that are meant to be changed quite often (like news) have a way for the end-user to update them within a templated environment. The prismic templates (like news) will absolutely have to be refined as more content is added and new design challenges present themselves. As of now, Prismic's only serious competitor is Contentful, and depending on when this is next updated, it may be worth taking a second look at Contentful before any additional development goes into the Prismic integration. 
