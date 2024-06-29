# v5 to v6

To start the migration to v6, first run the `to-react-md-imports` codemod to
rename all `@react-md/*` imports to `react-md`. Only a few of the codemods will
work without this prerequisite.

Next, start running the codemods in order to finish the migration:

- `hardcode-scss-variables` - convert the `@react-md/*/dist/scssVariables` into
  hard coded constants and remove the imports. This will throw an error if using
  computed keys
- `icon`:
  - `remove-deprecated-font-icon-props`
- `material-icons` -- Choose one of:
  - `to-svg` - The `Motorcycle` and `PhoneInTalk` icons are only supported as
    material symbols in v6
  - `to-font` - The `Motorcycle` and `PhoneInTalk` icons are only supported as
    material symbols in v6
  - `to-symbol`
- `app-bar`:
  - `remove-class-name-constants`
  - `remove-use-action-class-name`
  - `replace-nav-and-action-with-button`
  - `update-app-bar-props`
  - `update-app-bar-title-props`

Finally (optional), run the `to-core-imports` codemod to improve development
build times by switching to `@react-md/core/{{FILE}}`.
