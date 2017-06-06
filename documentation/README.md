# react-md documentation
This is the main website for https://react-md.mlaursen.com that holds all the documentation
and examples.

Table of Contents
=====
* [Getting Started](#getting-started)
* [About](#about)
* [Contributing](#contributing)
* [Scripts](#scripts)

## Getting Started
This repo uses `yarn` instead of `npm` as the package manager. If you use npm,
it might not work as expected.

```bash
mlaursen @ ~/code/react-md/documentation
$ yarn
$ cp .env.example .env
$ vim .env              # change port to whatever you want
$ yarn dev              # watch all changes and run dev server
$ yarn dev:minimal      # watch react-md source changes and run dev server
```

## About

## Contributing

## Scripts
* [clean](#clean)
* [prebuild](#prebuild)
* [build](#build)
* [docgen](#docgen)
* [sassdoc](#sassdoc)
  * [sassdoc:site](#sassdocsite)
* [start](#start)
  * [start:dev](#startdev)
  * [start:prod](#startprod)
* [dev](#dev)
  * [dev:minimal](#devminimal)
* [watch:all](#watchall)
  * [watch:docgen](#watchdocgen)
  * [watch:sassdoc](#watchsassdoc)
  * [watch:react-md](#watchreact-md)
* [test](#test)
  * [test:watch](#testwatch)

### clean
This will clean up any existing assets, generated themes for the website,
and any of the "databases" that have been built.

> SEE: [sassdoc](#sassdoc) or [docgen](#docgen) for more information
about "databases".

### prebuild
This script automatically gets run before the [build](#build) script. It will
run (in order):
* [clean](#clean)
* [sassdoc:site](#sassdoc-site)
* [docgen](#docgen)
* [sassdoc](#sassdoc)

### build
This will build the website for production. All the files will be bundled and
minified. In addition, all the "databases" will be created for searching and documentation.
Once it has been built, you can run [start](#start) to run the production server
with server side rendering.

> SEE: [sassdoc](#sassdoc) or [docgen](#docgen) for more information
about "databases".

### docgen
This will create a "database" of component documentation that can be used for the api
endpoints. The "database" is just a JSON file of the results of [react-docgen](https://github.com/reactjs/react-docgen)
component's endpoint and it's docgen. This will also create another "database" that is used for searching within the
site for specific component Prop Types or SassDoc.

### sassdoc
This will create a "database" of SassDoc to be used for the SassDoc tabs. Just like the docgen,
it is a simple mapping of the component group to related documentation. This command will also create a SassDoc search
"database" so that functions, mixins, selectors, and variables can be found in the main search.

### sassdoc:site
This will create the https://react-md.mlaursen.com/sassdoc page with the default settings for sassdoc. This is mostly used
as a fallback for things that are not directly documentable within the main website.

### start
This will start the production server. The [build](#build) **must** have been run before the production server can
be started.

> SEE: [start:prod](#startprod) for a simple wrapper to run the build and then start the server immediately.

### start:dev
This will start up the server in development mode. This is helpful if you don't need every watcher running and have already
built the databases or you need to test server code independently so you have access to the `nodemon` `restart` ability. Both
[dev](#dev) and [dev:minimal](#devminimal) end up using this behind the scenes.

The development server will be restarted each time any config file changes, or server related files.

### start:prod
This will run the [build](#build) command followed by the [start](#start). It is really just for testing
the production mode quickly without deploying to my main website.

### dev
Whew. This is the most useful development script to use. It will run the [prebuild](#prebuild) script
and then concurrently run all the watchers and start up the dev server.

> SEE: [watch:all](#watchall)

### dev:minimal
This is the second most useful development script. It will only run the [prebuild](#prebuild) script
and concurrently run the [watch:react-md](#watchreact-md) and [start:dev](#startdev). Mostly
use this script if you only need to see the examples changes without any docgen or SassDoc updates.

### watch:all
This will run a watcher for rebuilding the docgen and SassDoc databases as well as recompiling the react-md
source code into the `lib/` folder.

### watch:docgen
This will create a watcher for the [docgen](#docgen) script and rebuild the "database" when a component's
source code has changed. This isn't completely optimized since it doesn't check differences in content before
writing.

### watch:sassdoc
This will create a watcher for the [sassdoc](#sassdoc) script and rebuild the "database" when a component's
source code has changed. This isn't completely optimized since it doesn't check differences in content before
writing.

### watch:react-md
This will just recompile a changed react-md source file into the `lib/` folder so the changes can be seen in the documentation
site.

### test
This will run tests only for the documentation server.

### test:watch
This will run the tests in jest watch mode.
