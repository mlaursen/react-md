# Documentation Website

The documentation website for react-md hosted at <https://react-md.dev>. Previews
of the next version are available at <https://next.react-md.dev>.

<!--toc:start-->

- [Documentation Website](#documentation-website)
  - [Installation and Setup](#installation-and-setup)
  - [Commands](#commands)
  - [Development](#development)
  - [Creating or Modifying Demos](#creating-or-modifying-demos)

<!--toc:end-->

## Installation and Setup

Create a fork to clone or clone this repo and change into the repo directory

```sh
mlaursen @ ~/code/
$ git clone https://github.com/mlaursen/react-md.git
$ cd react-md
```

This project uses [volta](https://volta.sh/) to manage the `node` and `pnpm`
versions so install it if needed. Verify the `node` and `pnpm` versions match in
the [package.json](../../package.json#L49-L51).

```sh
mlaursen @ ~/code/react-md/
$ node -v
v20.12.2
$ pnpm -v
9.9.0

# NOTE: These versions should match the `package.json`
# and are just example output
```

Next, install dependencies:

```sh
mlaursen @ ~/code/react-md/
$ pnpm i
```

Next, build the shared packages:

```sh
mlaursen @ ~/code/react-md/
$ pnpm build --filter="./packages/*"
```

Finally, start the dev server:

```sh
mlaursen @ ~/code/react-md/
$ pnpm --filter docs dev
```

The app will be available at <http://localhost:3000>.

## Commands

- `dev` - Starts all the development watchers and the development server
  - `watch-demos` - Watches for any files that have been created, modified, or
    deleted in `src/app/**/(demos)/**` and forces the `page.mdx` to be
    re-written so the demos update
  - `next-dev` - Only starts the development server.
  - `dev-tasks` - Runs the `watch-demos` and `next-dev`
- `lint` - Runs all the linters.
  - `lint-scripts` - Runs `eslint` against all `.ts`, `.tsx`, `.js`, `.jsx`
    files.
  - `lint-styles` - Runs `stylelint` against all `.css` and `.scss` files.
- `typecheck`- Runs all the typecheck commands
  - `typecheck-src` - Only runs the type checker in the `src` directory.
  - `typecheck-scripts` - Only runs the type checker in the `scripts` directory.
- `clean` - Removes all the generated files and dependencies.
  - `clean-static` - Removes the `.turbo`, `.next`, and `node_modules`
    directories.
  - `clean-generated` - Removes the `src/generated` folder
- `build-env` - Runs the following commands
  - `create-env` - Generates a `.env.local` file with some metadata environment
    variables that supports vercel and local development
  - `create-scss-lookup` - Generates the `src/generated/rmdScssLookup.ts` file.
- `build` - Regenerates all the code and builds the production Website.
  - `next-build` - Only builds the production website.
- `start` - Starts the production website.

## Development

If you need to make changes to `@react-md/core` and see them in the
documentation site, open two terminals and run the `dev` commands:

```sh
mlaursen @ ~/code/react-md/
$ pnpm --filter core dev
```

```sh
mlaursen @ ~/code/react-md/
$ pnpm --filter docs dev
```

The first command will compile and enter watch mode for `@react-md/core` while
the second will start the website dev server and regenerate the
`src/generated/rmdScssLookup.ts` file whenever a `.scss` file was modified.

## Creating or Modifying Demos

The demos are created using [MDX](https://mdxjs.com/) and custom plugins
provided by the [docs-generator package](../../packages/docs-generator/README.md).
The demos can be found in the [demos folder](<./src/app/(main)/(markdown)/(demos)/components>)
and editing `page.mdx`. The demos are generated by specifying a custom markdown
code block setting the language to `demo` with no code:

````markdown
```demo source="./MyNewExample.tsx"

```
````

The `source` **must** be a relative path to the demo file to use and will
automatically be converted to an editable code block. Whenever you edit any
files, the code will automatically update.

See the
[rehype-code-blocks plugin](../../packages/docs-generator/src/rehype-code-blocks.ts)
for more information around how the code is generated and additional options
allowed.
