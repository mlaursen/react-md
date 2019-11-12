# Contributing

Here are a few guidelines:

### Questions

For general how-to and other non-issues, please use [Slack](https://react-md.herokuapp.com)
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

When you can, please provide images, videos, or gifs to help explain the issue. This will save me
time on figuring out what the issue is. When there is a new feature, please give example use cases
and a detailed description or point to the Material Design spec.

### Creating a new Issue

Please create the ticket with the format: `[ComponentName] - Descriptive Title`. This will make
searching for component related issues easier and help me group related bugs/features together.

Example:

```text
[Autocomplete] - The Autocomplete does not do ajax calls for me

The `Autocomplete` is a neat component, but it doesn't actually fetch data from the server for me
when the user types. This would be a cool feature because of X, Y, and sometimes Z.
```

### Pull Requests

Please keep your pull requests small and focused on a single issue. This will help with
the code review process and made it more likely to be accepted.

### Getting Started

Before you can do any work, make sure to fork the `react-md` repository via GitHub and then you can
follow these steps.

```bash
$ git clone https://github.com/<YOUR_USERNAME>/react-md

$ cd react-md && yarn
```

If you have an existing local repository, please update it before you start to limit
merge conflicts.

```bash
$ cd react-md
$ git remote add upstream https://github.com/mlaursen/react-md

$ git fetch upstream master
$ git rebase
$ git checkout -b bugfix/My-Topic-Branch
$ yarn
```

The raw source files will be in the `src` directory.

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

If there are any visual changes or you want to test the functionality of a component, you can use the documentation
site and create a new example.

See the documentation's site [README](https://github.com/mlaursen/react-md/tree/v1/docs#react-md-documentation) for information on running the dev server.

### License

By contributing your code to to the `mlaursen/react-md` GitHub repository, you agree to license your contribution under the
[MIT License](https://github.com/mlaursen/react-md/tree/v1/LICENSE).
