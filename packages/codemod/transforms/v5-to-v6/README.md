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
- `button`:
  - `remove-unused-props`
  - `rename-button-theme-class-names`
  - `rename-fab`
  - `rename-unstyled-button`
- `card`:
  - `card-actions-to-card-footer`
  - `remove-deprecated-card-props`
  - `update-card-content-props`
  - `update-card-header-props`
  - `update-card-subtitle-props`
  - `update-card-title-props`
- `chip`:
  - `update-chip-props`
- `divider`:
  - `vertical-divider-to-divider`
- `link`:
  - `update-link-props`
- `overlay`:
  - `update-overlay-props`
- `portal`:
  - `use-new-portal-api`
- `progress`:
  - `update-circular-progress-props`
- `table`:
  - `update-table-cell-props`
  - `update-table-checkbox-props`
  - `caption-to-typography`
- `transition`:
  - `update-scale-transition`
- `typography`:
  - `remove-removed-types`
  - `update-text-container-props`
  - `update-typography-props`

Finally (optional), run the `to-core-imports` codemod to improve development
build times by switching to `@react-md/core/{{FILE}}`.

## TODO - Codemods

- [ ] alert
- [x] app-bar
- [ ] autocomplete
- [x] avatar - None!
- [ ] badge
- [x] button
- [x] card
- [x] chip
- [ ] dialog
- [x] divider
- [ ] elevation ?
- [ ] expansion-panel
- [ ] form
- [x] icon
- [ ] layout
- [x] link
- [ ] list
- [x] material-icons
- [ ] media
- [ ] menu
- [x] overlay
- [x] portal
- [x] progress
- [ ] sheet
- [ ] states
- [x] table
- [ ] tabs
- [ ] theme ?
- [ ] tooltip
- [x] transition
- [ ] tree
- [x] typography
- [ ] utils

Good demos to try to auto convert:

- Tree - Customizing Tree Items
- AutoComplete - Using Object Data Sets
