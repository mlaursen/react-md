/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-chip-theme": {
      name: "rmd-chip-theme",
      description:
        "This function is used to quickly get one of the chip's theme values. This is really just for the `rmd-chip-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/chip/src/_functions.scss#L15-L17",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-chip-theme-values",
          type: "variable",
          packageName: "chip",
        },
      ],
      packageName: "chip",
      code: "@function rmd-chip-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-chip-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-chip-theme-values, chip);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-chip-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the chip's theme values.",
      },
    },
    "rmd-chip-theme-var": {
      name: "rmd-chip-theme-var",
      description:
        "This function is used to get one of the chip's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-chip-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/chip/src/_functions.scss#L32-L34",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-chip-theme-values",
          type: "variable",
          packageName: "chip",
        },
      ],
      packageName: "chip",
      code: "@function rmd-chip-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-chip-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-chip-theme-values,\n    chip,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-chip-theme-values` map keys to set a value for.",
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
        description: "one of the chip's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-chip-theme": {
      name: "rmd-chip-theme",
      description:
        "Creates the styles for one of the chip's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/chip/src/_mixins.scss#L26-L28",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-chip-theme-values",
          type: "variable",
          packageName: "chip",
        },
      ],
      packageName: "chip",
      code:
        "@mixin rmd-chip-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-chip-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-chip-theme-values,\n    chip\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-chip-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-chip-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-chip-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-chip-theme-update-var": {
      name: "rmd-chip-theme-update-var",
      description:
        "Updates one of the chip's theme variables with the new value for the section of your app.",
      source: "packages/chip/src/_mixins.scss#L36-L38",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-dark", type: "mixin", packageName: "theme" },
      ],
      requires: [
        {
          name: "rmd-theme-update-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-chip-theme-values",
          type: "variable",
          packageName: "chip",
        },
      ],
      packageName: "chip",
      code: "@mixin rmd-chip-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-chip-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-chip-theme-values,\n    chip\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The chip theme style type to update. This should be one of the `$rmd-chip-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-chip": {
      name: "rmd-chip",
      description: "Creates all the styles for the chip button\n",
      source: "packages/chip/src/_mixins.scss#L41-L152",
      usedBy: [{ name: "react-md-chip", type: "mixin", packageName: "chip" }],
      requires: [
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        {
          name: "rmd-states-surface-selected",
          type: "mixin",
          packageName: "states",
        },
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        { name: "rmd-chip-theme", type: "mixin", packageName: "chip" },
        {
          name: "rmd-icon-theme-update-var",
          type: "mixin",
          packageName: "icon",
        },
        {
          name: "rmd-avatar-theme-update-var",
          type: "mixin",
          packageName: "avatar",
        },
        {
          name: "rmd-progress-theme-update-var",
          type: "mixin",
          packageName: "progress",
        },
        {
          name: "rmd-elevation-transition",
          type: "mixin",
          packageName: "elevation",
        },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        {
          name: "rmd-typography-text-overflow-ellipsis",
          type: "mixin",
          packageName: "typography",
        },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-icon-theme", type: "mixin", packageName: "icon" },
        { name: "rmd-chip-theme-var", type: "function", packageName: "chip" },
        {
          name: "rmd-chip-disable-focus-background-color",
          type: "variable",
          packageName: "chip",
        },
        { name: "rmd-chip-icon-size", type: "variable", packageName: "chip" },
        { name: "rmd-chip-avatar-size", type: "variable", packageName: "chip" },
        {
          name: "rmd-chip-progress-size",
          type: "variable",
          packageName: "chip",
        },
        {
          name: "rmd-chip-progress-width",
          type: "variable",
          packageName: "chip",
        },
        {
          name: "rmd-states-pressed-class-name",
          type: "variable",
          packageName: "states",
        },
        {
          name: "rmd-chip-transition-duration",
          type: "variable",
          packageName: "chip",
        },
        { name: "rmd-chip-box-shadow", type: "variable", packageName: "chip" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "chip",
      code: "@mixin rmd-chip { … }",
      sourceCode:
        '@mixin rmd-chip {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-states-surface(\n    $no-focus-state: $rmd-chip-disable-focus-background-color\n  );\n  @include rmd-states-surface-selected;\n  @include rmd-typography(body-2);\n  @include rmd-chip-theme(height);\n  @include rmd-chip-theme(border-radius);\n  @include rmd-chip-theme(padding-left, large-spacing);\n  @include rmd-chip-theme(padding-right, large-spacing);\n\n  @include rmd-icon-theme-update-var(size, $rmd-chip-icon-size);\n  @if mixin-exists(rmd-avatar-theme-update-var) {\n    @include rmd-avatar-theme-update-var(size, $rmd-chip-avatar-size);\n  }\n  @if mixin-exists(rmd-progress-theme-update-var) {\n    @include rmd-progress-theme-update-var(\n      circular-size,\n      $rmd-chip-progress-size\n    );\n    @include rmd-progress-theme-update-var(\n      circular-width,\n      $rmd-chip-progress-width\n    );\n  }\n\n  align-items: center;\n  border-width: 0;\n  display: inline-flex;\n  flex-shrink: 0;\n  max-width: 100%;\n  position: relative;\n\n  &--solid {\n    @include rmd-elevation-transition(\n      0,\n      4,\n      "&#{$rmd-states-pressed-class-name}",\n      false,\n      $rmd-chip-transition-duration\n    );\n    @include rmd-chip-theme(background-color, solid-background-color);\n    @include rmd-chip-theme(color, solid-color);\n  }\n\n  &--outline {\n    @include rmd-elevation-transition(\n      0,\n      8,\n      "&#{$rmd-states-pressed-class-name}",\n      false,\n      $rmd-chip-transition-duration\n    );\n    @include rmd-chip-theme(background-color, outline-background-color);\n    @include rmd-chip-theme(color, outline-color);\n\n    box-shadow: $rmd-chip-box-shadow rmd-chip-theme-var(outline-border-color);\n  }\n\n  &--themed {\n    @include rmd-chip-theme(background-color, themed-background-color);\n    @include rmd-chip-theme(color, themed-color);\n    @include rmd-icon-theme-update-var(color, currentColor);\n  }\n\n  &--disabled {\n    @include rmd-theme(color, text-disabled-on-background);\n    @include rmd-icon-theme-update-var(color, currentColor);\n  }\n\n  &--solid-disabled {\n    @include rmd-chip-theme(background-color, solid-disabled);\n  }\n\n  &--leading-icon {\n    @include rmd-utils-rtl {\n      @include rmd-chip-theme(padding-left, large-spacing);\n      @include rmd-chip-theme(padding-right, small-spacing);\n    }\n\n    @include rmd-chip-theme(padding-left, small-spacing);\n  }\n\n  &--trailing-icon {\n    @include rmd-utils-rtl {\n      @include rmd-chip-theme(padding-left, medium-spacing);\n      @include rmd-chip-theme(padding-right, large-spacing);\n    }\n\n    @include rmd-chip-theme(padding-right, medium-spacing);\n  }\n\n  &--surrounded {\n    @include rmd-utils-rtl {\n      @include rmd-chip-theme(padding-left, medium-spacing);\n      @include rmd-chip-theme(padding-right, small-spacing);\n    }\n\n    @include rmd-chip-theme(padding-left, small-spacing);\n    @include rmd-chip-theme(padding-right, medium-spacing);\n  }\n\n  &__content {\n    @include rmd-typography-text-overflow-ellipsis;\n\n    flex: 1 1 auto;\n  }\n\n  &__selected-icon {\n    @include rmd-transition(standard);\n\n    max-width: 0;\n    transition: max-width $rmd-transition-standard-time;\n\n    &--visible {\n      @include rmd-icon-theme(max-width, size);\n    }\n  }\n}\n',
      type: "mixin",
    },
    "react-md-chip": {
      name: "react-md-chip",
      description:
        "Creates all the styles for this package as well as defining all the theme CSS variables.\n",
      source: "packages/chip/src/_mixins.scss#L156-L162",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        {
          name: "rmd-chip-theme-values",
          type: "variable",
          packageName: "chip",
        },
      ],
      packageName: "chip",
      code: "@mixin react-md-chip { … }",
      sourceCode:
        "@mixin react-md-chip {\n  @include rmd-theme-create-root-theme($rmd-chip-theme-values, chip);\n\n  .rmd-chip {\n    @include rmd-chip;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-chip-disable-focus-background-color": {
      name: "rmd-chip-disable-focus-background-color",
      description:
        "Boolean if the chip should disable the background color change when it gains keyboard focus. This is disabled by default since the focus shadow looks a bit nicer than the background color changes due to the colors of the chips.",
      source: "packages/chip/src/_variables.scss#L15",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      requires: [
        {
          name: "rmd-states-use-focus-shadow",
          type: "variable",
          packageName: "states",
        },
      ],
      packageName: "chip",
      type: "Boolean",
      value: "$rmd-states-use-focus-shadow",
      compiled: "true",
      overridable: true,
    },
    "rmd-chip-height": {
      name: "rmd-chip-height",
      description: "The height for chips.\n",
      source: "packages/chip/src/_variables.scss#L19",
      packageName: "chip",
      type: "Number",
      value: "2rem",
      overridable: true,
    },
    "rmd-chip-border-radius": {
      name: "rmd-chip-border-radius",
      description: "The border radius to use for all chip types.\n",
      source: "packages/chip/src/_variables.scss#L23",
      packageName: "chip",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-chip-small-spacing": {
      name: "rmd-chip-small-spacing",
      description:
        "The amount of spacing to use when between the left edge and the leading icon/avatar in the chip.\n",
      source: "packages/chip/src/_variables.scss#L28",
      packageName: "chip",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-chip-medium-spacing": {
      name: "rmd-chip-medium-spacing",
      description:
        "The amount of spacing to use between the leading icon/avatar and the chip's text as well as the trailing icon and the chip's edge.\n",
      source: "packages/chip/src/_variables.scss#L33",
      packageName: "chip",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-chip-large-spacing": {
      name: "rmd-chip-large-spacing",
      description:
        "The amount of spacing to use for the chip's edge when there are no leading or trailing icons/avatars.\n",
      source: "packages/chip/src/_variables.scss#L38",
      packageName: "chip",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-chip-icon-size": {
      name: "rmd-chip-icon-size",
      description: "The size to update icons to that appear within a chip.\n",
      source: "packages/chip/src/_variables.scss#L42",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      type: "Number",
      value: "1.125rem",
      overridable: true,
    },
    "rmd-chip-avatar-size": {
      name: "rmd-chip-avatar-size",
      description:
        "The size for avatars that appear within a chip.\n\nNote: This will only be generated if the `@react-md/avatar` package has been installed and imported\n",
      source: "packages/chip/src/_variables.scss#L49",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-chip-progress-size": {
      name: "rmd-chip-progress-size",
      description:
        "The size to use for a circular progress that is being rendered as the `leftIcon` or `rightIcon`. This should be a number smaller than the height of the chip minus vertical padding.",
      source: "packages/chip/src/_variables.scss#L56",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      type: "Number",
      value: "$rmd-chip-icon-size",
      compiled: "1.125rem",
      overridable: true,
    },
    "rmd-chip-progress-width": {
      name: "rmd-chip-progress-width",
      description:
        "The width to use for the circular progress that is being rendered as the `leftIcon` or `rightIcon`.\n",
      source: "packages/chip/src/_variables.scss#L61",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      type: "Number",
      value: "12",
      overridable: true,
    },
    "rmd-chip-themed-background-color": {
      name: "rmd-chip-themed-background-color",
      description:
        "The background color to use for the selected themed state of the chip. This is basically a secondary type of selected state.",
      source: "packages/chip/src/_variables.scss#L69-L75",
      requires: [
        {
          name: "rmd-theme-get-swatch",
          type: "function",
          packageName: "theme",
        },
        { name: "rmd-theme-primary", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "rmd-theme-get-swatch(\n  $rmd-theme-primary,\n  300,\n  false,\n  darken($rmd-theme-primary, 20%),\n  rmd-chip-themed-background-color\n)",
      compiled: "#ba68c8",
      overridable: true,
    },
    "rmd-chip-themed-color": {
      name: "rmd-chip-themed-color",
      description:
        "The color to use for the selected themed state of the chip.",
      source: "packages/chip/src/_variables.scss#L83-L87",
      requires: [
        { name: "rmd-theme-tone", type: "function", packageName: "theme" },
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-themed-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-solid-light-background-color": {
      name: "rmd-chip-solid-light-background-color",
      description:
        'The background color to use for "solid" themed chips when using the light theme.',
      source: "packages/chip/src/_variables.scss#L94",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      requires: [
        { name: "rmd-grey-300", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value: "$rmd-grey-300",
      compiled: "#e0e0e0",
      overridable: true,
    },
    "rmd-chip-solid-light-color": {
      name: "rmd-chip-solid-light-color",
      description:
        'The text color to use for "solid" themed chips when using the light theme.',
      source: "packages/chip/src/_variables.scss#L102-L106",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      requires: [
        { name: "rmd-theme-tone", type: "function", packageName: "theme" },
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-solid-light-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-chip-solid-light-disabled-background-color": {
      name: "rmd-chip-solid-light-disabled-background-color",
      description:
        "The background color to use for a solid disabled chip when using the light theme.",
      source: "packages/chip/src/_variables.scss#L113",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      requires: [
        { name: "rmd-grey-100", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value: "$rmd-grey-100",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-chip-solid-dark-background-color": {
      name: "rmd-chip-solid-dark-background-color",
      description:
        'The background color to use for "solid" themed chips when using the dark theme.',
      source: "packages/chip/src/_variables.scss#L122-L126",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      requires: [
        { name: "rmd-grey-900", type: "variable", packageName: "theme" },
        {
          name: "rmd-theme-dark-elevation",
          type: "variable",
          packageName: "theme",
        },
        {
          name: "rmd-theme-dark-elevation-colors",
          type: "variable",
          packageName: "theme",
        },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-dark-elevation,\n  map-get($rmd-theme-dark-elevation-colors, 12),\n  $rmd-grey-900\n)",
      compiled: "#212121",
      overridable: true,
    },
    "rmd-chip-solid-dark-color": {
      name: "rmd-chip-solid-dark-color",
      description:
        'The text color to use for "solid" themed chips when using the dark theme.',
      source: "packages/chip/src/_variables.scss#L134-L138",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      requires: [
        { name: "rmd-theme-tone", type: "function", packageName: "theme" },
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-solid-dark-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-solid-dark-disabled-background-color": {
      name: "rmd-chip-solid-dark-disabled-background-color",
      description:
        "The background color to use for a solid disabled chip when using the dark theme.",
      source: "packages/chip/src/_variables.scss#L145",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      requires: [
        { name: "rmd-grey-900", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value: "lighten($rmd-grey-900, 2%)",
      compiled: "#262626",
      overridable: true,
    },
    "rmd-chip-solid-background-color": {
      name: "rmd-chip-solid-background-color",
      description: 'The background color to use for "solid" themed chips.',
      source: "packages/chip/src/_variables.scss#L151-L155",
      requires: [
        { name: "rmd-theme-light", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-solid-light-background-color,\n  $rmd-chip-solid-dark-background-color\n)",
      compiled: "#e0e0e0",
      overridable: true,
    },
    "rmd-chip-solid-color": {
      name: "rmd-chip-solid-color",
      description: 'The text color to use for "solid" themed chips.',
      source: "packages/chip/src/_variables.scss#L161-L165",
      requires: [
        { name: "rmd-theme-light", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-solid-light-color,\n  $rmd-chip-solid-dark-color\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-chip-solid-disabled-background-color": {
      name: "rmd-chip-solid-disabled-background-color",
      description:
        'The background color to use for "solid" themed chips that are disabled.',
      source: "packages/chip/src/_variables.scss#L171-L175",
      requires: [
        { name: "rmd-theme-light", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-solid-light-disabled-background-color,\n  $rmd-chip-solid-dark-disabled-background-color\n)",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-chip-outline-light-background-color": {
      name: "rmd-chip-outline-light-background-color",
      description:
        'The background color to use for "outlined" themed chips when using the light theme.',
      source: "packages/chip/src/_variables.scss#L182",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      requires: [
        {
          name: "rmd-theme-light-surface",
          type: "variable",
          packageName: "theme",
        },
      ],
      packageName: "chip",
      type: "Color",
      value: "$rmd-theme-light-surface",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-outline-light-color": {
      name: "rmd-chip-outline-light-color",
      description:
        'The text color to use for "outlined" themed chips when using the light theme.',
      source: "packages/chip/src/_variables.scss#L191-L195",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      requires: [
        { name: "rmd-theme-tone", type: "function", packageName: "theme" },
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-outline-light-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-chip-outline-dark-background-color": {
      name: "rmd-chip-outline-dark-background-color",
      description:
        'The background color to use for "outlined" themed chips when using the dark theme.',
      source: "packages/chip/src/_variables.scss#L204-L208",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      requires: [
        {
          name: "rmd-theme-dark-elevation",
          type: "variable",
          packageName: "theme",
        },
        {
          name: "rmd-theme-dark-elevation-colors",
          type: "variable",
          packageName: "theme",
        },
        {
          name: "rmd-theme-dark-surface",
          type: "variable",
          packageName: "theme",
        },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-dark-elevation,\n  map-get($rmd-theme-dark-elevation-colors, 8),\n  $rmd-theme-dark-surface\n)",
      compiled: "#424242",
      overridable: true,
    },
    "rmd-chip-outline-dark-color": {
      name: "rmd-chip-outline-dark-color",
      description:
        'The text color to use for "outlined" themed chips when using the dark theme.',
      source: "packages/chip/src/_variables.scss#L216-L220",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      requires: [
        { name: "rmd-theme-tone", type: "function", packageName: "theme" },
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-outline-dark-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-outline-background-color": {
      name: "rmd-chip-outline-background-color",
      description: 'The background color to use for "outlined" themed chips.',
      source: "packages/chip/src/_variables.scss#L226-L230",
      requires: [
        { name: "rmd-theme-light", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-outline-light-background-color,\n  $rmd-chip-outline-dark-background-color\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-outline-color": {
      name: "rmd-chip-outline-color",
      description: 'The tect color to use for "outlined" themed chips.',
      source: "packages/chip/src/_variables.scss#L236-L240",
      requires: [
        { name: "rmd-theme-light", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-outline-light-color,\n  $rmd-chip-outline-dark-color\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-chip-outline-border-color": {
      name: "rmd-chip-outline-border-color",
      description: 'The border color to use for "outline" themed chips.',
      source: "packages/chip/src/_variables.scss#L246",
      requires: [
        { name: "rmd-grey-300", type: "variable", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value: "$rmd-grey-300",
      compiled: "#e0e0e0",
      overridable: true,
    },
    "rmd-chip-transition-duration": {
      name: "rmd-chip-transition-duration",
      description:
        "The transition duration for animating the box-shadow elevation for a chip while being pressed by a keyboard.",
      source: "packages/chip/src/_variables.scss#L253",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      requires: [
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "chip",
      type: "Number",
      value: "$rmd-transition-standard-time",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-chip-box-shadow": {
      name: "rmd-chip-box-shadow",
      description:
        "The base box-shadow to apply to chips when outlined. This will normally be used along with a color variable to define a box shadow.\n",
      source: "packages/chip/src/_variables.scss#L258",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      type: "String",
      value: "inset 0 0 0 1px",
      overridable: true,
    },
    "rmd-chip-theme-values": {
      name: "rmd-chip-theme-values",
      description:
        'A Map of all the "themeable" parts of the chip package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/chip/src/_variables.scss#L264-L278",
      usedBy: [
        { name: "rmd-chip-theme", type: "function", packageName: "chip" },
        { name: "rmd-chip-theme-var", type: "function", packageName: "chip" },
        { name: "rmd-chip-theme", type: "mixin", packageName: "chip" },
        {
          name: "rmd-chip-theme-update-var",
          type: "mixin",
          packageName: "chip",
        },
        { name: "react-md-chip", type: "mixin", packageName: "chip" },
      ],
      packageName: "chip",
      type: "Map",
      value:
        "(\n  height: $rmd-chip-height,\n  border-radius: $rmd-chip-border-radius,\n  themed-background-color: $rmd-chip-themed-background-color,\n  themed-color: $rmd-chip-themed-color,\n  solid-background-color: $rmd-chip-solid-background-color,\n  solid-color: $rmd-chip-solid-color,\n  solid-disabled: $rmd-chip-solid-disabled-background-color,\n  outline-background-color: $rmd-chip-outline-background-color,\n  outline-color: $rmd-chip-outline-color,\n  outline-border-color: $rmd-chip-outline-border-color,\n  small-spacing: $rmd-chip-small-spacing,\n  medium-spacing: $rmd-chip-medium-spacing,\n  large-spacing: $rmd-chip-large-spacing,\n)",
      compiled:
        "(\n  height: 2rem,\n  border-radius: 1rem,\n  themed-background-color: #ba68c8,\n  themed-color: #fff,\n  solid-background-color: #e0e0e0,\n  solid-color: #000,\n  solid-disabled: #f5f5f5,\n  outline-background-color: #fff,\n  outline-color: #000,\n  outline-border-color: #e0e0e0,\n  small-spacing: 0.25rem,\n  medium-spacing: 0.5rem,\n  large-spacing: 0.75rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
