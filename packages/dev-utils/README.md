# dev-utils

This is a private package within react-md to do common development scripts. The
main use case for this package is so that I don't need to remember to keep
re-installing dev dependencies in each project and all the tsconfig files. All
of it will be handled automatically behind the scenes.

For more info, run `yarn dev-utils --help`.

### Commands

- [x] build (don't need)
- [x] prepublish (don't need -- replaced by release script)
- [x] - `--init`
- [x] styles
- [x] sassdoc
- [x] - `--no-copy` (don't need)
- [x] variables - should go to release script as well
- [x] readmes (with new `copy-shared`)
- [x] sandbox [components...] - (kind of done, need to handle Demo, handle
      aliases, add description, and finish formatting title)
- [x] - `--empty`
- [x] - `--clean-only`
- [x] - `--lookups-only`
- [x] - `--staged`
- [x] libsize
- [x] - `--no-umd`
- [x] - `--no-themes`
- [x] - `--commit`
- [x] - `--stage`
- [x] themes
- [x] watch
- [x] doc-packages (with new `copy-shared`)
- [ ] doc-index
- [x] clean
- [x] configs
- [x] changelogs (with new `copy-shared`)
- [x] rmd-readme (with new `copy-shared`) - should go to release script
- [x] fix-changelogs
- [x] - `--amend`
- [x] - `--stage`
- [ ] release
- [ ] - `-t, --type`
- [ ] - `-b, --blog`
- [ ] - `--yes`
