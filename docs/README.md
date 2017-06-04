# react-md-docs
This is the documentation website for react-md.

## Getting Started

```bash
$ yarn  # or npm install
$ cp serverConfig.json.example serverConfig.json

# Production
$ npm run build
$ npm start

# Development
$ npm run dev
```


### More Info
The documentation website is really used for testing and debugging the components as well
as having a quick and easy way to look up documentation for the library. This website
depends on the `api` server to be up and running as well. It is usually helpful to also have
the main project's components auto-compiling as well.

So the _real_ setup of running this site for development is more like this:

```bash
mlaursen @ ~/code/react-md
$ npm run scripts:watch

# New Tab
mlaursen @ ~/code/react-md
$ cd api

mlaursen @ ~/code/react-md/api
$ npm run build:watch
$ npm run dev          # new tab

# New Tab
mlaursen @ ~/code/react-md
$ cd docs

mlaursen @ ~/code/react-md/docs
$ npm run dev
```

Note the curent build process depends on the Ruby `scss-lint` tool.  If you want to build the repo without adding a Ruby dependency, and are comfortable giving up linting on your styles, you can run `npm run make-lint-shim` or `yarn run make-lint-shim` to install a placeholder in `./node_modules/.bin/scss-lint` so the `lint:styles` scripts will NOOP successfully and not block the build.

If you are fancy, you can always create a simple script to run all these concurrently. The only problem is
that is is sometimes useful to be able to see the error messages so I was too lazy to do that. Would be neat
to all write to the same file and use `tail` maybe to see the latest output. This isn't my specialty though.
