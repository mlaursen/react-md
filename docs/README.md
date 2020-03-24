# react-md documentation
This is the main website for https://react-md.dev/v1 that holds all the documentation
and examples.

Table of Contents
=====
* [Getting Started](#getting-started)
* [Contributing](#contributing)
  * [Contributing Example](#contributing-example)
  * [Checking documentation description](#checking-documentaiton-description)
* [About](#about)
  * [Development startup time](#development-startup-time)
  * [Testing SSR](#testing-ssr)
  * [Making a better server](#making-a-better-server)
  * [Long term caching](#long-term-caching)
  * [Quick Response Times](#quick-response-times)
* [Scripts](#scripts)
* [Production Stack](#production-stack)
  * [SSL Certs](#ssl-certs)
  * [nginx](#nginx)
  * [pm2](#pm2)

## Getting Started
This repo uses `yarn` instead of `npm` as the package manager. If you use npm,
it might not work as expected.

```bash
mlaursen @ ~/code/react-md/docs
$ yarn                  # you should also install dependencies in the parent directory if not done already
$ cp .env.example .env
$ vim .env              # change port to whatever you want

# This one is optional. A webpack-assets.json file must be created before the server will work correctly
# and the dev server will _mock_ one out for you. If the mocking fails, you can fallback to this one. After
# a successful build, you will _almost never_ need to run this command again.
$ yarn build:dev        # Run the dev webpack build to get initial webpack-assets.json to be created

# Start the server with one of the two options
$ yarn dev              # watch react-md source changes and run dev server
$ yarn dev:full         # watch all changes and run dev server
```

> See the [scripts](#scripts) section for all of the other available commands

## Contributing
The most common use case when contributing is to update an example page with some more documentation or a new
feature. This can be done by modifying the logic for how the `ExamplesPage` is rendered for that component.

### Contributing Example
Let's take the `Autocomplete` component for an example. Let's say that you want to add a new feature that allows
the `Autocomplete` to automatically cache results into a Service Worker when calling external APIS (I probably wouldn't
merge this feature in...). Here are the following steps:
1. Create a new file to showcase your example
  ```bash
  $ touch src/components/Components/Autocompletes/<DESCRIPTIVE_NAME_HERE>.jsx

# so for this example...
  $ touch src/components/Components/Autocompletes/ServiceWorkerAPICache.jsx
  ```
2. Update the component `ExamplePage` examples list to include your new example.
  ```jsx
  /* src/components/Components/Autocompletes/index.jsx */
  ...

  import ServiceWorkerAPICache from './ServiceWorkerAPICache';
  import ServiceWorkerAPICacheRaw from '!!raw-loader!./ServiceWorkerAPICache.jsx';

  ...
  const examples = [
    ... existing ...
    {
       title: 'Autocomplete with API Service Worker Caching'
       description: `
    This example will show some stuff about yada yada.
       `,
       code: ServiceWorkerAPICacheRaw,
       children: <ServiceWorkerAPICache />,
    },
  ];
  ```
3. Test and view your example

Every component uses the [ExamplesPage](src/components/ExamplesPage) component to be able to add a title, an
optional description, some source code to be viewed, and the renderable example.

### Checking documentation description
This server relies on the [react-docgen](https://github.com/reactjs/react-docgen) to be able to document
prop types. It is pretty simple since it is just another version of jsdoc. The Sass uses [SassDoc](http://sassdoc.com/)
to be documented.

Once a new prop or sass doc has been added, your server might automatically reload based on the [script](#scripts) you
are running. If it has not restarted, you can check your changes and how it gets formatted by running either
- [yarn sassdoc](#sassdoc)
- [yarn docgen](#docgen)

The reason this is needed is because my documentation server takes in "databases" of JSON data from these scripts, loads
them into memory, and then serves them as needed when the API is called. There probably is some better way to handle this,
but I needed this functionality so that the site's search could also work.

### Digging deeper
This server is separated into a few main parts:

```
src
├── client
├── components
├── constants
├── routes
├── sagas
├── server
├── state
└── utils
```

I ended up going with this structure since I don't like the whole `actions`, `constants`, `actionTypes`, `components`,
`containers`, etc model. Everything related to redux will be in a single file (so the action type constants, action creators,
and reducers). When a component needs to be connected to state, I export a "pure" version and the connected version as the default.
I don't find it helpful to create additional files just to connect to state and with the two exports, it is easy to test either one.
You can most likely ignore all directories except for the `components` directory, but I'll explain the rest if curious.

#### client
This directly will be client only code -- so stuff that runs in the browser. The basics of this folder is to defined
the base styles, configure the redux store, and render the page.

#### components
Will come back to later. This is the "meat" of the repo.

#### constants
This will just be some reusable constants across internal components as well as some `sampleData` that can be reused.

#### routes
This might be badly named, but this folder is more about holding the async or sync route components that should be rendered
from `react-router`. When in development mode, everything will be synchronous. In production, everything in the server will
be synchronous while the client will be asynchronous. If a new component needs to be added, both the [async.js](src/routes/async.js)
and the [sync.js](src/routes/sync.js) will need to be updated.

There are two higher order components that can be used for these routes and you can just look at the source files on how to use them.

#### sagas
I ended up going with `redux-saga` instead of `redux-thunk` to handle most of my action creator logic. My first version of this server
used `redux-thunk`, but I wanted to learn about sagas so I used them here. There probably isn't anything too exciting to talk about
here if you have used sagas before, but this is how I handle my API calls.

#### server
This is the main express server that runs both development and production mode. The server is equipped to handle API calls and server
side rendering when needed. The API server was really only added because I wanted to pre-fetch some data before server rendering. It
might have been better to just split some of the generated documentation into some bundles and load them client side instead of needing
a full server call... but I wanted to learn how to do some node work.

The only "exciting" thing about this server if you are familiar with node is the [GitHub](src/server/api/github.js) proxy settings. I end
up proxying requests to the GitHub API through my server so I can track some of the rate limiting aspects.

#### state
This is where I combine all the logic for the redux state.

```
src/state/
├── __tests__
│   ├── airQuality.js
│   ├── docgens.js
│   ├── locale.js
│   ├── media.js
│   ├── quickNav.js
│   ├── routing.js
│   ├── sassdocFab.js
│   ├── sassdocs.js
│   └── theme.js
├── airQuality.js
├── docgens.js
├── drawer.js
├── github
│   ├── __tests__
│   ├── cache
│   ├── index.js
│   └── rateLimits.js
├── helmet
│   ├── __tests__
│   ├── index.js
│   ├── link.js
│   └── meta.js
├── index.js
├── locale.js
├── media.js
├── quickNav.js
├── routing.js
├── sassdocFab.js
├── sassdocs.js
├── search
│   ├── __tests__
│   ├── index.js
│   ├── meta.js
│   ├── results.js
│   └── searching.js
└── theme.js

8 directories, 29 files
```

The basic idea is that simple state is in a top-level file while more complex and combined states are put
into folders and then separate files.

#### utils
Just your basic utils for generating random data and other stuff for formatting. Not super exciting.


## About
This section will mostly be rants about me making terrible design decisions and being a terrible developer. Enjoy!

This documentation server is probably over-engineered for the amount of traffic I'll get, but it was a neat learning
experience. Some of the things I wanted to solve with this server compared to my previous ones were:
- easier dev startup
- not needing to create additional webpack watchers to run the server
- easier way to test server side rendering
- prevent the screen "flashing" after coming from server side rendering
- load page with custom styles initially
- better SEO
- quicker response time
- long-term caching of static assets

### Development startup time
Before this version, I thought I was "smart" by having a separate server for the API calls to get the documentation
and another server for handling the server side rendering and pre-fetching data. This actually ended up causing a
lot of problems since I also had to transpile all the server code so it could be run on older versions of node. A
typical "dev" setup while adding new features for react-md was opening 5 terminals/tabs and running:

```bash
mlaursen @ ~/code/react-md
$ yarn scripts:watch

# Next tab
mlaursen @ ~/code/react-md/api
$ yarn build:watch

# Next tab
mlaursen @ ~/code/react-md/api
$ yarn dev

# Next tab
mlaursen @ ~/code/react-md/docs
$ yarn build:watch

# Next tab
$ yarn start:dev
```

Whew. And if I ever wanted to run automated tests, I would need another terminal or tab to run the test watcher command!
Now I have a single script that can do everything needed for watching updates, restarted the server on changes, etc. I do
normally go with a 3 tab approach still by doing:

```bash
mlaursen @ ~/code/react-md
$ yarn scripts:watch

# Next tab
mlaursen @ ~/code/react-md/docs
$ yarn start:dev

# Final tab switches between base and docs directories to run tests
```

This could technically be done with the `yarn dev` script, but one of the problems is that I can't send the `rs` (restart) signal
to nodemon to restart the server with this because it uses `concurrently` behind the scenes. If I can figure out a way to use that
and still send keyboard commands to one of the scripts, all would be set.

~~This was mostly fixed by using [webpack-isomorphic-tools](https://github.com/catamphetamine/webpack-isomorphic-tools) with my server.~~
This has now been fixed by using webpack to bundle the server again and allowing hot reloading server side as well. There are probably
better ways of doing this now like [next.js](https://github.com/zeit/next.js/), but I am not a fan of their documentation
at the time so I never bothered learning. (_I'm so sorry_) It also doesn't have any good examples for how to use Sass with it, so
sort of a no-go for me.

### Testing SSR
One of the problems with the last setup was that I also had to basically run a production build to be able to test SSR. The problem
with the production build is that it doesn't warn you when the markup is different between client and server, so this wasn't ideal.
I ended up making some additional changes to the webpack configs to allow a "development" version of the production build, and it was
pretty hacky.

Just like above, switching to `webpack-isomorphic-tools` was part of the solution as well as adding a variable to the `.env` file
to switch between the two. The server will now automatically restart with no additional watchers when the value is changed.

### Making a better server
Webpack is hard. (See more in [Long term caching](#long-term-caching))

#### Screen flashing
Some of the problems faced with server side rendering happens when you split your bundles (as you should). When you have a page
that is server side rendered, you will get that amazing first response time with everything rendered on the page. Perfect! But wait,
you split up your code and you already have `React` rendering your page! While the browser is loading your additional chunks required
for your page, react will have erased the DOM with what it has available and then render it again once they have loaded. Ugh. You now
get an amazing screen "flash" because of this. Before webpack 2, this was pretty hard to fix. Luckily webpack 2 introduced a way to
name dynamic imports with the "magic comment" `/* webpackChunkName: MyDynamicModule */`. This is super helpful because you can use
this along with the `manifest.json` that can be created by webpack so that you can load all the bundles for a page before calling
the first `ReactDOM.render()` in your app. This works great with `react-router@4` since you can use the `StaticRouter` to figure out
which bundles need to be loaded, and pass it to the client.

To help with this, I ended up making a [syncComponent](src/utils/syncComponent.js) and [asyncComponent](src/utils/asyncComponent.js)
HOC. The synchronous component (which should be used by the server) will update the `staticContext` provided by the `StaticRouter` and
push the `chunkName` to a list of bundles that need to be loaded before the page can render. This can be seen in the [routes/sync](src.routes/sync.js)
and [routes/async](src/routes/async.js) files. With all this set up, the final things are just to provide the list of bundles to the client
in a "hidden" window variable, load all the bundles, and then render `React`. Here is the updated [client/index.jsx](src/client/index.jsx) file to show
it in action.

Sadly, there is another step that is needed for all of this. When your page is rendered from the server, you will need to inline the webpack
manifest to help with these chunk loads. Checkout the [renderHtmlPage.js](src/server/utils/renderHtmlPage.js) for some more info on that.

#### Screen flashing (Part Two: Styles)
The next step was to fix the weird delay when a user uses a custom style from the Theme Builder page. I ended up holding the custom styles
in the `localStorage` of the client. This basically meant that the page had to render, then do logic client side to figure out if they had
a custom theme. If they did, I would have to update create a new `<link>` with the custom `href` and inject into the head after the initial
load. This would cause the base styles to be loaded and then flash with the new colors afterwards. I managed to fix this issue by using
[react-helmet](https://github.com/nfl/react-helmet) and switching to cookies instead of `localStorage`. Now that the server has access to the
theme before rendering, I can get `react-helmet` to create the custom `<link>` tag at initial render. Pretty neat stuff!

> See more about `react-helmet` in next section

Some other problems that happened are related to the `ExtractTextPlugin` for webpack. Something that I didn't understand for awhile is that
if the `allChunks` option was not enabled, all the styles would be dynamically loaded and injected after the Javascript loads. This was pretty
terrible when most of my additional styles were small and had no reason to be dynamically loaded. This "feature" is probably super nice when
you create all your styles from the ground up, but when you are using an already existing framework/library for styles, it causes a lot of
page repaints and flashing while these styles are loaded.

#### Better SEO
Part of the problem with the first server is that the page's title was always the same for each page you were on. It wasn't very helpful
when glancing at your tabs to tell what you were looking at. With this server, I used `react-helmet` to dynamically update the page's title
based on the route to give some more context. It is now possible to tell if you are on the home page of react-md, looking at a component's
example/prop type/SassDoc page.

Some other things I changed are that I now attempt to support some of the [Open Graph Protocol](http://ogp.me/) so that react-md can
be linked in other sites with some nice content. This wasn't too big and I haven't fully tested it to see if it did anything since
I don't really use Facebook or Twitter. Oh well.

### Long term caching
Webpack is hard. (Again)

Getting something to compile and produce a build is actually pretty simple in webpack. All you really need is a correct loader for
your filetype and you're set!

```js
import path from 'path';

export default {
  entry: 'src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
};
```

and you're all set!

...
...
...

sorta.

Now how do you handle production builds? How can I make sure that my latest changes will actually
show up on the client since the browser caches data? How do I add CSS/Sass/less? How do I hot reload?
How do I hot reload styles?

Well, now that some more time has passed, [create-react-app](https://github.com/facebook/create-react-app) _is_
probably the way to go for most of these things since it has gotten a lot better since the first few releases. There
is still no native Sass/SCSS support, so you need to create additional tasks to watch with `node-sass` so it gets added to
your app. This is _ok_, but you lose the benefits of having webpack do resolutions for you.

One of the weird problems I've been running into lately is that my styles are being imported in reverse order by the
`ExtractTextWebpackPlugin`, so the `react-md` style overrides require an extra layer of selector precedence to override.
No idea what caused it :/

Anyways, back to long term caching. There is the great feature in `webpack` to automatically create hashes on your chunks
and entry points so that after you do a build, your file names have changed and your changes will be guaranteed to show up
when a user visits your page. However, this ruins your long term caching since this is not based on content in those files
for the hash and each build will generate new hashes even if the content didn't change.

I ended up following a [couple](https://survivejs.com/webpack/optimizing/separating-manifest/)
[of](https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31)
[articles](https://webpack.js.org/guides/caching/) about this and end up going with:
- using the `WebpackMd5Hash` plugin
- using the `ManifestPlugin`
- using the `HashedModuleIdsPlugin`
- extracting the `manifest` code
- inline the `webpack manifest` when being server rendered.

The webpack config was updated to include [these lines](webpack.config.js#L40-L48) for longer hashing and my server rendered
page [inlined the manifiest](src/server/utils/renderHtmlPage.js#L5-L21) in the [head](src/server/utils/renderHtmlPage.js#L99).
This actually allowed for some better bundle loading support and extracting some of the common code out again for smaller bundles.

### Quick Response Times
One of the other goals of this was to get some better response time. This hasn't fully been updated, but I ended up adding service workers
to do additional caching of assets throughout the website. The whole Service Worker thing was a pain though since most of the examples
and tutorials are not about handling server rendered pages (who needs em now anyways?). `create-react-app` has been updated somewhat recently
to include service workers by default using the [sw-precache-webpack-plugin](https://github.com/goldhand/sw-precache-webpack-plugin) which
uses [sw-precache](https://github.com/GoogleChrome/sw-precache) that was created by Google. This plugin is pretty cool since it does most of
the work for you by analyzing your webpack output files and bundles and automatically runs the `sw-precache` script with these assets to cache.

This is really neat until you need to support server rendered pages. There is a `navigateFallback: PUBLIC_PATH + 'index.html'` option which
_seems_ amazing until you want to deal with subsequent visits. If the page is server rendered, you no longer get those benefits and your
`index.html` file is served instead. Once again, this is fine if you are doing client only stuff. Now I started wondered "how in the world can
I get offline access to my website now?".

There is another feature in the `sw-precache-webpack-plugin` that allows you to import other scripts to be used by the Service Worker. I was
**really** hoping this would be the fix, but alas it did not work quite as expected. The `importScripts` can contain a `chunkName` or a `fileName`
to be imported by the Service Worker so you get all the compilation minification through webpack and then it is loaded via the loader. Unfortunately
this doesn't work since the manifest was extracted and the service worker fails. **sigh**

I ended up "fixing" this by creating a small [SWOfflinePlugin](src/utils/SWOfflinePlugin.js) that transpiles the code, minifies it, and then writes
it to the output directory. It isn't super ideal since I don't know how to trigger events correctly yet for displaying offline or normal modes.

## Scripts
* [clean](#clean)
  * [clean:dbs](#cleandbs)
  * [clean:assets](#cleanassets)
* [prebuild](#prebuild)
* [build](#build)
  * [build:dev](#buildev)
* [doc-dbs](#doc-dbs)
* [jsdoc](#jsdoc)
  * [jsdoc:build](#jsdocbuild)
  * [jsdoc:create](#jsdoccreate)
* [docgen](#docgen)
  * [docgen:create](#docgencreate)
* [sassdoc](#sassdoc)
  * [sassdoc:site](#sassdocsite)
* [examples-db](#examples-db)
* [air-quality](#air-quality)
* [watch:all](#watchall)
  * [watch:docgen](#watchdocgen)
  * [watch:sassdoc](#watchsassdoc)
  * [watch:react-md](#watchreact-md)
* [start](#start)
  * [start:dev](#startdev)
  * [start:prod](#startprod)
* [dev](#dev)
  * [dev:full](#devfull)
  * [dev:minimal](#devminimal)
* [test](#test)
  * [test:watch](#testwatch)

### clean
This will clean up any existing assets, generated themes for the website,
and any of the "databases" that have been built. This also runs the [clean:assets](#cleanassets)
script.

> SEE: [jsdoc](#jsdoc), [sassdoc](#sassdoc), or [docgen](#docgen) for more information
about "databases".

### clean:dbs
This will just remove any generated databases except for the airQuality database. See [air-quality](#air-quality) for
more information.

### clean:assets
This will just remove any existing assets or themes.

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

### build:dev
This will build a development version of the website. This is useful if you are really just
debugging server side stuff and the client won't be changing that much.

### jsdoc
This task just runs the `jsdoc:build` followed by `jsdoc:create`.
> SEE: [jsdoc:build](#jsdocbuild) and [jsdoc:create](#jsdoccreate) for more information.

### jsdoc:build
This will run jsdoc on the `react-md/src/js` folder and extract jsdoc for some specific files to get additional
documentation on static component class attributes that are not picked up with `react-docgen`. Examples are the
`Layover.HorizontalAnchors` and `Autocomplete.fuzzyFilter`.This will create a `jsdoc.json` file in the home directory
to be parsed by [jsdoc:create](#jsdoccreate).

### jsdoc:create
This parses the created docgen so that the components can be linked in with these special enums and external functions
for additional documentation.

### docgen
This will run the [jsdoc](#jsdoc) script followed by the [docgen:create](#docgencreate) task. The jsdoc "database" *must*
be created before the `docgen:create` script can be ran.

> SEE: [jsdoc](#jsdoc) or [docgen:create](#docgencreate) for more information.

### docgen:create
This will create a "database" of component documentation that can be used for the API
endpoints. The "database" is just a JSON file of the results of [react-docgen](https://github.com/reactjs/react-docgen)
component's endpoint and it's docgen. This will also create another "database" that is used for searching within the
site for specific component Prop Types or SassDoc.

### sassdoc
This will create a "database" of SassDoc to be used for the SassDoc tabs. Just like the docgen,
it is a simple mapping of the component group to related documentation. This command will also create a SassDoc search
"database" so that functions, mixins, selectors, and variables can be found in the main search.

### sassdoc:site
This will create the https://react-md.dev/v1/sassdoc page with the default settings for SassDoc. This is mostly used
as a fallback for things that are not directly documentable within the main website.

### examples-db
This will create a "database" to be used to search for specific examples in the documentation site.

### air-quality
This will remake the airQuality "database" by fetching the data from the https://data.gov website, parse/format the response,
and limit the number of results. This is really only useful if you need to get some fresher data.

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

### start
This will start the production server. The [build](#build) **must** have been run before the production server can
be started.

> SEE: [start:prod](#startprod) for a simple wrapper to run the build and then start the server immediately.

### start:dev
This will start up the server in development mode. This is helpful if you don't need every watcher running and have already
built the databases or you need to test server code independently so you have access to the `nodemon` `restart` ability. Both
[dev](#dev) and [dev:full](#devfull) end up using this behind the scenes.

The development server will be restarted each time any config file changes, or server related files.

### start:prod
This will run the [build](#build) command followed by the [start](#start). It is really just for testing
the production mode quickly without deploying to my main website.

### dev
This is the second most useful development script. It will only run the [prebuild](#prebuild) script
and concurrently run the [watch:react-md](#watchreact-md) and [start:dev](#startdev). Mostly
use this script if you only need to see the examples changes without any docgen or SassDoc updates.

### dev:full
Whew. This is the most useful development script to use. It will run the [prebuild](#prebuild) script
and then concurrently run all the watchers and start up the dev server.

> SEE: [watch:all](#watchall)

### dev:minimal
This is a script that will remove any existing assets, run the webpack watcher, and start the development
server. This is assuming that all the databases have been built and the react-md code has been compiled
already.

### test
This will run tests only for the documentation server.

### test:watch
This will run the tests in jest watch mode.

## Production Stack
When running the react-md.dev/v1 website for production, my setup is as follows:
- Amazon Linux Micro EC2 Instance
- [letsencrypt](https://letsencrypt.org/) [certbot](https://certbot.eff.org/) for auto SSL cert renewal
- nginx for reverse proxying, SSL, and serving static assets
- express for server side rendering
- [pm2](https://github.com/Unitech/pm2) for running the servers as background processes

### SSL Certs
One of the problems of using the Amazon Linux instance is that certbot has **very** limited support
with it, so it constantly breaks. If the certbot decides to update itself or any security updates
from Amazon, certbot will most likely stop working.

Here are the initial steps of getting certbot setup:
```bash
$ wget https://dl.eff.org/certbot-auto
$ chmod a+x certbot-auto
$ sudo su -
$ mv certbot-auto /usr/local/bin/
```

Once it has been moved to your bin, you can set up new certs with:

```bash
$ sudo su -
$ certbot-auto certonly \
    --debug \
    --standalone \
    -d HOSTNAME.com \
    --pre-hook="service nginx stop" \
    --post-hook="service nginx start"
```

or renew all certs:
```bash
$ sudo su -
$ certbot-only renew \
    --no-self-upgrade
    --debug \
    --pre-hook="service nginx stop" \
    --post-hook="service nginx start"
```

> --debug is the important part. It won't work otherwise.

I end up creating the renewal script to be run twice daily via a cron job.

When certbot breaks, [this thread](https://github.com/certbot/certbot/issues/2872#issuecomment-297845668) and comment
is a good resource. The linked comment has worked the last 2 times it has broken.

### nginx
Right now, I am using nginx to handle the majority of the heavy networking. It has been set up
to handle the gzipping of static content, caching and serving static assets as well as handling
the virtual hosts + SSL certs. All of this _could_ be done via express and additional modules,
but nginx is quite more performant than the node counterparts.

The nginx config files I use can be found in the [nginx folder](src/nginx) if this is interesting.

### pm2
I end up running the current and next versions of the react-md documentation websites with pm2.
There are probably other ways to run node web servers as processes, but this is the easiest way
so far.
