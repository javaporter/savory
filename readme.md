# Savory
Savory.global is a node.js web app/site using Expressjs with Jade and Sass. Stylesheets are edited in /assets/stylesheets (everything compiled from app) and they automagically compile in /public/assets/stylesheets/app.css.

---

## Installation

- `npm install`
- `gulp`

This app has livereload bundeled with the `gulp` process. To use, install the livereload browser extension and turn it on.

---

## Deployment

This app is deployed via capistrano. You'll need the capistrano-npm gem (`gem install capistrano-npm`). To deploy: `cap deploy production`.
