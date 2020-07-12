/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-list-theme": {
      name: "rmd-list-theme",
      description:
        "This function is used to quickly get one of the list's theme values. This is really just for the `rmd-list-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/list/src/_functions.scss#L15-L17",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-list-theme-values",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      code: "@function rmd-list-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-list-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-list-theme-values, list);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-list-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the list's theme values.",
      },
    },
    "rmd-list-theme-var": {
      name: "rmd-list-theme-var",
      description:
        "This function is used to get one of the list's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-list-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/list/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "rmd-list-dense-theme", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list-item-base", type: "mixin", packageName: "list" },
        {
          name: "rmd-list-item-dense-theme",
          type: "mixin",
          packageName: "list",
        },
        {
          name: "rmd-list-item-addon-spacing",
          type: "mixin",
          packageName: "list",
        },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-list-theme-values",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      code: "@function rmd-list-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-list-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-list-theme-values,\n    list,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-list-theme-values` map keys to set a value for.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "An optional fallback color to apply. This is set to `null` by default and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the link's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-list-theme": {
      name: "rmd-list-theme",
      description:
        "Creates the styles for one of the list's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/list/src/_mixins.scss#L28-L30",
      usedBy: [
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list-item-base", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-subheader", type: "mixin", packageName: "list" },
      ],
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-list-theme-values",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      code:
        "@mixin rmd-list-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-list-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-list-theme-values,\n    list\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-list-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-list-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-list-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-list-theme-update-var": {
      name: "rmd-list-theme-update-var",
      description:
        "Updates one of the list's theme variables with the new value for the section of your app.",
      source: "packages/list/src/_mixins.scss#L38-L40",
      usedBy: [
        { name: "rmd-option", type: "mixin", packageName: "form" },
        { name: "rmd-list-dense-theme", type: "mixin", packageName: "list" },
        {
          name: "rmd-list-item-dense-theme",
          type: "mixin",
          packageName: "list",
        },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      requires: [
        {
          name: "rmd-theme-update-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-list-theme-values",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      code: "@mixin rmd-list-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-list-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-list-theme-values,\n    list\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The list theme style type to update. This should be one of the `$rmd-list-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-list-unstyled": {
      name: "rmd-list-unstyled",
      description:
        'A "general" use mixin that will remove the default browser styles for a list and apply the optionally provided margin and padding instead.',
      source: "packages/list/src/_mixins.scss#L47-L51",
      usedBy: [{ name: "rmd-list", type: "mixin", packageName: "list" }],
      packageName: "list",
      code: "@mixin rmd-list-unstyled($padding: 0, $margin: 0) { … }",
      sourceCode:
        "@mixin rmd-list-unstyled($padding: 0, $margin: 0) {\n  list-style-type: none;\n  margin: $margin;\n  padding: $padding;\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String|Number",
          name: "padding",
          default: "0",
          description: "The amount of padding to apply.",
        },
        {
          type: "String|Number",
          name: "margin",
          default: "0",
          description: "The amount of margin to apply.",
        },
      ],
    },
    "rmd-list-dense-theme": {
      name: "rmd-list-dense-theme",
      description:
        "Updates all the css variables for the list package to use a dense spec.",
      source: "packages/list/src/_mixins.scss#L59-L66",
      usedBy: [
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-utils-dense", type: "mixin", packageName: "utils" },
      ],
      requires: [
        {
          name: "rmd-list-theme-update-var",
          type: "mixin",
          packageName: "list",
        },
        { name: "rmd-list-theme-var", type: "function", packageName: "list" },
      ],
      packageName: "list",
      examples: [
        {
          code: ":root {\n  @include rmd-list-dense-theme;\n}\n",
          compiled:
            ":root {\n  --rmd-list-font-size: var(--rmd-list-dense-font-size, 0.8125rem);\n  --rmd-list-vertical-padding: var(--rmd-list-dense-vertical-padding, 0.25rem);\n  --rmd-list-horizontal-padding: var(--rmd-list-dense-horizontal-padding, 0);\n}\n",
          type: "scss",
          description: "Example Usage",
        },
      ],
      code: "@mixin rmd-list-dense-theme { … }",
      sourceCode:
        "@mixin rmd-list-dense-theme {\n  @include rmd-list-theme-update-var(\n    font-size,\n    rmd-list-theme-var(dense-font-size)\n  );\n  @include rmd-list-theme-update-var(\n    vertical-padding,\n    rmd-list-theme-var(dense-vertical-padding)\n  );\n  @include rmd-list-theme-update-var(\n    horizontal-padding,\n    rmd-list-theme-var(dense-horizontal-padding)\n  );\n}\n",
      type: "mixin",
    },
    "rmd-list": {
      name: "rmd-list",
      description: "Creates the styles for a list in react-md.\n",
      source: "packages/list/src/_mixins.scss#L69-L87",
      usedBy: [{ name: "react-md-list", type: "mixin", packageName: "list" }],
      requires: [
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        {
          name: "rmd-divider-theme-update-var",
          type: "mixin",
          packageName: "divider",
        },
        { name: "rmd-list-unstyled", type: "mixin", packageName: "list" },
        { name: "rmd-list-theme", type: "mixin", packageName: "list" },
        { name: "rmd-list-dense-theme", type: "mixin", packageName: "list" },
        { name: "rmd-list-theme-var", type: "function", packageName: "list" },
        { name: "rmd-list-line-height", type: "variable", packageName: "list" },
      ],
      packageName: "list",
      code: "@mixin rmd-list { … }",
      sourceCode:
        "@mixin rmd-list {\n  @include rmd-typography(subtitle-1);\n  @include rmd-divider-theme-update-var(\n    inset,\n    rmd-list-theme-var(text-keyline)\n  );\n  @include rmd-list-unstyled(null);\n  @include rmd-list-theme(font-size);\n\n  line-height: $rmd-list-line-height;\n  padding: rmd-list-theme-var(vertical-padding)\n    rmd-list-theme-var(horizontal-padding);\n\n  &--horizontal {\n    display: flex;\n    flex-wrap: nowrap;\n    padding: rmd-list-theme-var(horizontal-padding)\n      rmd-list-theme-var(vertical-padding);\n  }\n\n  &--dense {\n    @include rmd-list-dense-theme;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-list-item-base": {
      name: "rmd-list-item-base",
      description:
        "The base styles required for a `ListItem`. This propbably won't be used externally.\n",
      source: "packages/list/src/_mixins.scss#L91-L98",
      usedBy: [
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-subheader", type: "mixin", packageName: "list" },
      ],
      requires: [
        { name: "rmd-list-theme", type: "mixin", packageName: "list" },
        { name: "rmd-list-theme-var", type: "function", packageName: "list" },
      ],
      packageName: "list",
      code: "@mixin rmd-list-item-base { … }",
      sourceCode:
        "@mixin rmd-list-item-base {\n  @include rmd-list-theme(min-height, item-height);\n\n  align-items: center;\n  display: flex;\n  padding: rmd-list-theme-var(item-vertical-padding)\n    rmd-list-theme-var(item-horizontal-padding);\n  position: relative;\n}\n",
      type: "mixin",
    },
    "rmd-list-item-dense-theme": {
      name: "rmd-list-item-dense-theme",
      description:
        "Updates all the list item css variables to apply to dense theme.",
      source: "packages/list/src/_mixins.scss#L106-L128",
      usedBy: [
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-utils-dense", type: "mixin", packageName: "utils" },
      ],
      requires: [
        {
          name: "rmd-list-theme-update-var",
          type: "mixin",
          packageName: "list",
        },
        { name: "rmd-list-theme-var", type: "function", packageName: "list" },
      ],
      packageName: "list",
      examples: [
        {
          code: ":root {\n  @include rmd-list-item-dense-theme;\n}\n",
          compiled:
            ":root {\n  --rmd-list-item-height: var(--rmd-list-dense-item-height, 2.5rem);\n  --rmd-list-item-medium-height: var(--rmd-list-dense-item-medium-height, 3rem);\n  --rmd-list-item-large-height: var(--rmd-list-dense-item-large-height, 3.5rem);\n  --rmd-list-item-extra-large-height: var(\n    --rmd-list-dense-item-extra-large-height,\n    4rem\n  );\n  --rmd-list-item-three-line-height: var(\n    --rmd-list-dense-item-three-line-height,\n    5rem\n  );\n  --rmd-list-item-secondary-three-line-height: var(\n    --rmd-list-dense-item-secondary-three-line-height,\n    2.25rem\n  );\n}\n",
          type: "scss",
          description: "Example Usage",
        },
      ],
      code: "@mixin rmd-list-item-dense-theme { … }",
      sourceCode:
        "@mixin rmd-list-item-dense-theme {\n  @include rmd-list-theme-update-var(\n    item-height,\n    rmd-list-theme-var(dense-item-height)\n  );\n  @include rmd-list-theme-update-var(\n    item-medium-height,\n    rmd-list-theme-var(dense-item-medium-height)\n  );\n  @include rmd-list-theme-update-var(\n    item-large-height,\n    rmd-list-theme-var(dense-item-large-height)\n  );\n  @include rmd-list-theme-update-var(\n    item-extra-large-height,\n    rmd-list-theme-var(dense-item-extra-large-height)\n  );\n  @include rmd-list-theme-update-var(\n    item-three-line-height,\n    rmd-list-theme-var(dense-item-three-line-height)\n  );\n  @include rmd-list-theme-update-var(\n    item-secondary-three-line-height,\n    rmd-list-theme-var(dense-item-secondary-three-line-height)\n  );\n}\n",
      type: "mixin",
    },
    "rmd-list-item-addon-spacing": {
      name: "rmd-list-item-addon-spacing",
      description:
        "Updates the spacing for a list item addon by updated the `text-spacing` from the `@react-md/icon` package and doing some calculations with the current `text-keyline` within the list.\n\nThis propably shouldn't be used externally.",
      source: "packages/list/src/_mixins.scss#L142-L145",
      usedBy: [{ name: "rmd-list-item", type: "mixin", packageName: "list" }],
      requires: [
        {
          name: "rmd-icon-theme-update-var",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-list-theme-var", type: "function", packageName: "list" },
      ],
      packageName: "list",
      examples: [
        {
          code:
            ".custom-updater {\n  @include rmd-list-item-addon-spacing(rmd-icon-theme-var(size));\n}\n",
          compiled:
            ".custom-updater {\n  --rmd-icon-text-spacing: calc(\n    var(--rmd-list-text-keyline, 4.5rem) -\n      var(--rmd-list-item-horizontal-padding, 1rem) -\n      var(--rmd-icon-size, 1.5rem)\n  );\n}\n",
          type: "scss",
          description: "Example Usage",
        },
      ],
      code: "@mixin rmd-list-item-addon-spacing($subtract) { … }",
      sourceCode:
        "@mixin rmd-list-item-addon-spacing($subtract) {\n  $to-keyline: #{rmd-list-theme-var(text-keyline)} - #{rmd-list-theme-var(\n      item-horizontal-padding\n    )};\n  @include rmd-icon-theme-update-var(\n    text-spacing,\n    calc(#{$to-keyline} - #{$subtract})\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String|Number",
          name: "subtract",
          description: "The amount that should be subracted",
        },
      ],
    },
    "rmd-list-item": {
      name: "rmd-list-item",
      description: "Creates all the styles for a list item.\n",
      source: "packages/list/src/_mixins.scss#L148-L242",
      usedBy: [
        { name: "react-md-list", type: "mixin", packageName: "list" },
        { name: "rmd-tree-item", type: "mixin", packageName: "tree" },
      ],
      requires: [
        { name: "rmd-list-item-base", type: "mixin", packageName: "list" },
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        {
          name: "rmd-list-theme-update-var",
          type: "mixin",
          packageName: "list",
        },
        {
          name: "rmd-typography-line-clamp",
          type: "mixin",
          packageName: "typography",
        },
        { name: "rmd-list-theme", type: "mixin", packageName: "list" },
        {
          name: "rmd-list-item-dense-theme",
          type: "mixin",
          packageName: "list",
        },
        {
          name: "rmd-typography-text-overflow-ellipsis",
          type: "mixin",
          packageName: "typography",
        },
        {
          name: "rmd-list-item-addon-spacing",
          type: "mixin",
          packageName: "list",
        },
        {
          name: "rmd-icon-theme-update-var",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-list-theme-var", type: "function", packageName: "list" },
        { name: "rmd-icon-theme-var", type: "function", packageName: "icon" },
        {
          name: "rmd-avatar-theme-var",
          type: "function",
          packageName: "avatar",
        },
        {
          name: "rmd-list-item-secondary-text-line-height",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      code: "@mixin rmd-list-item { … }",
      sourceCode:
        '@mixin rmd-list-item {\n  @include rmd-list-item-base;\n\n  &--clickable {\n    @include rmd-utils-hide-focus-outline;\n    @include rmd-states-surface;\n  }\n\n  &--disabled {\n    @include rmd-theme(color, text-disabled-on-background);\n\n    pointer-events: none;\n  }\n\n  &--link {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  &--medium {\n    @include rmd-list-theme-update-var(\n      item-height,\n      rmd-list-theme-var(item-medium-height)\n    );\n  }\n\n  &--large {\n    @include rmd-list-theme-update-var(\n      item-height,\n      rmd-list-theme-var(item-large-height)\n    );\n  }\n\n  &--extra-large {\n    @include rmd-list-theme-update-var(\n      item-height,\n      rmd-list-theme-var(item-extra-large-height)\n    );\n  }\n\n  &--three-lines {\n    @include rmd-list-theme-update-var(\n      item-height,\n      rmd-list-theme-var(item-three-line-height)\n    );\n\n    .rmd-list-item__text--secondary {\n      @include rmd-typography-line-clamp;\n      @include rmd-list-theme(max-height, item-secondary-three-line-height);\n\n      line-height: $rmd-list-item-secondary-text-line-height;\n      white-space: normal;\n    }\n  }\n\n  &--dense {\n    @include rmd-list-item-dense-theme;\n  }\n\n  &__text {\n    @include rmd-typography-text-overflow-ellipsis;\n    @include rmd-utils-rtl {\n      margin-left: auto;\n    }\n\n    display: block;\n    flex-grow: 1;\n    // this is so it overlays the background colors from the interaction states\n    z-index: 1;\n\n    &--secondary {\n      @include rmd-theme(color, text-secondary-on-background);\n    }\n  }\n\n  &__addon {\n    flex-shrink: 0;\n\n    &--top {\n      align-self: flex-start;\n    }\n\n    &--bottom {\n      align-self: flex-end;\n    }\n\n    &--before {\n      // this should only be added on the first icon in the list item since it\'s the only\n      // one that should match the "keyline" of the app. The right icon/avatars should\n      // have the existing text icon spacing.\n      @include rmd-list-item-addon-spacing(rmd-icon-theme-var(size));\n    }\n\n    &--avatar-before {\n      @include rmd-list-item-addon-spacing(rmd-avatar-theme-var(size));\n    }\n\n    &--media {\n      @include rmd-icon-theme-update-var(\n        text-spacing,\n        rmd-list-theme-var(media-spacing)\n      );\n      @include rmd-list-theme(width, media-size);\n    }\n\n    &--media-large {\n      @include rmd-list-theme-update-var(\n        media-size,\n        rmd-list-theme-var(media-large-size)\n      );\n    }\n  }\n}\n',
      type: "mixin",
    },
    "rmd-list-subheader": {
      name: "rmd-list-subheader",
      description: "Creates the styles for a subheader within a list.\n",
      source: "packages/list/src/_mixins.scss#L245-L257",
      usedBy: [{ name: "react-md-list", type: "mixin", packageName: "list" }],
      requires: [
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        { name: "rmd-list-item-base", type: "mixin", packageName: "list" },
        { name: "rmd-list-theme", type: "mixin", packageName: "list" },
      ],
      packageName: "list",
      code: "@mixin rmd-list-subheader { … }",
      sourceCode:
        "@mixin rmd-list-subheader {\n  @include rmd-typography(subtitle-2);\n  @include rmd-theme(color, text-secondary-on-background);\n  @include rmd-list-item-base;\n\n  &--inset {\n    @include rmd-list-theme(padding-left, text-keyline);\n    @include rmd-utils-rtl {\n      @include rmd-list-theme(padding-left, item-horizontal-padding);\n      @include rmd-list-theme(padding-right, text-keyline);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "react-md-list": {
      name: "react-md-list",
      description: "Creats all the styles for the list package.\n",
      source: "packages/list/src/_mixins.scss#L260-L274",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-subheader", type: "mixin", packageName: "list" },
        {
          name: "rmd-list-theme-values",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      code: "@mixin react-md-list { … }",
      sourceCode:
        "@mixin react-md-list {\n  @include rmd-theme-create-root-theme($rmd-list-theme-values, list);\n\n  .rmd-list {\n    @include rmd-list;\n  }\n\n  .rmd-list-item {\n    @include rmd-list-item;\n  }\n\n  .rmd-list-subheader {\n    @include rmd-list-subheader;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-list-vertical-padding": {
      name: "rmd-list-vertical-padding",
      description:
        "The amount of padding to place before the first list item and after the last list item in the list.",
      source: "packages/list/src/_variables.scss#L12",
      see: [
        {
          name: "rmd-list-dense-vertical-padding",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-list-dense-vertical-padding": {
      name: "rmd-list-dense-vertical-padding",
      description:
        "The amount of padding to place before the first list item and after the last list item in the list.",
      source: "packages/list/src/_variables.scss#L18",
      packageName: "list",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-list-horizontal-padding": {
      name: "rmd-list-horizontal-padding",
      description:
        "The amount of padding to place to the left and right of all the list items.\nIt is recommended to keep this value at `0` and instead update the `$rmd-list-item-horizontal-padding` instead to get better clickable areas and hover effects on each item.",
      source: "packages/list/src/_variables.scss#L28",
      see: [
        {
          name: "rmd-list-dense-horizontal-padding",
          type: "variable",
          packageName: "list",
        },
        {
          name: "rmd-list-item-horizontal-padding",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-list-dense-horizontal-padding": {
      name: "rmd-list-dense-horizontal-padding",
      description:
        'The amount of padding to place to the left and right of all the list items in a "dense" layout. It is recommended to keep this value at `0` and instead update the `$rmd-list-item-horizontal-padding` instead to get better clickable areas and hover effects on each item.',
      source: "packages/list/src/_variables.scss#L38",
      see: [
        {
          name: "rmd-list-horizontal-padding",
          type: "variable",
          packageName: "list",
        },
        {
          name: "rmd-list-item-horizontal-padding",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "$rmd-list-horizontal-padding",
      compiled: "0",
      overridable: true,
    },
    "rmd-list-line-height": {
      name: "rmd-list-line-height",
      description:
        "The line height to apply to all items within the list. The default typography applied to lists uses the `subtitle-1` typography specs, but it looks better to apply the main text line-height within lists.",
      source: "packages/list/src/_variables.scss#L46",
      usedBy: [{ name: "rmd-list", type: "mixin", packageName: "list" }],
      requires: [
        {
          name: "rmd-typography-value",
          type: "function",
          packageName: "typography",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "rmd-typography-value(body-1, line-height)",
      compiled: "1.5rem",
      overridable: true,
    },
    "rmd-list-font-size": {
      name: "rmd-list-font-size",
      description: "The font size to apply to all items in a list.",
      source: "packages/list/src/_variables.scss#L52",
      requires: [
        {
          name: "rmd-typography-value",
          type: "function",
          packageName: "typography",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "rmd-typography-value(subtitle-1, font-size)",
      compiled: "1rem",
      overridable: true,
    },
    "rmd-list-dense-font-size": {
      name: "rmd-list-dense-font-size",
      description: 'The font size to use for a "dense" list layout.\n',
      source: "packages/list/src/_variables.scss#L56",
      packageName: "list",
      type: "Number",
      value: "0.8125rem",
      overridable: true,
    },
    "rmd-list-item-vertical-padding": {
      name: "rmd-list-item-vertical-padding",
      description:
        'The amount of vertical padding to apply to each list item. This is really only added to help with the default "growing height" case of items since the list item is aligned using a centered flexbox.',
      source: "packages/list/src/_variables.scss#L63",
      packageName: "list",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-list-item-horizontal-padding": {
      name: "rmd-list-item-horizontal-padding",
      description:
        "The amount of horizontal padding to apply to each list item.",
      source: "packages/list/src/_variables.scss#L68",
      usedBy: [
        { name: "rmd-tree-item-at-depth", type: "mixin", packageName: "tree" },
        {
          name: "rmd-tree-item-padding-incrementor",
          type: "variable",
          packageName: "tree",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-list-item-height": {
      name: "rmd-list-item-height",
      description:
        'The default height for a list item. To help create more general lists and layouts this height will be applied as a `min-height` instead of `height` so that it can grow in height based on the content.  When using the `ListItem` component, it will automatically "upgrade" to use `height` when the `secondaryText` or list item "addons" are provided to help enforce the material design specs.',
      source: "packages/list/src/_variables.scss#L78",
      packageName: "list",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-list-item-dense-height": {
      name: "rmd-list-item-dense-height",
      description: "The default height for a dense list item.\n",
      source: "packages/list/src/_variables.scss#L82",
      packageName: "list",
      type: "Number",
      value: "2.5rem",
      overridable: true,
    },
    "rmd-list-item-medium-height": {
      name: "rmd-list-item-medium-height",
      description:
        'The height for a "medium" sized list item. This will normally get applied for any list item that has an icon or avatar.\n',
      source: "packages/list/src/_variables.scss#L87",
      packageName: "list",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-list-item-dense-medium-height": {
      name: "rmd-list-item-dense-medium-height",
      description:
        'The height for a "medium" sized list item that is also dense.\n',
      source: "packages/list/src/_variables.scss#L91",
      packageName: "list",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-list-item-large-height": {
      name: "rmd-list-item-large-height",
      description:
        'The height for a "large" sized list item. This will normally get applied for any list item that has secondary text with no icon, or avatar.\n',
      source: "packages/list/src/_variables.scss#L96",
      packageName: "list",
      type: "Number",
      value: "4rem",
      overridable: true,
    },
    "rmd-list-item-dense-large-height": {
      name: "rmd-list-item-dense-large-height",
      description:
        'The height for a "large" sized list item that is also dense.\n',
      source: "packages/list/src/_variables.scss#L100",
      packageName: "list",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-list-item-extra-large-height": {
      name: "rmd-list-item-extra-large-height",
      description:
        'The height for an "extra large" sized list item. This will normally get applied for any list item that:\n- is single line but has a media\n- has secondary text with an icon, avatar, media, or metadata',
      source: "packages/list/src/_variables.scss#L108",
      packageName: "list",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-list-item-dense-extra-large-height": {
      name: "rmd-list-item-dense-extra-large-height",
      description:
        'The height for a "extra large" sized list item that is also dense.\n',
      source: "packages/list/src/_variables.scss#L112",
      packageName: "list",
      type: "Number",
      value: "4rem",
      overridable: true,
    },
    "rmd-list-item-three-line-height": {
      name: "rmd-list-item-three-line-height",
      description: "The height for a list item with three lines of text.\n",
      source: "packages/list/src/_variables.scss#L116",
      packageName: "list",
      type: "Number",
      value: "5.5rem",
      overridable: true,
    },
    "rmd-list-item-dense-three-line-height": {
      name: "rmd-list-item-dense-three-line-height",
      description:
        "The height for a list item with three lines of text while being dense.\n",
      source: "packages/list/src/_variables.scss#L120",
      packageName: "list",
      type: "Number",
      value: "5rem",
      overridable: true,
    },
    "rmd-list-item-secondary-text-line-height": {
      name: "rmd-list-item-secondary-text-line-height",
      description:
        "The line-height to use for the secondary text within the list item. This is different than the primary text since this can span multiple lines by default.\n",
      source: "packages/list/src/_variables.scss#L126",
      usedBy: [{ name: "rmd-list-item", type: "mixin", packageName: "list" }],
      packageName: "list",
      type: "Number",
      value: "1.42857",
      overridable: true,
    },
    "rmd-list-item-secondary-text-three-line-max-height": {
      name: "rmd-list-item-secondary-text-three-line-max-height",
      description:
        "The max allowed height for the three-line list item's secondary text. You probably don't want to change this value unless you changed the other list item heights.\n",
      source: "packages/list/src/_variables.scss#L132",
      packageName: "list",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-list-item-dense-secondary-text-three-line-max-height": {
      name: "rmd-list-item-dense-secondary-text-three-line-max-height",
      description:
        "The max allowed height for the dense three-line list item's secondary text.\nYou probably don't want to change this value unless you changed the other list item heights.\n",
      source: "packages/list/src/_variables.scss#L138",
      packageName: "list",
      type: "Number",
      value: "2.25rem",
      overridable: true,
    },
    "rmd-list-item-text-keyline": {
      name: "rmd-list-item-text-keyline",
      description:
        "The spacing between the left side of the list item up to the left side of the first character of text. This is normally just used to align the list items with other components.\n",
      source: "packages/list/src/_variables.scss#L144",
      usedBy: [
        {
          name: "rmd-tree-item-padding-base",
          type: "variable",
          packageName: "tree",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-list-item-media-size": {
      name: "rmd-list-item-media-size",
      description:
        "The size to use for media that appears before or after the main content in a list item.\n",
      source: "packages/list/src/_variables.scss#L149",
      packageName: "list",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-list-item-media-large-size": {
      name: "rmd-list-item-media-large-size",
      description:
        "The size to use for large media that appears before or after the main content in a list item.\n",
      source: "packages/list/src/_variables.scss#L154",
      packageName: "list",
      type: "Number",
      value: "6.25rem",
      overridable: true,
    },
    "rmd-list-item-media-spacing": {
      name: "rmd-list-item-media-spacing",
      description:
        "The amount of spacing to place between the main content and media that appears in a list item.\n",
      source: "packages/list/src/_variables.scss#L159",
      packageName: "list",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-list-theme-values": {
      name: "rmd-list-theme-values",
      description:
        'A Map of all the "themeable" parts of the list package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/list/src/_variables.scss#L165-L190",
      usedBy: [
        { name: "rmd-list-theme", type: "function", packageName: "list" },
        { name: "rmd-list-theme-var", type: "function", packageName: "list" },
        { name: "rmd-list-theme", type: "mixin", packageName: "list" },
        {
          name: "rmd-list-theme-update-var",
          type: "mixin",
          packageName: "list",
        },
        { name: "react-md-list", type: "mixin", packageName: "list" },
      ],
      packageName: "list",
      type: "Map",
      value:
        "(\n  vertical-padding: $rmd-list-vertical-padding,\n  horizontal-padding: $rmd-list-horizontal-padding,\n  font-size: $rmd-list-font-size,\n  text-keyline: $rmd-list-item-text-keyline,\n  item-height: $rmd-list-item-height,\n  item-medium-height: $rmd-list-item-medium-height,\n  item-large-height: $rmd-list-item-large-height,\n  item-extra-large-height: $rmd-list-item-extra-large-height,\n  item-three-line-height: $rmd-list-item-three-line-height,\n  item-vertical-padding: $rmd-list-item-vertical-padding,\n  item-horizontal-padding: $rmd-list-item-horizontal-padding,\n  item-secondary-three-line-height: $rmd-list-item-secondary-text-three-line-max-height,\n  dense-font-size: $rmd-list-dense-font-size,\n  dense-vertical-padding: $rmd-list-dense-vertical-padding,\n  dense-horizontal-padding: $rmd-list-dense-horizontal-padding,\n  dense-item-height: $rmd-list-item-dense-height,\n  dense-item-medium-height: $rmd-list-item-dense-medium-height,\n  dense-item-large-height: $rmd-list-item-dense-large-height,\n  dense-item-extra-large-height: $rmd-list-item-dense-extra-large-height,\n  dense-item-three-line-height: $rmd-list-item-dense-three-line-height,\n  dense-item-secondary-three-line-height: $rmd-list-item-dense-secondary-text-three-line-max-height,\n  media-size: $rmd-list-item-media-size,\n  media-spacing: $rmd-list-item-media-spacing,\n  media-large-size: $rmd-list-item-media-large-size,\n)",
      compiled:
        "(\n  vertical-padding: 0.5rem,\n  horizontal-padding: 0,\n  font-size: 1rem,\n  text-keyline: 4.5rem,\n  item-height: 3rem,\n  item-medium-height: 3.5rem,\n  item-large-height: 4rem,\n  item-extra-large-height: 4.5rem,\n  item-three-line-height: 5.5rem,\n  item-vertical-padding: 0.5rem,\n  item-horizontal-padding: 1rem,\n  item-secondary-three-line-height: 3rem,\n  dense-font-size: 0.8125rem,\n  dense-vertical-padding: 0.25rem,\n  dense-horizontal-padding: 0,\n  dense-item-height: 2.5rem,\n  dense-item-medium-height: 3rem,\n  dense-item-large-height: 3.5rem,\n  dense-item-extra-large-height: 4rem,\n  dense-item-three-line-height: 5rem,\n  dense-item-secondary-three-line-height: 2.25rem,\n  media-size: 3.5rem,\n  media-spacing: 1rem,\n  media-large-size: 6.25rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
