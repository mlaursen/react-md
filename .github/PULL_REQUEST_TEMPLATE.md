*Before* submitting a pull request, please make sure the following is done:

1. For the repo and create your branch from `release/MAJOR.MINOR.x`. At the time of creating this, react-md is at version
v1.0.0, so you would branch off of `release/1.0.x`.
2. If you have added code that should be tested, please add tests.
3. If you have added new prop types or deprecated prop types, please update the docgen descriptions. When TypeScript is fully
implemented, update the types as well.
4. Ensure that the test suite passes (`npm test`).
5. Ensure that your code lints (`npm run lint`).
  > NOTE: Sass changes rely on the Ruby version of `sass` and `scss-lint` to work.
  

6. If your pull request attempts to fix an existing issue, please reference that issue via a commit message
or the pull request comment.
7. If this is a new feature or component that has a visual impact, please provide any screenshots or images
