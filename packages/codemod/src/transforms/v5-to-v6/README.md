# v5 to v6

Run the codemods in the following order to migrate as much as possible to v6:

- `prerequisites`:
  - `to-react-md-imports` - renames all the `@react-md/*` scoped package
    imports to `react-md`. **None of the following codemods will work without
    this being run**.
  - `hardcode-scss-variables` - convert the
    `@react-md/*/dist/scssVariables` into hard coded constants and remove the
    imports. This will throw an error if using computed keys
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
- `autocomplete`:
  - `update-simple-props`
- `badge`:
  - `remove-badge-container`
  - `update-badge`
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
- `dialog`:
  - `remove-nested-dialog-context-provider`
  - `update-dialog-props`
- `divider`:
  - `vertical-divider-to-divider`
- `expansion-panel`:
  - `update-expansion-panel-props`
  - `use-panels-to-use-expansion-panel`
- `form`:
  - `replace-with-form-message-components`
  - `update-file-input-props`
  - `update-password-props`
  - `update-select-api`
  - `update-slider-and-range-slider`
  - `update-text-field-container-props`
  - `update-use-text-field-api`
- `link`:
  - `update-link-props`
- `list`:
  - `update-list-item-props`
- `media`:
  - `update-media-components`
- `menu`:
  - `replace-menu-item-link`
  - `update-use-context-menu-api`
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
- `tabs`:
  - `tabs/update-tabs-api`
- `tooltip`:
  - `tooltip/convert-use-tooltip`
  - `tooltip/remove-tooltipped-component`
  - `tooltip/update-tooltip-props`
- `transition`:
  - `update-scale-transition`
- `tree`:
  - `everything`:
    - `get-item-props-to-render-component`
    - `item-renderer-to-render-component`
    - `update-simple-types`
    - `update-tree-props`
    - `use-tree-hooks`
- `typography`:
  - `remove-removed-types`
  - `update-text-container-props`
  - `update-typography-props`
- `utils`:
  - `dir-to-writing-direction-provider`
  - `nearest-parameters-to-object`
  - `remove-scroll-listener`
  - `update-resize-listener`
  - `update-search-functions`
  - `update-use-resize-observer-api`
  - `update-use-toggle-api`
  - `within-range-parameters-to-object`

Once the migration is complete, an optional `post-optimizations` codemod is available:

- `post-optimizations`:
  - `to-core-imports` - improves development build speeds by switch back from
    `react-md` to `@react-md/core/{{FILE}}`
