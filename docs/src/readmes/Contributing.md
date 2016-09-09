# Contributing
Here are a few guidelines:

### Questions
For general how-to and other non-issues, please use [gitter](https://gitter.im/mlaursen/react-md)
instead of GitHub issues.

### New Feature or Bug
If you think you have found a bug or a new idea for a feature, please make sure that it has
not already been [reported or fixed](https://github.com/mlaursen/react-md/issues?q=is%3Aissue+is%3Aclosed)
If you have searched through all the existing issues and yours has not been reported,
follow these next steps.

For code issues, please include:
- React version
- Browser and browser version
- Device type (phone, desktop, tablet, etc)

For visual or layout problems, please include images or animated gifs to help explain the
issue.

For new features, please link to the Material Design spec or list all specifications
with images.

### Creating a new Issue
Please begin with the `ComponentName` where appropriate and use a succinct description. This
will help other users find similar issues.

Multiple topics should not be grouped together. It is better to create multiple issues with
a specific target.

### Pull Requests
Please keep your pull requests small and focused on a single issue. This will help with
the code review process and made it more likely to be accepted.

### Getting Started
I am currently using a branching model where `master` only gets updated when a new `npm publish`
occurs. The active branch will be whatever version number that is currently being developed with
an `x`. So if the next release is `v0.3.5`, the active development branch will be `release/0.3.x`.


```bash
$ git clone git@github.com:<username>/react-md.git

$ cd react-md && npm install
```

If you have an existing local repository, please update it before you start to limit
merge conflicts.

```bash
$ cd react-md
$ git remote add upstream git@github.com:mlaursen/react-md.git

# checkout the current release branch
# so if you want to work on v0.3.5
$ git checkout release/0.3.x
$ git fetch upstream release/0.3.x
$ git rebase
$ git checkout -b bugfix/My-Topic-Branch
$ npm update
```

The `jsx` versions of the components will be in the `src` dir and the fully transpiled
and compiled versions will be in `lib`. When creating a pull request, please do not
include the `lib` folder. This will be handled by the `master` branch when a new release
is made.

### Linting
Please follow the linting rules in `.eslintrc`. You can check or hopefully
fix all problems with the following commands.

```bash
$ npm run lint      # basic lint with warnings or errors
$ npm run lint:fix  # attempts to automatically fix problems
```

### Component Documentation
The documentation website uses [react-docgen](https://github.com/reactjs/react-docgen). If
you add a new property, component, or new functionality to an existing property, please
update or add the docgen.

### Testing
Please make sure to create new tests for any new features or bugfixes and
prevent existing tests from failing.

```bash
$ npm run test        # runs all the tests
$ npm run test:watch  # watches for changes in tests and reruns
```

If there are visual changes, you can test them with the [react-md-docs](https://github.com/mlaursen/react-md-docs)
project. In the react-md-docs project run:

```bash
$ npm run browser
```

This will automatically start the `webpack-dev-server`, open the browser, and
watch for changes to live update with.


### License
By contributing your code to to the `mlaursen/react-md` or `mlaursen/react-md-docs` GitHub repository,
you agree to license your contribution under the [MIT License](https://github.com/mlaursen/react-md/blob/master/LICENSE)
