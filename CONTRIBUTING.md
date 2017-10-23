# Contributing
I am currently the only full-time maintainer of the project, so please feel to contribute! To make it a bit easier for me,
please follow the guidelines below to make the process easy.

Table of Contents
============
- [Getting Started](#getting-started)
  - [Updating an existing fork](#updating-an-existing-fork)
- [Linting](#linting)
- [Testing](#testing)
- [Documentation Server](#documentation-server)
- [Questions](#questions)
- [Creating a new issue](#creating-a-new-issue)
- [Pull Requests](#pull-requests)

## Getting Started
This project should be able to be run with `node >= 6` and [yarn](https://yarnpkg.com). I am currently using a branching model where the `master` branch only gets updated after a new release as well as supporting
minor releases with bugfixes. The current development branch will be the most active major and minor release numbers followed by an
`x`. At the time of writing this file, the current version of `react-md` is `v1.2.4` so the development branch would be
`release/v1.2.x`.

Before you can do any work, make sure to fork the `react-md` repository via GitHub and then you can follow these steps:

```sh
$ git clone https://github.com/<YOUR_USERNAME>/react-md
$ cd react-md
$ yarn
$ cd docs
$ yarn
$ cp .env.example .env
$ cd ..
$ yarn dev
```

The steps above will first clone your forked version of `react-md` and then install all the dev dependencies for the base
`react-md` repo as well as the documentation server. Next, it will copy over an environment variable file that you can edit
to change ports and other things about the documentation server. Finally, it will start watching react-md for changes and
spin up the documentation server.

> Check out the [development scripts](README.md#development-scripts) and the documentation
[table of contents](docs/README.md#table-of-contents) for some more information about the scripts.

#### Updating an existing fork
If you have already forked react-md an have an existing local repository, please update it before you start any changes to limit
merge conflicts:

```sh
$ git remote add upstream https://github.com/mlaursen/react-md

# Update the current development branch
$ git fetch upstream release/1.2.x
$ git rebase         # or git pull to merge
$ yarn
$ cd docs
$ yarn
$ cd ..
```

## Linting
This project uses [eslint](https://eslint.org/) with the [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
rules in place to lint javascript. These eslint rules might be more strict than what you are used to, but it leads to best practice
(in my opinion).

The Sass files are linted using the `Ruby` version of `scss_lint`. Unfortunately this means you will need to have Ruby installed
and install the `scss_lint` gem:

```sh
$ gem install scss_lint
```

I have an issue ([#274](https://github.com/mlaursen/issues/274)) about switching over to the node port so this step can be exlucded.
This hasn't really been worked on because the rules do not switch over nicely and the rules that are in-place for the node port
are not nearly as good.

The project can be linted by running:

```sh
$ yarn lint
```

While running the development server, the Javascript files will autmatically be linted with `webpack`, so you will be unable to
see any new changes if linting fails.

## Testing
When you have fixed a bug or created a new feature, please update or create any related tests. The tests can be run by:

```sh
$ yarn test         # run react-md tests only
$ yarn test:watch   # run react-md tests only in watch mode
$ yarn test:all     # run all tests: react-md and doc server
```

## Documentation Server
The documentation server is probably the most useful thing during development for seeing visual changes. There is a lot
of information about this in the [README](docs/README.md) that I would suggest reading over such as
[creating a new feature](docs/README.md#contributing-example).

## Questions
For general how-to and other non-issues, please use [Slack](https://react-md.herokuapp.com) instead of GitHub issues. If the
herokuapp has run out of hours for the month, feel free to send [me an email](mailto:mlaursen03@gmail.com) requesting access with your
current email. I will add you as soon as possible and let you know once you have access.

## Creating a new issue
If you think you have found a bug or have a good idea for a new feature, please make sure that it has not already been
[reported or fixed](https://github.com/mlaursen/react-md/issues?q=is%3Aissue+is%3Aclosed). If the issue does still not exist,
create an issue with the following format:
```text
[ComponentName] - Descriptive Title
```

This will make searching for component related issues easier and help me group related bugs/features together. For example:

```text
[Autocompletes] - The onAutocomplete callback does not provide the current item
```

Once a great title has been provided, please fill out the issue template with as much information as possible to help me debug
the issue. For example:

```text
### Description
The `Autocomplete`'s `onAutocomplete` does not provide the current item in the callback params. It is only possible to get
the current item by using the `matches` and `matchIndex` params. It would be a lot easier if the current item was already included
in the callback params.

### Images/Screenshots
N/A

### Link to a gist or code sample where the issue can be reproduced
N/A

### Version
- React - *
- React-MD - 1.0.x, 1.1.x, 1.2.x
- Browser - All
```

When you submit an issue, there will be a template that you can fill out so you will not need to copy/paste this information
between different issues.

## Pull Requests
Please keep your pull requests small and focused on a single issue. This will help with the code review process and make it
more likely to be accepted. Once a pull request has been submitted, my [CI](https://travis-ci.org/mlaursen/react-md) will be run
to make sure that all [tests](#testing) and [linting](#linting) have passed.

## License
By contributing your code to to the `mlaursen/react-md` GitHub repository, you agree to license your contribution under the
[MIT License](LICENSE).
