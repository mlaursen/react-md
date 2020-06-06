/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-form-theme": {
      name: "rmd-form-theme",
      description:
        "This function is used to quickly get one of the form's theme values. This is really just for the `rmd-form-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/form/src/_functions.scss#L15-L17",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-form-theme-values",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@function rmd-form-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-form-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-form-theme-values, form);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-form-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the form's theme values.",
      },
    },
    "rmd-form-theme-var": {
      name: "rmd-form-theme-var",
      description:
        "This function is used to get one of the form's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-form-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/form/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "rmd-floating-label", type: "mixin", packageName: "form" },
        {
          name: "rmd-native-select-container",
          type: "mixin",
          packageName: "form",
        },
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-text-field-addon", type: "mixin", packageName: "form" },
        { name: "rmd-textarea-container", type: "mixin", packageName: "form" },
        { name: "rmd-toggle-dense-theme", type: "mixin", packageName: "form" },
        { name: "rmd-switch", type: "mixin", packageName: "form" },
      ],
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-form-theme-values",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@function rmd-form-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-form-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-form-theme-values,\n    form,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-form-theme-values` map keys to set a value for.",
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
        type: "Color|String|Number",
        description: "one of the form's theme values.",
      },
    },
  },
  mixins: {
    "rmd-form-theme": {
      name: "rmd-form-theme",
      description:
        "Creates the styles for one of the form's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/form/src/_functions.scss#L47-L49",
      usedBy: [
        { name: "rmd-label", type: "mixin", packageName: "form" },
        { name: "rmd-floating-label", type: "mixin", packageName: "form" },
        {
          name: "rmd-native-select-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-select", type: "mixin", packageName: "form" },
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-text-field", type: "mixin", packageName: "form" },
        { name: "rmd-text-field-addon", type: "mixin", packageName: "form" },
        { name: "rmd-textarea", type: "mixin", packageName: "form" },
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
        { name: "rmd-toggle-icon", type: "mixin", packageName: "form" },
        { name: "rmd-switch", type: "mixin", packageName: "form" },
        { name: "rmd-switch-input", type: "mixin", packageName: "form" },
      ],
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-form-theme-values",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code:
        "@mixin rmd-form-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-form-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-form-theme-values,\n    form\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-form-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-form-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-form-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-form-theme-update-var": {
      name: "rmd-form-theme-update-var",
      description:
        "Updates one of the form's theme variables with the new value for the section of your app.",
      source: "packages/form/src/_functions.scss#L57-L59",
      usedBy: [
        { name: "rmd-floating-label", type: "mixin", packageName: "form" },
        {
          name: "rmd-native-select-container",
          type: "mixin",
          packageName: "form",
        },
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-textarea-container", type: "mixin", packageName: "form" },
        { name: "rmd-password", type: "mixin", packageName: "form" },
        { name: "rmd-toggle-dense-theme", type: "mixin", packageName: "form" },
        { name: "rmd-switch", type: "mixin", packageName: "form" },
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
          name: "rmd-form-theme-values",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-form-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-form-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-form-theme-values,\n    form\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The form theme style type to update. This should be one of the `$rmd-form-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-fieldset": {
      name: "rmd-fieldset",
      description: "Creates the base styles for a simple fieldset element.\n",
      source: "packages/form/src/_mixins.scss#L16-L31",
      usedBy: [{ name: "react-md-form", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        { name: "rmd-utils-sr-only", type: "mixin", packageName: "utils" },
      ],
      packageName: "form",
      code: "@mixin rmd-fieldset { … }",
      sourceCode:
        "@mixin rmd-fieldset {\n  &--unstyled {\n    border: 0;\n    margin: 0;\n    min-width: 0; // just so it can shrink correctly in flex or grid\n    padding: 0;\n  }\n\n  &__legend {\n    @include rmd-typography(body-1);\n\n    &--sr-only {\n      @include rmd-utils-sr-only;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "react-md-form": {
      name: "react-md-form",
      description:
        "Creates the styles for forms within react-md. This requires either the `rmd-form-use-font-forms` or `rmd-form-use-svg-forms` variables to be enabled to generate any styles.\n",
      source: "packages/form/src/_mixins.scss#L36-L54",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        { name: "react-md-file-input", type: "mixin", packageName: "form" },
        { name: "react-md-label", type: "mixin", packageName: "form" },
        { name: "react-md-toggle", type: "mixin", packageName: "form" },
        { name: "react-md-text-field", type: "mixin", packageName: "form" },
        { name: "react-md-select", type: "mixin", packageName: "form" },
        { name: "rmd-fieldset", type: "mixin", packageName: "form" },
        {
          name: "rmd-form-theme-values",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin react-md-form { … }",
      sourceCode:
        "@mixin react-md-form {\n  $omit: (\n    addon-top label-left-offset label-top-offset label-active-background-color\n      label-active-padding text-offset text-padding-left text-padding-right\n      text-padding-top\n  );\n  @include rmd-theme-create-root-theme($rmd-form-theme-values, form, $omit);\n\n  @include react-md-file-input;\n  @include react-md-label;\n  @include react-md-toggle;\n  @include react-md-text-field;\n  // has to come after text field since it overrides some of the\n  // text-field-container styles\n  @include react-md-select;\n\n  .rmd-fieldset {\n    @include rmd-fieldset;\n  }\n}\n",
      type: "mixin",
    },
    "react-md-file-input": {
      name: "react-md-file-input",
      description: "",
      source: "packages/form/src/file-input/_mixins.scss#L9-L29",
      usedBy: [{ name: "react-md-form", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-states-focus-shadow",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-states-theme-update-var",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-states-theme-var",
          type: "function",
          packageName: "states",
        },
      ],
      packageName: "form",
      code: "@mixin react-md-file-input { … }",
      sourceCode:
        '@mixin react-md-file-input {\n  .rmd-file-input {\n    @include rmd-states-focus-shadow("&:focus + .rmd-file-input-label");\n    @include rmd-utils-keyboard-only {\n      &:focus + .rmd-file-input-label {\n        @include rmd-states-theme-update-var(\n          background-color,\n          rmd-states-theme-var(focus-color)\n        );\n      }\n\n      &:hover {\n        @include rmd-states-theme-update-var(\n          background-color,\n          rmd-states-theme-var(hover-color)\n        );\n      }\n    }\n\n    height: 0.1px;\n    opacity: 0;\n    overflow: hidden;\n    position: absolute;\n    width: 0.1px;\n    z-index: -1;\n  }\n}\n',
      type: "mixin",
    },
    "rmd-label": {
      name: "rmd-label",
      description:
        "Creates the base styles for a `<label>` element as well as all the different states a label can be in.\n",
      source: "packages/form/src/label/_mixins.scss#L14-L33",
      usedBy: [{ name: "react-md-label", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        { name: "rmd-label-font-size", type: "variable", packageName: "form" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-label { … }",
      sourceCode:
        "@mixin rmd-label {\n  @include rmd-typography(body-1);\n  @include rmd-transition(standard);\n\n  display: inline-flex;\n  font-size: $rmd-label-font-size;\n  transition: color $rmd-transition-standard-time;\n\n  &--active {\n    @include rmd-form-theme(color, active-color);\n  }\n\n  &--error {\n    @include rmd-form-theme(color, error-color);\n  }\n\n  &--disabled {\n    @include rmd-form-theme(color, disabled-color);\n  }\n}\n",
      type: "mixin",
    },
    "rmd-floating-label": {
      name: "rmd-floating-label",
      description: "",
      source: "packages/form/src/label/_mixins.scss#L36-L82",
      usedBy: [{ name: "react-md-label", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-form-theme-update-var",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        { name: "rmd-form-theme-var", type: "function", packageName: "form" },
        {
          name: "rmd-utils-negate-var",
          type: "function",
          packageName: "utils",
        },
        {
          name: "rmd-label-floating-font-size",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-floating-label { … }",
      sourceCode:
        "@mixin rmd-floating-label {\n  @include rmd-form-theme-update-var(\n    active-color,\n    rmd-form-theme-var(text-active-color)\n  );\n  @include rmd-utils-rtl {\n    left: auto;\n    right: 0;\n    transform: translate(\n      rmd-utils-negate-var(rmd-form-theme-var(text-padding-left)),\n      rmd-form-theme-var(floating-top)\n    );\n  }\n\n  $transitions: background-color, color, font-size, transform;\n\n  left: 0;\n  position: absolute;\n  top: 0;\n  transform: translate(\n    rmd-form-theme-var(text-padding-left),\n    rmd-form-theme-var(floating-top)\n  );\n  transition-property: $transitions;\n  will-change: $transitions;\n\n  &--dense {\n    @include rmd-form-theme-update-var(\n      floating-top,\n      rmd-form-theme-var(floating-dense-top)\n    );\n  }\n\n  &--active {\n    @include rmd-utils-rtl {\n      transform: translate(\n        rmd-utils-negate-var(rmd-form-theme-var(label-left-offset)),\n        rmd-form-theme-var(label-top-offset)\n      );\n    }\n\n    @include rmd-form-theme(background-color, label-active-background-color);\n    @include rmd-form-theme(padding, label-active-padding);\n\n    font-size: $rmd-label-floating-font-size;\n    transform: translate(\n      rmd-form-theme-var(label-left-offset),\n      rmd-form-theme-var(label-top-offset)\n    );\n    z-index: 1;\n  }\n\n  &--inactive {\n    @include rmd-theme(color, text-secondary-on-background);\n  }\n}\n",
      type: "mixin",
    },
    "react-md-label": {
      name: "react-md-label",
      description: "",
      source: "packages/form/src/label/_mixins.scss#L85-L93",
      usedBy: [{ name: "react-md-form", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-label", type: "mixin", packageName: "form" },
        { name: "rmd-floating-label", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      code: "@mixin react-md-label { … }",
      sourceCode:
        "@mixin react-md-label {\n  .rmd-label {\n    @include rmd-label;\n  }\n\n  .rmd-floating-label {\n    @include rmd-floating-label;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-native-select-container": {
      name: "rmd-native-select-container",
      description: "",
      source: "packages/form/src/select/_mixins.scss#L16-L29",
      usedBy: [{ name: "react-md-select", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        {
          name: "rmd-form-theme-update-var",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-form-theme-var", type: "function", packageName: "form" },
        {
          name: "rmd-select-native-addon-top",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-select-native-multiple-padding",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-native-select-container { … }",
      sourceCode:
        "@mixin rmd-native-select-container {\n  &--multi {\n    @include rmd-form-theme(min-height, text-height);\n    @include rmd-form-theme-update-var(addon-top, $rmd-select-native-addon-top);\n\n    height: auto;\n  }\n\n  &--padded {\n    padding-top: calc(\n      #{$rmd-select-native-multiple-padding} + #{rmd-form-theme-var(\n          text-padding-top\n        )}\n    );\n  }\n}\n",
      type: "mixin",
    },
    "rmd-native-select": {
      name: "rmd-native-select",
      description: "",
      source: "packages/form/src/select/_mixins.scss#L32-L75",
      usedBy: [{ name: "react-md-select", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-text-field", type: "mixin", packageName: "form" },
        { name: "rmd-icon-theme", type: "mixin", packageName: "icon" },
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
        {
          name: "rmd-utils-fix-moz-focus",
          type: "variable",
          packageName: "utils",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-native-select { … }",
      sourceCode:
        '@mixin rmd-native-select {\n  @include rmd-text-field;\n\n  @if $rmd-utils-fix-moz-focus {\n    // this is really annoying to try to "fix". Firefox will apply a dotted\n    // border on select fields and the only way you can style it is by changing\n    // the `color` value to `transparent`. Unfortunately, this means that the\n    // select\'s value will also become transparent so to fix it you have to\n    // apply a text-shadow with the expected color instead. Since the select\n    // inherits the current color, we have to "guess" what the color should be\n    // (text-primary-on-background) but it won\'t always be correct.\n    &:-moz-focusring {\n      color: transparent;\n      text-shadow: 0 0 rmd-theme-var(text-primary-on-background);\n    }\n  }\n\n  &--icon {\n    @include rmd-icon-theme(padding-right, size);\n\n    appearance: none;\n  }\n\n  &--multi {\n    padding-top: 0;\n  }\n\n  &__icon {\n    @include rmd-utils-rtl-auto(right, 0);\n\n    // without this, the span will render with a height larger than the icon and\n    // be positioned weirdly\n    display: inline-flex;\n    pointer-events: none;\n    position: absolute;\n  }\n\n  &__label {\n    // it doesn\'t look like selects support the label attribute, so just make\n    // the labe not have pointer events so if you click on it, the select is\n    // clicked instead of the label.\n    pointer-events: none;\n  }\n}\n',
      type: "mixin",
    },
    "rmd-select": {
      name: "rmd-select",
      description: "",
      source: "packages/form/src/select/_mixins.scss#L78-L108",
      usedBy: [{ name: "react-md-select", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        {
          name: "rmd-typography-text-overflow-ellipsis",
          type: "mixin",
          packageName: "typography",
        },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-select { … }",
      sourceCode:
        "@mixin rmd-select {\n  @include rmd-utils-hide-focus-outline;\n\n  &--disabled {\n    @include rmd-theme(color, text-disabled-on-background);\n  }\n\n  &__value {\n    @include rmd-utils-rtl {\n      @include rmd-form-theme(padding-left, text-padding-right);\n      @include rmd-form-theme(padding-right, text-padding-left);\n    }\n    @include rmd-form-theme(padding-left, text-padding-left);\n    @include rmd-form-theme(padding-right, text-padding-right);\n    @include rmd-form-theme(padding-top, text-padding-top);\n    @include rmd-typography(body-1, font-size);\n    @include rmd-typography-text-overflow-ellipsis;\n\n    &--placeholder {\n      @include rmd-transition(standard);\n      @include rmd-theme(color, text-secondary-on-background);\n\n      color: transparent;\n      transition: color $rmd-transition-standard-time;\n    }\n\n    &--placeholder-active {\n      @include rmd-theme(color, text-secondary-on-background);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-listbox": {
      name: "rmd-listbox",
      description: "",
      source: "packages/form/src/select/_mixins.scss#L111-L122",
      usedBy: [{ name: "react-md-select", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-utils-scroll", type: "mixin", packageName: "utils" },
        { name: "rmd-elevation", type: "mixin", packageName: "elevation" },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        {
          name: "rmd-listbox-elevation",
          type: "variable",
          packageName: "form",
        },
        { name: "rmd-listbox-z-index", type: "variable", packageName: "form" },
      ],
      packageName: "form",
      code: "@mixin rmd-listbox { … }",
      sourceCode:
        "@mixin rmd-listbox {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-utils-scroll;\n\n  &--temporary {\n    @include rmd-elevation($rmd-listbox-elevation);\n    @include rmd-theme(background-color, surface);\n    @include rmd-theme(color, on-surface);\n\n    z-index: $rmd-listbox-z-index;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-option": {
      name: "rmd-option",
      description: "",
      source: "packages/form/src/select/_mixins.scss#L125-L148",
      usedBy: [{ name: "react-md-select", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-list-theme-update-var",
          type: "mixin",
          packageName: "list",
        },
        {
          name: "rmd-utils-map-to-styles",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
        {
          name: "rmd-option-selected-content",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-option-selected-styles",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-option-selected-offset",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-option-focused-styles",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-option { … }",
      sourceCode:
        "@mixin rmd-option {\n  @if $rmd-option-selected-content {\n    @include rmd-list-theme-update-var(item-horizontal-padding, 1.5rem);\n  }\n\n  &--selected {\n    @include rmd-utils-map-to-styles($rmd-option-selected-styles);\n\n    @if $rmd-option-selected-content {\n      &::after {\n        @include rmd-utils-rtl-auto(left, $rmd-option-selected-offset);\n\n        content: $rmd-option-selected-content;\n        position: absolute;\n      }\n    }\n  }\n\n  @include rmd-utils-keyboard-only {\n    &--focused {\n      @include rmd-utils-map-to-styles($rmd-option-focused-styles);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "react-md-select": {
      name: "react-md-select",
      description: "",
      source: "packages/form/src/select/_mixins.scss#L151-L171",
      usedBy: [{ name: "react-md-form", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-native-select-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-native-select", type: "mixin", packageName: "form" },
        { name: "rmd-listbox", type: "mixin", packageName: "form" },
        { name: "rmd-option", type: "mixin", packageName: "form" },
        { name: "rmd-select", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      code: "@mixin react-md-select { … }",
      sourceCode:
        "@mixin react-md-select {\n  .rmd-native-select-container {\n    @include rmd-native-select-container;\n  }\n\n  .rmd-native-select {\n    @include rmd-native-select;\n  }\n\n  .rmd-listbox {\n    @include rmd-listbox;\n  }\n\n  .rmd-option {\n    @include rmd-option;\n  }\n\n  .rmd-select {\n    @include rmd-select;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-text-field-container": {
      name: "rmd-text-field-container",
      description: "",
      source: "packages/form/src/text-field/_mixins.scss#L15-L194",
      usedBy: [
        { name: "react-md-text-field", type: "mixin", packageName: "form" },
      ],
      requires: [
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        {
          name: "rmd-form-theme-update-var",
          type: "mixin",
          packageName: "form",
        },
        {
          name: "rmd-icon-theme-update-var",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        {
          name: "rmd-utils-pseudo-element",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-form-theme-var", type: "function", packageName: "form" },
        { name: "rmd-icon-theme-var", type: "function", packageName: "icon" },
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
        {
          name: "rmd-text-field-underline-padding",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-border-width",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-border-width-active",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-underline-label-padding-top",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-addon-margin",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-filled-padding",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-filled-border-radius",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-underline-label-left-offset",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-outline-padding",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-label-floating-padding",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-border-radius",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-underline-dense-padding-top",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-text-field-container { … }",
      sourceCode:
        '@mixin rmd-text-field-container {\n  @include rmd-transition(standard);\n  @include rmd-form-theme(height, text-height);\n\n  align-items: center;\n  display: flex;\n  position: relative;\n  transition: border-color $rmd-transition-standard-time;\n\n  &--hoverable:hover {\n    @include rmd-form-theme(border-color, text-border-hover-color);\n  }\n\n  &--inline {\n    display: inline-flex;\n  }\n\n  &--label {\n    @include rmd-form-theme-update-var(\n      text-height,\n      rmd-form-theme-var(text-label-height)\n    );\n  }\n\n  &--error {\n    @include rmd-icon-theme-update-var(color, rmd-form-theme-var(error-color));\n    @include rmd-form-theme-update-var(\n      text-active-color,\n      rmd-form-theme-var(error-color)\n    );\n    @include rmd-form-theme-update-var(\n      text-border-color,\n      rmd-form-theme-var(error-color)\n    );\n    @include rmd-form-theme-update-var(\n      text-border-hover-color,\n      rmd-form-theme-var(error-hover-color)\n    );\n  }\n\n  &--disabled {\n    @include rmd-icon-theme-update-var(\n      color,\n      rmd-form-theme-var(disabled-color)\n    );\n  }\n\n  &--underline {\n    @if $rmd-text-field-underline-padding {\n      @include rmd-form-theme-update-var(\n        text-padding-left,\n        $rmd-text-field-underline-padding\n      );\n      @include rmd-form-theme-update-var(\n        text-padding-right,\n        $rmd-text-field-underline-padding\n      );\n    }\n    @include rmd-form-theme(border-color, text-border-color);\n\n    border-bottom-style: solid;\n    border-bottom-width: $rmd-text-field-border-width;\n\n    &::after {\n      @include rmd-transition(standard);\n      @include rmd-form-theme(background-color, text-active-color);\n\n      bottom: -$rmd-text-field-border-width;\n      content: "";\n      height: $rmd-text-field-border-width-active;\n      left: 0;\n      position: absolute;\n      right: 0;\n      transform: scale(0);\n      transition: transform $rmd-transition-standard-time;\n      z-index: 1;\n    }\n  }\n\n  &--underline-labelled {\n    @include rmd-form-theme-update-var(\n      text-padding-top,\n      $rmd-text-field-underline-label-padding-top\n    );\n    @include rmd-form-theme-update-var(\n      addon-margin-top,\n      $rmd-text-field-addon-margin\n    );\n  }\n\n  &--filled {\n    @include rmd-form-theme-update-var(\n      text-padding-left,\n      $rmd-text-field-filled-padding\n    );\n    @include rmd-form-theme-update-var(\n      text-padding-right,\n      $rmd-text-field-filled-padding\n    );\n    @include rmd-form-theme-update-var(\n      label-left-offset,\n      $rmd-text-field-filled-padding\n    );\n    @include rmd-form-theme(background-color, text-filled-color);\n    @include rmd-states-surface($clickable: false);\n\n    border-top-left-radius: $rmd-text-field-filled-border-radius;\n    border-top-right-radius: $rmd-text-field-filled-border-radius;\n  }\n\n  &--underline-left::after {\n    transform-origin: left;\n  }\n\n  &--underline-center::after {\n    transform-origin: center;\n  }\n\n  &--underline-right::after {\n    transform-origin: right;\n  }\n\n  &--underline-active::after {\n    transform: scale(1);\n  }\n\n  &--underline-left-addon {\n    $calc-string: "#{rmd-icon-theme-var(size)} + #{$rmd-text-field-underline-label-left-offset * 2}";\n    @if $rmd-text-field-underline-padding {\n      $calc-string: "#{$calc-string} + #{$rmd-text-field-underline-padding}";\n    }\n\n    @include rmd-form-theme-update-var(\n      text-padding-left,\n      calc(#{$calc-string})\n    );\n    @include rmd-form-theme-update-var(\n      label-left-offset,\n      $rmd-text-field-underline-label-left-offset\n    );\n  }\n\n  &--underline-right-addon {\n    $calc-string: "#{rmd-icon-theme-var(size)} + #{$rmd-text-field-underline-label-left-offset * 2}";\n    @if $rmd-text-field-underline-padding {\n      $calc-string: "#{$calc-string} + #{$rmd-text-field-underline-padding}";\n    }\n\n    @include rmd-form-theme-update-var(\n      text-padding-right,\n      calc(#{$calc-string})\n    );\n  }\n\n  &--outline {\n    @include rmd-form-theme-update-var(\n      text-padding-left,\n      $rmd-text-field-outline-padding\n    );\n    @include rmd-form-theme-update-var(\n      text-padding-right,\n      $rmd-text-field-outline-padding\n    );\n    @include rmd-form-theme-update-var(\n      label-left-offset,\n      $rmd-text-field-outline-padding - $rmd-label-floating-padding\n    );\n    @include rmd-form-theme-update-var(label-top-offset, -50%);\n    @include rmd-form-theme-update-var(\n      label-active-padding,\n      0 $rmd-label-floating-padding\n    );\n    @include rmd-form-theme-update-var(\n      label-active-background-color,\n      rmd-theme-var(background)\n    );\n    @include rmd-form-theme(border-color, text-border-color);\n\n    border-radius: $rmd-text-field-border-radius;\n    border-style: solid;\n    border-width: $rmd-text-field-border-width;\n\n    &::after {\n      @include rmd-transition(standard);\n      @include rmd-utils-pseudo-element;\n\n      box-shadow: 0 0 0 $rmd-text-field-border-width-active\n        rmd-form-theme-var(text-active-color);\n      opacity: 0;\n      transition: opacity $rmd-transition-standard-time;\n    }\n  }\n\n  &--outline-active::after {\n    opacity: 1;\n  }\n\n  &--outline-left {\n    $outline-offset: calc(\n      #{rmd-icon-theme-var(size)} + #{$rmd-text-field-outline-padding + $rmd-text-field-addon-margin}\n    );\n\n    @include rmd-form-theme-update-var(text-padding-left, $outline-offset);\n  }\n\n  &--outline-right {\n    $outline-offset: calc(\n      #{rmd-icon-theme-var(size)} + #{$rmd-text-field-addon-margin * 2}\n    );\n\n    @include rmd-form-theme-update-var(text-padding-right, $outline-offset);\n  }\n\n  &--dense {\n    @include rmd-form-theme-update-var(\n      text-height,\n      rmd-form-theme-var(text-placeholder-dense-height)\n    );\n  }\n\n  &--dense-label {\n    @include rmd-form-theme-update-var(\n      text-height,\n      rmd-form-theme-var(text-label-dense-height)\n    );\n  }\n\n  &--dense-placeholder {\n    @include rmd-form-theme-update-var(\n      text-padding-top,\n      $rmd-text-field-underline-dense-padding-top\n    );\n  }\n}\n',
      type: "mixin",
    },
    "rmd-text-field-placeholder": {
      name: "rmd-text-field-placeholder",
      description:
        "A simple mixin that applies placeholder styles to an input/textarea element.\n",
      source: "packages/form/src/text-field/_mixins.scss#L197-L217",
      packageName: "form",
      code: "@mixin rmd-text-field-placeholder { … }",
      sourceCode:
        "@mixin rmd-text-field-placeholder {\n  &::-webkit-input-placeholder {\n    @content;\n  }\n\n  &:-ms-input-placeholder {\n    @content;\n  }\n\n  &::-moz-placeholder {\n    @content;\n  }\n\n  &:-moz-placeholder {\n    @content;\n  }\n\n  &:placeholder {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-text-field-base": {
      name: "rmd-text-field-base",
      description:
        "Creates the base styles for a text field so that it gains the correct typography and a few different colors based on its state.\n",
      source: "packages/form/src/text-field/_mixins.scss#L221-L249",
      usedBy: [
        { name: "rmd-text-field", type: "mixin", packageName: "form" },
        { name: "rmd-textarea", type: "mixin", packageName: "form" },
      ],
      requires: [
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
      ],
      packageName: "form",
      code: "@mixin rmd-text-field-base { … }",
      sourceCode:
        "@mixin rmd-text-field-base {\n  @include rmd-typography(body-1, font-size);\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-text-field-placeholder {\n    @include rmd-transition(standard);\n    @include rmd-theme(color, text-secondary-on-background);\n\n    // want to gain the same font styles as the input/textarea itself,\n    // just apply different colors as needed instead. Can't just do font: inherit\n    // since it'll break the styles in firefox.\n    font-family: inherit;\n    font-size: inherit;\n    font-weight: inherit;\n  }\n\n  background-color: transparent;\n  border-width: 0;\n  color: inherit;\n  font-size: 1em;\n  width: 100%;\n\n  &[disabled] {\n    @include rmd-theme(color, text-disabled-on-background);\n\n    @include rmd-text-field-placeholder {\n      @include rmd-theme(color, text-disabled-on-background);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-text-field": {
      name: "rmd-text-field",
      description: "",
      source: "packages/form/src/text-field/_mixins.scss#L252-L283",
      usedBy: [
        { name: "rmd-native-select", type: "mixin", packageName: "form" },
        { name: "react-md-text-field", type: "mixin", packageName: "form" },
      ],
      requires: [
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        { name: "rmd-text-field-base", type: "mixin", packageName: "form" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-text-field { … }",
      sourceCode:
        "@mixin rmd-text-field {\n  @include rmd-utils-rtl {\n    @include rmd-form-theme(padding-left, text-padding-right);\n    @include rmd-form-theme(padding-right, text-padding-left);\n  }\n  @include rmd-form-theme(padding-left, text-padding-left);\n  @include rmd-form-theme(padding-right, text-padding-right);\n  @include rmd-form-theme(padding-top, text-padding-top);\n  @include rmd-text-field-base;\n\n  flex: 1 1 auto;\n  height: 100%;\n\n  &--floating {\n    @include rmd-text-field-placeholder {\n      color: transparent;\n      transition: color $rmd-transition-standard-time;\n    }\n\n    &[disabled] {\n      @include rmd-text-field-placeholder {\n        color: transparent;\n      }\n    }\n\n    &:focus {\n      @include rmd-text-field-placeholder {\n        @include rmd-theme(color, text-secondary-on-background);\n      }\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-text-field-addon": {
      name: "rmd-text-field-addon",
      description: "",
      source: "packages/form/src/text-field/_mixins.scss#L286-L305",
      usedBy: [
        { name: "react-md-text-field", type: "mixin", packageName: "form" },
      ],
      requires: [
        { name: "rmd-icon-theme", type: "mixin", packageName: "icon" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
        { name: "rmd-form-theme-var", type: "function", packageName: "form" },
        {
          name: "rmd-text-field-addon-margin",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-text-field-addon { … }",
      sourceCode:
        "@mixin rmd-text-field-addon {\n  @include rmd-icon-theme(height, size);\n  @include rmd-icon-theme(width, size);\n  @include rmd-form-theme(top, addon-top);\n  @include rmd-form-theme(margin-top, addon-margin-top);\n\n  position: absolute;\n\n  &:first-child {\n    @include rmd-utils-rtl-auto(left, rmd-form-theme-var(label-left-offset));\n  }\n\n  &:last-child {\n    @include rmd-utils-rtl-auto(right, $rmd-text-field-addon-margin);\n  }\n\n  &--presentational {\n    pointer-events: none;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-textarea-container": {
      name: "rmd-textarea-container",
      description: "",
      source: "packages/form/src/text-field/_mixins.scss#L308-L340",
      usedBy: [
        { name: "react-md-text-field", type: "mixin", packageName: "form" },
      ],
      requires: [
        {
          name: "rmd-form-theme-update-var",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-form-theme-var", type: "function", packageName: "form" },
        {
          name: "rmd-textarea-addon-top",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-textarea-container { … }",
      sourceCode:
        "@mixin rmd-textarea-container {\n  @include rmd-form-theme-update-var(addon-top, $rmd-textarea-addon-top);\n\n  height: auto;\n  max-width: 100%;\n  padding-top: calc(\n    #{rmd-form-theme-var(text-padding-top)} + #{rmd-form-theme-var(\n        textarea-padding\n      )}\n  );\n\n  &--animate {\n    @include rmd-transition(standard);\n\n    transition: height $rmd-transition-standard-time;\n  }\n\n  &--cursor:hover {\n    // need to add this cursor back since the textarea container adds padding to\n    // itself instead of the textarea so it loses this cursor. the container\n    // element will still focus the textarea when clicked\n    cursor: text;\n  }\n\n  &__inner {\n    height: 100%;\n    width: 100%;\n\n    &--animate {\n      @include rmd-transition(standard);\n\n      transition: height $rmd-transition-standard-time;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-textarea": {
      name: "rmd-textarea",
      description: "",
      source: "packages/form/src/text-field/_mixins.scss#L343-L399",
      usedBy: [
        { name: "react-md-text-field", type: "mixin", packageName: "form" },
      ],
      requires: [
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        { name: "rmd-text-field-base", type: "mixin", packageName: "form" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-textarea { … }",
      sourceCode:
        "@mixin rmd-textarea {\n  @include rmd-transition(standard);\n  @include rmd-utils-rtl {\n    @include rmd-form-theme(padding-left, text-padding-right);\n    @include rmd-form-theme(padding-right, text-padding-left);\n  }\n  @include rmd-form-theme(padding-left, text-padding-left);\n  @include rmd-form-theme(padding-right, text-padding-right);\n  @include rmd-form-theme(min-height, text-height);\n  @include rmd-text-field-base;\n\n  flex: 1 1 auto;\n  height: 100%;\n\n  &--floating {\n    @include rmd-text-field-placeholder {\n      color: transparent;\n      transition: color $rmd-transition-standard-time;\n    }\n\n    &:focus {\n      @include rmd-text-field-placeholder {\n        @include rmd-theme(color, text-secondary-on-background);\n      }\n    }\n  }\n\n  &--rh {\n    resize: horizontal;\n  }\n\n  &--rv {\n    resize: vertical;\n  }\n\n  &--rn {\n    overflow: hidden;\n    resize: none;\n  }\n\n  // only want the textarea to be scrollable if there's a limit on the rows\n  // since it'll flash the scrollbar on most OS during the height transition\n  &--scrollable {\n    overflow: auto;\n  }\n\n  &--mask {\n    height: auto;\n    left: 0;\n    opacity: 0;\n    overflow: hidden;\n    pointer-events: none;\n    position: absolute;\n    right: 0;\n    z-index: -1;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-password": {
      name: "rmd-password",
      description: "",
      source: "packages/form/src/text-field/_mixins.scss#L402-L420",
      usedBy: [
        { name: "react-md-text-field", type: "mixin", packageName: "form" },
      ],
      requires: [
        {
          name: "rmd-form-theme-update-var",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
        {
          name: "rmd-button-theme-var",
          type: "function",
          packageName: "button",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-password { … }",
      sourceCode:
        "@mixin rmd-password {\n  &--offset {\n    // don't want any padding since the input will gain the button margin\n    // instead\n    @include rmd-form-theme-update-var(text-padding-right, 0);\n  }\n\n  &__input {\n    &--offset {\n      @include rmd-utils-rtl-auto(\n        margin-right,\n        rmd-button-theme-var(icon-size)\n      );\n    }\n  }\n\n  &__toggle {\n    @include rmd-utils-rtl-auto(right, 0);\n\n    position: absolute;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-form-message": {
      name: "rmd-form-message",
      description: "",
      source: "packages/form/src/text-field/_mixins.scss#L423-L463",
      usedBy: [
        { name: "react-md-text-field", type: "mixin", packageName: "form" },
      ],
      requires: [
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
        {
          name: "rmd-form-message-font-size",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-form-message-margin-bottom",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-form-message-margin-top",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-form-message-min-height",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-underline-padding",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-filled-padding",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-text-field-outline-padding",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-form-message-counter-spacing",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-form-message { … }",
      sourceCode:
        "@mixin rmd-form-message {\n  @include rmd-typography(body-2, (font-size));\n  @include rmd-theme(color, text-secondary-on-background);\n\n  display: flex;\n  font-size: $rmd-form-message-font-size;\n  margin-bottom: $rmd-form-message-margin-bottom;\n  margin-top: $rmd-form-message-margin-top;\n  min-height: $rmd-form-message-min-height;\n\n  &--underline {\n    padding-left: $rmd-text-field-underline-padding;\n    padding-right: $rmd-text-field-underline-padding;\n  }\n\n  &--filled {\n    padding-left: $rmd-text-field-filled-padding;\n    padding-right: $rmd-text-field-filled-padding;\n  }\n\n  &--outline {\n    padding-left: $rmd-text-field-outline-padding;\n    padding-right: $rmd-text-field-outline-padding;\n  }\n\n  &--error {\n    @include rmd-form-theme(color, error-color);\n  }\n\n  &__message {\n    margin: 0;\n  }\n\n  &__counter {\n    @include rmd-utils-rtl-auto(margin-left, auto);\n    @include rmd-utils-rtl-auto(\n      padding-left,\n      $rmd-form-message-counter-spacing\n    );\n\n    flex-shrink: 0;\n    white-space: nowrap;\n  }\n}\n",
      type: "mixin",
    },
    "react-md-text-field": {
      name: "react-md-text-field",
      description: "",
      source: "packages/form/src/text-field/_mixins.scss#L466-L494",
      usedBy: [{ name: "react-md-form", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-text-field", type: "mixin", packageName: "form" },
        { name: "rmd-text-field-addon", type: "mixin", packageName: "form" },
        { name: "rmd-password", type: "mixin", packageName: "form" },
        { name: "rmd-textarea-container", type: "mixin", packageName: "form" },
        { name: "rmd-textarea", type: "mixin", packageName: "form" },
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      code: "@mixin react-md-text-field { … }",
      sourceCode:
        "@mixin react-md-text-field {\n  .rmd-text-field-container {\n    @include rmd-text-field-container;\n  }\n\n  .rmd-text-field {\n    @include rmd-text-field;\n  }\n\n  .rmd-text-field-addon {\n    @include rmd-text-field-addon;\n  }\n\n  .rmd-password {\n    @include rmd-password;\n  }\n\n  .rmd-textarea-container {\n    @include rmd-textarea-container;\n  }\n\n  .rmd-textarea {\n    @include rmd-textarea;\n  }\n\n  .rmd-form-message {\n    @include rmd-form-message;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-toggle-container": {
      name: "rmd-toggle-container",
      description: "Creates the minimal styles for a toggle container.\n",
      source: "packages/form/src/toggle/_mixins.scss#L15-L26",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      packageName: "form",
      code: "@mixin rmd-toggle-container { … }",
      sourceCode:
        "@mixin rmd-toggle-container {\n  align-items: center;\n  display: flex;\n\n  &--inline {\n    display: inline-flex;\n  }\n\n  &--stacked {\n    flex-direction: column;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-toggle": {
      name: "rmd-toggle",
      description:
        "Creates all the styles for creating the icon container for the checkbox and radio input types.\n",
      source: "packages/form/src/toggle/_mixins.scss#L31-L46",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-button-theme", type: "mixin", packageName: "button" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        {
          name: "rmd-states-theme-update-var",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-toggle-border-radius",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-toggle { … }",
      sourceCode:
        '@mixin rmd-toggle {\n  @include rmd-button-theme(height, icon-size);\n  @include rmd-button-theme(width, icon-size);\n  @include rmd-states-surface("&--focused");\n\n  align-items: center;\n  border-radius: $rmd-toggle-border-radius;\n  display: inline-flex;\n  flex-shrink: 0;\n  justify-content: center;\n  position: relative;\n\n  &--disabled {\n    @include rmd-states-theme-update-var(hover-color, tranparent);\n  }\n}\n',
      type: "mixin",
    },
    "rmd-input-hidden": {
      name: "rmd-input-hidden",
      description:
        'Creates styles to apply to the "hidden" input for checkboxes and radios.\n',
      source: "packages/form/src/toggle/_mixins.scss#L50-L73",
      usedBy: [
        { name: "rmd-toggle-hidden", type: "mixin", packageName: "form" },
        { name: "rmd-switch-input", type: "mixin", packageName: "form" },
      ],
      requires: [
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-input-hidden { … }",
      sourceCode:
        "@mixin rmd-input-hidden {\n  @include rmd-utils-hide-focus-outline;\n\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  margin: 0;\n  opacity: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  &:disabled {\n    &:hover {\n      cursor: default;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-toggle-hidden": {
      name: "rmd-toggle-hidden",
      description:
        "Creates the styles for a form input that should be hidden from view. This should normally be applied to checkbox or radio input types.\n",
      source: "packages/form/src/toggle/_mixins.scss#L78-L91",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-input-hidden", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      code: "@mixin rmd-toggle-hidden { … }",
      sourceCode:
        "@mixin rmd-toggle-hidden {\n  @include rmd-input-hidden;\n\n  &:checked + .rmd-toggle__icon::before {\n    opacity: 0;\n  }\n\n  &:checked + .rmd-toggle__icon--indeterminate {\n    &::before,\n    &::after {\n      opacity: 1;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-toggle-icon": {
      name: "rmd-toggle-icon",
      description:
        "Creates the styles for the checkbox and radio input types' icon\n",
      source: "packages/form/src/toggle/_mixins.scss#L95-L161",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-icon-theme", type: "mixin", packageName: "icon" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
        {
          name: "rmd-toggle-border-radius",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-toggle-icon { … }",
      sourceCode:
        '@mixin rmd-toggle-icon {\n  @include rmd-icon-theme(height, size);\n  @include rmd-icon-theme(width, size);\n  @include rmd-form-theme(color, active-color);\n\n  .rmd-icon {\n    color: inherit;\n    fill: currentColor;\n    height: inherit;\n    width: inherit;\n  }\n\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  pointer-events: none;\n  position: absolute;\n\n  &--overlay {\n    &::before {\n      @include rmd-transition(standard);\n      @include rmd-form-theme(bottom, toggle-inset);\n      @include rmd-form-theme(left, toggle-inset);\n      @include rmd-form-theme(right, toggle-inset);\n      @include rmd-form-theme(top, toggle-inset);\n      @include rmd-theme(background-color, background);\n\n      content: "";\n      opacity: 1;\n      position: absolute;\n      transition: opacity $rmd-transition-standard-time;\n      z-index: 1;\n    }\n  }\n\n  &--indeterminate::after {\n    @include rmd-transition(standard);\n    @include rmd-form-theme(background-color, active-color);\n    @include rmd-form-theme(left, toggle-inset);\n    @include rmd-form-theme(right, toggle-inset);\n    @include rmd-form-theme(height, indeterminate-height);\n\n    content: "";\n    opacity: 0;\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    transition: opacity $rmd-transition-standard-time;\n    z-index: 2;\n  }\n\n  &--circle::before {\n    border-radius: $rmd-toggle-border-radius;\n  }\n\n  &--disabled {\n    @include rmd-theme(color, text-disabled-on-background);\n  }\n\n  &--dense {\n    @include rmd-form-theme(bottom, toggle-dense-inset);\n    @include rmd-form-theme(left, toggle-dense-inset);\n    @include rmd-form-theme(right, toggle-dense-inset);\n    @include rmd-form-theme(top, toggle-dense-inset);\n    @include rmd-form-theme(height, indeterminate-dense-height);\n  }\n}\n',
      type: "mixin",
    },
    "rmd-toggle-dense-theme": {
      name: "rmd-toggle-dense-theme",
      description:
        "Updates the checkbox and radio components to have a dense theme by updating the toggle-inset css variable to be the dense version. This should generally be used within media queries.\n",
      source: "packages/form/src/toggle/_mixins.scss#L166-L172",
      usedBy: [
        { name: "rmd-utils-dense", type: "mixin", packageName: "utils" },
      ],
      requires: [
        {
          name: "rmd-form-theme-update-var",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-form-theme-var", type: "function", packageName: "form" },
      ],
      packageName: "form",
      code: "@mixin rmd-toggle-dense-theme { … }",
      sourceCode:
        "@mixin rmd-toggle-dense-theme {\n  @include rmd-form-theme-update-var(\n    toggle-inset,\n    rmd-form-theme-var(toggle-dense-inset)\n  );\n  @include rmd-form-theme-update-var(\n    indeterminate-height,\n    rmd-form-theme-var(indeterminate-dense-height)\n  );\n}\n",
      type: "mixin",
    },
    "rmd-switch": {
      name: "rmd-switch",
      description: "Creates the styles for the switch component\n",
      source: "packages/form/src/toggle/_mixins.scss#L176-L196",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        {
          name: "rmd-form-theme-update-var",
          type: "mixin",
          packageName: "form",
        },
        {
          name: "rmd-progress-theme-update-var",
          type: "mixin",
          packageName: "progress",
        },
        { name: "rmd-form-theme-var", type: "function", packageName: "form" },
        {
          name: "rmd-switch-track-border-radius",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-switch-track-height",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
        {
          name: "rmd-switch-track-width",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-switch-progress-width",
          type: "variable",
          packageName: "form",
        },
        { name: "rmd-switch-ball-size", type: "variable", packageName: "form" },
      ],
      packageName: "form",
      code: "@mixin rmd-switch { … }",
      sourceCode:
        "@mixin rmd-switch {\n  @include rmd-transition(standard);\n  @include rmd-form-theme(background-color, track-background-color);\n\n  border-radius: $rmd-switch-track-border-radius;\n  height: $rmd-switch-track-height;\n  position: relative;\n  transition: background-color $rmd-transition-standard-time;\n  width: $rmd-switch-track-width;\n\n  &--disabled {\n    @include rmd-form-theme-update-var(\n      track-background-color,\n      rmd-form-theme-var(disabled-color)\n    );\n  }\n\n  &--async {\n    // make the progress bar a bit more prominent\n    @include rmd-progress-theme-update-var(\n      circular-width,\n      $rmd-switch-progress-width\n    );\n    // shrink the progress bar to be the same size as the switch's ball\n    @include rmd-progress-theme-update-var(\n      circular-size,\n      $rmd-switch-ball-size\n    );\n  }\n}\n",
      type: "mixin",
    },
    "rmd-switch-input": {
      name: "rmd-switch-input",
      description: "\n",
      source: "packages/form/src/toggle/_mixins.scss#L200-L247",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-input-hidden", type: "mixin", packageName: "form" },
        {
          name: "rmd-states-focus-shadow",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-states-theme-update-var",
          type: "mixin",
          packageName: "states",
        },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        {
          name: "rmd-states-theme-var",
          type: "function",
          packageName: "states",
        },
        { name: "rmd-switch-ball-size", type: "variable", packageName: "form" },
        {
          name: "rmd-switch-ball-offset",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-switch-ball-disabled-color",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-switch-input { … }",
      sourceCode:
        '@mixin rmd-switch-input {\n  @include rmd-input-hidden;\n  @include rmd-states-focus-shadow("&:focus + .rmd-switch__ball");\n\n  &:disabled + .rmd-switch__ball {\n    @include rmd-states-theme-update-var(hover-color, transparent);\n\n    cursor: auto;\n\n    &::after {\n      @include rmd-form-theme(background-color, disabled-color);\n    }\n  }\n\n  @include rmd-utils-keyboard-only {\n    &:focus + .rmd-switch__ball {\n      @include rmd-states-theme-update-var(\n        background-color,\n        rmd-states-theme-var(focus-color)\n      );\n    }\n\n    &:focus:hover + .rmd-switch__ball {\n      @include rmd-states-theme-update-var(\n        background-color,\n        rmd-states-theme-var(hover-color)\n      );\n    }\n  }\n\n  @include rmd-utils-touch-only {\n    &:focus + .rmd-switch__ball,\n    &:hover + .rmd-switch__ball {\n      @include rmd-states-theme-update-var(background-color, transparent);\n    }\n  }\n\n  &:checked + .rmd-switch__ball {\n    $offset: $rmd-switch-ball-size + $rmd-switch-ball-offset;\n\n    @include rmd-utils-rtl {\n      transform: translateX(-$offset);\n    }\n    transform: translateX($offset);\n\n    &::after {\n      @include rmd-form-theme(background-color, active-color);\n    }\n  }\n\n  &:checked:disabled + .rmd-switch__ball::after {\n    background-color: $rmd-switch-ball-disabled-color;\n  }\n}\n',
      type: "mixin",
    },
    "rmd-switch-ball": {
      name: "rmd-switch-ball",
      description: "",
      source: "packages/form/src/toggle/_mixins.scss#L250-L295",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        {
          name: "rmd-states-surface-base",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-states-theme-update-var",
          type: "mixin",
          packageName: "states",
        },
        { name: "rmd-elevation", type: "mixin", packageName: "elevation" },
        {
          name: "rmd-states-theme-var",
          type: "function",
          packageName: "states",
        },
        {
          name: "rmd-switch-ball-offset",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-switch-ball-border-radius",
          type: "variable",
          packageName: "form",
        },
        { name: "rmd-switch-ball-size", type: "variable", packageName: "form" },
        {
          name: "rmd-switch-track-height",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      code: "@mixin rmd-switch-ball { … }",
      sourceCode:
        '@mixin rmd-switch-ball {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-transition(standard);\n  @include rmd-utils-rtl {\n    left: auto;\n    right: calc(-50% + #{$rmd-switch-ball-offset});\n  }\n\n  align-items: center;\n  border-radius: $rmd-switch-ball-border-radius;\n  display: flex;\n  height: $rmd-switch-ball-size * 2;\n  justify-content: center;\n  left: calc(-50% + #{$rmd-switch-ball-offset});\n  position: absolute;\n  top: calc(-50% - #{$rmd-switch-ball-size - $rmd-switch-track-height});\n  transition-duration: $rmd-transition-standard-time;\n  transition-property: background-color, transform;\n  width: $rmd-switch-ball-size * 2;\n  z-index: 1;\n\n  &::before {\n    @include rmd-states-surface-base;\n  }\n\n  &:hover {\n    @include rmd-states-theme-update-var(\n      background-color,\n      rmd-states-theme-var(hover-color)\n    );\n\n    cursor: pointer;\n  }\n\n  &::after {\n    @include rmd-elevation(1);\n\n    background-color: darken($rmd-white-base, 5%);\n    border-radius: inherit;\n    content: "";\n    height: $rmd-switch-ball-size;\n    left: 25%;\n    pointer-events: none;\n    position: absolute;\n    top: 25%;\n    width: $rmd-switch-ball-size;\n    z-index: 1;\n  }\n}\n',
      type: "mixin",
    },
    "rmd-switch-container": {
      name: "rmd-switch-container",
      description: "",
      source: "packages/form/src/toggle/_mixins.scss#L298-L300",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-switch-container-vertical-padding",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-switch-container-horizontal-padding",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin rmd-switch-container { … }",
      sourceCode:
        "@mixin rmd-switch-container {\n  padding: $rmd-switch-container-vertical-padding\n    $rmd-switch-container-horizontal-padding;\n}\n",
      type: "mixin",
    },
    "react-md-toggle": {
      name: "react-md-toggle",
      description:
        "Creates all the styles for the toggle components in the form package.\n",
      source: "packages/form/src/toggle/_mixins.scss#L304-L343",
      usedBy: [{ name: "react-md-form", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-toggle-container", type: "mixin", packageName: "form" },
        { name: "rmd-toggle", type: "mixin", packageName: "form" },
        { name: "rmd-toggle-hidden", type: "mixin", packageName: "form" },
        { name: "rmd-toggle-icon", type: "mixin", packageName: "form" },
        { name: "rmd-switch-container", type: "mixin", packageName: "form" },
        { name: "rmd-switch", type: "mixin", packageName: "form" },
        { name: "rmd-switch-input", type: "mixin", packageName: "form" },
        { name: "rmd-switch-ball", type: "mixin", packageName: "form" },
        {
          name: "rmd-switch-progress-background-color",
          type: "variable",
          packageName: "form",
        },
        {
          name: "rmd-switch-progress-padding",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      code: "@mixin react-md-toggle { … }",
      sourceCode:
        "@mixin react-md-toggle {\n  .rmd-toggle-container {\n    @include rmd-toggle-container;\n  }\n\n  .rmd-toggle {\n    @include rmd-toggle;\n\n    &__input {\n      @include rmd-toggle-hidden;\n    }\n\n    &__icon {\n      @include rmd-toggle-icon;\n    }\n  }\n\n  .rmd-switch-container {\n    @include rmd-switch-container;\n  }\n\n  .rmd-switch {\n    @include rmd-switch;\n\n    &__input {\n      @include rmd-switch-input;\n    }\n\n    &__ball {\n      @include rmd-switch-ball;\n    }\n\n    &__progress {\n      background-color: $rmd-switch-progress-background-color;\n      border-radius: inherit;\n      padding: $rmd-switch-progress-padding;\n      z-index: 2;\n    }\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-form-error-color": {
      name: "rmd-form-error-color",
      description: "The color to use when a form contains an error.",
      source: "packages/form/src/_variables.scss#L19",
      requires: [
        { name: "rmd-theme-error", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "$rmd-theme-error",
      compiled: "#f44336",
      overridable: true,
    },
    "rmd-form-error-hover-color": {
      name: "rmd-form-error-hover-color",
      description:
        "This is the color that is used when a text field/textarea is errored and the user hovers over it.",
      source: "packages/form/src/_variables.scss#L26-L32",
      requires: [
        {
          name: "rmd-theme-get-swatch",
          type: "function",
          packageName: "theme",
        },
      ],
      packageName: "form",
      type: "Color",
      value:
        "rmd-theme-get-swatch(\n  $rmd-form-error-color,\n  700,\n  true,\n  darken($rmd-form-error-color, 10%),\n  rmd-form-error-color\n)",
      compiled: "#d50000",
      overridable: true,
    },
    "rmd-form-active-color": {
      name: "rmd-form-active-color",
      description:
        "The color to use when a form element (text, checkbox, radio, etc) is currently active by the user(normally focus).",
      source: "packages/form/src/_variables.scss#L39",
      requires: [
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "rmd-theme-var(secondary)",
      compiled: "var(--rmd-theme-secondary, #f50057)",
      overridable: true,
    },
    "rmd-form-disabled-color": {
      name: "rmd-form-disabled-color",
      description: "The color to use when a form element is disabled.",
      source: "packages/form/src/_variables.scss#L45",
      requires: [
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "rmd-theme-var(text-disabled-on-background)",
      compiled: "var(--rmd-theme-text-disabled-on-background, #9e9e9e)",
      overridable: true,
    },
    "rmd-form-placeholder-color": {
      name: "rmd-form-placeholder-color",
      description:
        "The default color to use for placeholder text within text fields.",
      source: "packages/form/src/_variables.scss#L51",
      requires: [
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "rmd-theme-var(text-secondary-on-background)",
      compiled: "var(--rmd-theme-text-secondary-on-background, #757575)",
      overridable: true,
    },
    "rmd-form-theme-values": {
      name: "rmd-form-theme-values",
      description:
        'A Map of all the "themeable" parts of the form package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/form/src/_variables.scss#L59-L91",
      usedBy: [
        { name: "rmd-form-theme", type: "function", packageName: "form" },
        { name: "rmd-form-theme-var", type: "function", packageName: "form" },
        { name: "rmd-form-theme", type: "mixin", packageName: "form" },
        {
          name: "rmd-form-theme-update-var",
          type: "mixin",
          packageName: "form",
        },
        { name: "react-md-form", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Map",
      value:
        "(\n  error-color: $rmd-form-error-color,\n  error-hover-color: $rmd-form-error-hover-color,\n  active-color: $rmd-form-active-color,\n  disabled-color: $rmd-form-disabled-color,\n  toggle-inset: $rmd-toggle-inset,\n  toggle-dense-inset: $rmd-toggle-dense-inset,\n  indeterminate-height: $rmd-checkbox-indeterminate-height,\n  indeterminate-dense-height: $rmd-checkbox-indeterminate-dense-height,\n  track-background-color: $rmd-switch-track-background-color,\n  floating-top: $rmd-label-floating-top,\n  floating-dense-top: $rmd-label-floating-dense-top,\n  addon-top: auto,\n  addon-margin-top: 0px,\n  label-left-offset: 0px,\n  label-top-offset: 0px,\n  label-active-padding: 0px,\n  label-active-background-color: transparent,\n  text-padding-left: 0px,\n  text-padding-right: 0px,\n  text-padding-top: 0px,\n  text-offset: 0px,\n  text-active-color: $rmd-text-field-active-color,\n  text-border-color: $rmd-text-field-border-color,\n  text-border-hover-color: $rmd-text-field-border-hover-color,\n  text-filled-color: $rmd-text-field-filled-background-color,\n  text-height: $rmd-text-field-height,\n  text-label-height: $rmd-text-field-label-height,\n  text-label-dense-height: $rmd-text-field-label-dense-height,\n  text-placeholder-height: $rmd-text-field-height,\n  text-placeholder-dense-height: $rmd-text-field-dense-height,\n  textarea-padding: $rmd-textarea-vertical-padding,\n)",
      compiled:
        "(\n  error-color: #f44336,\n  error-hover-color: #d50000,\n  active-color: var(--rmd-theme-secondary, #f50057),\n  disabled-color: var(--rmd-theme-text-disabled-on-background, #9e9e9e),\n  toggle-inset: 0.3125rem,\n  toggle-dense-inset: 0.25rem,\n  indeterminate-height: 0.15rem,\n  indeterminate-dense-height: 0.125rem,\n  track-background-color: rgba(0, 0, 0, 0.38),\n  floating-top: 1rem,\n  floating-dense-top: 0.9rem,\n  addon-top: auto,\n  addon-margin-top: 0px,\n  label-left-offset: 0px,\n  label-top-offset: 0px,\n  label-active-padding: 0px,\n  label-active-background-color: transparent,\n  text-padding-left: 0px,\n  text-padding-right: 0px,\n  text-padding-top: 0px,\n  text-offset: 0px,\n  text-active-color: #2196f3,\n  text-border-color: rgba(0, 0, 0, 0.12),\n  text-border-hover-color: rgba(0, 0, 0, 0.87),\n  text-filled-color: #f5f5f5,\n  text-height: 3rem,\n  text-label-height: 3.5rem,\n  text-label-dense-height: 3.25rem,\n  text-placeholder-height: 3rem,\n  text-placeholder-dense-height: 2.5rem,\n  textarea-padding: 0.5rem,\n)",
      overridable: true,
    },
    "rmd-label-font-size": {
      name: "rmd-label-font-size",
      description: "The font size to use for a `<label>` by default.\n",
      source: "packages/form/src/label/_variables.scss#L7",
      usedBy: [{ name: "rmd-label", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "Number",
      value: "1em",
      overridable: true,
    },
    "rmd-label-floating-font-size": {
      name: "rmd-label-floating-font-size",
      description:
        "The font size to use for a floating label that is currently fixed above a text field/textarea.\n",
      source: "packages/form/src/label/_variables.scss#L12",
      usedBy: [
        { name: "rmd-floating-label", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "0.75em",
      overridable: true,
    },
    "rmd-label-floating-padding": {
      name: "rmd-label-floating-padding",
      description:
        "The amount of horizontal padding to use for a floating label use with an outlined text field/textarea.\n",
      source: "packages/form/src/label/_variables.scss#L17",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-label-floating-top": {
      name: "rmd-label-floating-top",
      description: "The top position for a floating label.\n",
      source: "packages/form/src/label/_variables.scss#L21",
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-label-floating-dense-top": {
      name: "rmd-label-floating-dense-top",
      description: "The top position for a dense floating label.\n",
      source: "packages/form/src/label/_variables.scss#L25",
      packageName: "form",
      type: "Number",
      value: "0.9rem",
      overridable: true,
    },
    "rmd-label-padding": {
      name: "rmd-label-padding",
      description:
        "The amount of horizontal padding to use for a floating label with an outlined text field/textarea.\n",
      source: "packages/form/src/label/_variables.scss#L30",
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-select-native-multiple-padding": {
      name: "rmd-select-native-multiple-padding",
      description:
        "The additional amount of apdding to apply to the top of the select field container in addition to normal text field padding. This is used so the floating label does not cover the scrollable content.\n",
      source: "packages/form/src/select/_variables.scss#L12",
      usedBy: [
        {
          name: "rmd-native-select-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-select-native-addon-top": {
      name: "rmd-select-native-addon-top",
      description:
        "The default position for a text-field addon when the native select is a multi-select. If this isn't set, the addon will always be centered based on the size of the select field instead.\n",
      source: "packages/form/src/select/_variables.scss#L18",
      usedBy: [
        {
          name: "rmd-native-select-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-listbox-z-index": {
      name: "rmd-listbox-z-index",
      description: "The z-index to use for a temporary listbox.",
      source: "packages/form/src/select/_variables.scss#L24",
      usedBy: [{ name: "rmd-listbox", type: "mixin", packageName: "form" }],
      requires: [
        {
          name: "rmd-utils-temporary-element-z-index",
          type: "variable",
          packageName: "utils",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "$rmd-utils-temporary-element-z-index",
      compiled: "30",
      overridable: true,
    },
    "rmd-listbox-elevation": {
      name: "rmd-listbox-elevation",
      description:
        "The elevation level for a temporary listbox. This should be a number between 0-24 as it generates a material design box shadow value.\n",
      source: "packages/form/src/select/_variables.scss#L29",
      usedBy: [{ name: "rmd-listbox", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "Number",
      value: "8",
      overridable: true,
    },
    "rmd-option-focused-styles": {
      name: "rmd-option-focused-styles",
      description:
        "The styles to apply when an option is focused with `aria-activedescendant` behavior. This should be a map of styles that should be applied.",
      source: "packages/form/src/select/_variables.scss#L36-L38",
      usedBy: [{ name: "rmd-option", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-blue-500", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Map",
      value: "(\n  box-shadow: inset 0 0 0 2px $rmd-blue-500,\n)",
      compiled: "(\n  box-shadow: inset 0 0 0 2px #2196f3,\n)",
      overridable: true,
    },
    "rmd-option-selected-styles": {
      name: "rmd-option-selected-styles",
      description:
        "The styles to apply when an option is selected. This should be a map of style properties with values to apply.",
      source: "packages/form/src/select/_variables.scss#L46-L49",
      usedBy: [{ name: "rmd-option", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-blue-900", type: "variable", packageName: "theme" },
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Map",
      value:
        "(\n  background-color: $rmd-blue-900,\n  color: $rmd-white-base,\n)",
      compiled: "(\n  background-color: #0d47a1,\n  color: #fff,\n)",
      overridable: true,
    },
    "rmd-option-selected-offset": {
      name: "rmd-option-selected-offset",
      description:
        "The amount of `left` (or right when rtl languages are used) to apply to the option's selected checkmark css.\n",
      source: "packages/form/src/select/_variables.scss#L54",
      usedBy: [{ name: "rmd-option", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-option-selected-content": {
      name: "rmd-option-selected-content",
      description:
        "The content to use for the selected state of the option. If this value is set to null, the `::after` styles will not be created and the `$rmd-option-horizontal-padding` variable will not be used to update the list item's horizontal padding for options. This is useful if you want to use icons or ignore the selected state instead.\n",
      source: "packages/form/src/select/_variables.scss#L62",
      usedBy: [{ name: "rmd-option", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "String",
      value: "'\\2713'",
      overridable: true,
    },
    "rmd-option-horizontal-padding": {
      name: "rmd-option-horizontal-padding",
      description:
        "The amount of horizontal padding that should be applied to each option.\nThis overrides the `$rmd-list-item-horizontal-padding` css variable so that the selected checkmark styles can appear nicely.\n",
      source: "packages/form/src/select/_variables.scss#L69",
      see: [
        {
          name: "rmd-option-selected-content",
          type: "variable",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-text-field-active-color": {
      name: "rmd-text-field-active-color",
      description:
        "The color to use for the text field's borders/underlines while the user is focusing the text field.",
      source: "packages/form/src/text-field/_variables.scss#L15",
      requires: [
        {
          name: "rmd-states-focus-shadow-color",
          type: "variable",
          packageName: "states",
        },
      ],
      packageName: "form",
      type: "Color",
      value: "$rmd-states-focus-shadow-color",
      compiled: "#2196f3",
      overridable: true,
    },
    "rmd-text-field-light-border-color": {
      name: "rmd-text-field-light-border-color",
      description:
        "The text field's border color to use in light themed apps or backgrounds.",
      source: "packages/form/src/text-field/_variables.scss#L21",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      requires: [
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "rgba($rmd-black-base, 0.12)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-text-field-dark-border-color": {
      name: "rmd-text-field-dark-border-color",
      description:
        "The text field's border color to use in dark themed apps or backgrounds.",
      source: "packages/form/src/text-field/_variables.scss#L27",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      requires: [
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "rgba($rmd-white-base, 0.5)",
      compiled: "rgba(255, 255, 255, 0.5)",
      overridable: true,
    },
    "rmd-text-field-border-color": {
      name: "rmd-text-field-border-color",
      description: "The default text field's border color to use.",
      source: "packages/form/src/text-field/_variables.scss#L33-L37",
      requires: [
        { name: "rmd-theme-light", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-text-field-light-border-color,\n  $rmd-text-field-dark-border-color\n)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-text-field-light-border-hover-color": {
      name: "rmd-text-field-light-border-hover-color",
      description:
        "The text field's border color to use in light themed apps or backgrounds when the user is hovering the text field.",
      source: "packages/form/src/text-field/_variables.scss#L44",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      requires: [
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "rgba($rmd-black-base, 0.87)",
      compiled: "rgba(0, 0, 0, 0.87)",
      overridable: true,
    },
    "rmd-text-field-dark-border-hover-color": {
      name: "rmd-text-field-dark-border-hover-color",
      description:
        "The text field's border color to use in dark themed apps or backgrounds when the user is hovering the text field.",
      source: "packages/form/src/text-field/_variables.scss#L51",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      requires: [
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "rgba($rmd-white-base, 0.87)",
      compiled: "rgba(255, 255, 255, 0.87)",
      overridable: true,
    },
    "rmd-text-field-border-hover-color": {
      name: "rmd-text-field-border-hover-color",
      description: "The default text field's hover border color to use.",
      source: "packages/form/src/text-field/_variables.scss#L57-L61",
      requires: [
        { name: "rmd-theme-light", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-text-field-light-border-hover-color,\n  $rmd-text-field-dark-border-hover-color\n)",
      compiled: "rgba(0, 0, 0, 0.87)",
      overridable: true,
    },
    "rmd-text-field-border-radius": {
      name: "rmd-text-field-border-radius",
      description: "The border radius to apply to text fields.\n",
      source: "packages/form/src/text-field/_variables.scss#L65",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-text-field-border-width": {
      name: "rmd-text-field-border-width",
      description: "The default border width for outlined text fields.\n",
      source: "packages/form/src/text-field/_variables.scss#L69",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "1px",
      overridable: true,
    },
    "rmd-text-field-border-width-active": {
      name: "rmd-text-field-border-width-active",
      description:
        "The border width for outlined text fields that are currently focused.\n",
      source: "packages/form/src/text-field/_variables.scss#L73",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "2px",
      overridable: true,
    },
    "rmd-text-field-label-height": {
      name: "rmd-text-field-label-height",
      description: "The height to use for a text field with a label.\n",
      source: "packages/form/src/text-field/_variables.scss#L77",
      packageName: "form",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-text-field-label-dense-height": {
      name: "rmd-text-field-label-dense-height",
      description:
        "The height to use for a text field with a label with the dense spec.\n",
      source: "packages/form/src/text-field/_variables.scss#L81",
      packageName: "form",
      type: "Number",
      value: "3.25rem",
      overridable: true,
    },
    "rmd-text-field-height": {
      name: "rmd-text-field-height",
      description:
        "The height to use for a text field without a label (so placeholder only).\n",
      source: "packages/form/src/text-field/_variables.scss#L85",
      packageName: "form",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-text-field-dense-height": {
      name: "rmd-text-field-dense-height",
      description:
        "The height to use for a text field without a label with the dense spec (so placeholder only).\n",
      source: "packages/form/src/text-field/_variables.scss#L90",
      packageName: "form",
      type: "Number",
      value: "2.5rem",
      overridable: true,
    },
    "rmd-text-field-outline-padding": {
      name: "rmd-text-field-outline-padding",
      description:
        "The amount of padding to apply to the left and right of the text field when it has the outline theme applied.\n",
      source: "packages/form/src/text-field/_variables.scss#L95",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-text-field-underline-label-padding-top": {
      name: "rmd-text-field-underline-label-padding-top",
      description:
        "The amount of padding to apply to the top of an underlined or filled text field. This is used to push the input down a little bit to look nice with the floating label.\n",
      source: "packages/form/src/text-field/_variables.scss#L101",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-text-field-underline-label-left-offset": {
      name: "rmd-text-field-underline-label-left-offset",
      description:
        "The amount of offset to apply to the floating label for an underlined or filled text field when there is an icon to the left of the input.",
      source: "packages/form/src/text-field/_variables.scss#L108",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      requires: [
        {
          name: "rmd-icon-spacing-with-text",
          type: "variable",
          packageName: "icon",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "$rmd-icon-spacing-with-text",
      compiled: "0.5rem",
      overridable: true,
    },
    "rmd-text-field-underline-dense-padding-top": {
      name: "rmd-text-field-underline-dense-padding-top",
      description:
        "The amount of padding to apply to the top of an underlined or filled text field when the dense theme is enabled. This is used to push the input down a little bit to look nice with the floating label.\n",
      source: "packages/form/src/text-field/_variables.scss#L114",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-text-field-underline-padding": {
      name: "rmd-text-field-underline-padding",
      description:
        "The amount of padding to apply to the left and right of the text field when it has the underline theme applied.\n",
      source: "packages/form/src/text-field/_variables.scss#L119",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "null",
      overridable: true,
    },
    "rmd-text-field-filled-padding": {
      name: "rmd-text-field-filled-padding",
      description:
        "The amount of padding to apply to the left and right of the text field when it has the filled theme applied.\n",
      source: "packages/form/src/text-field/_variables.scss#L124",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-text-field-filled-light-background-color": {
      name: "rmd-text-field-filled-light-background-color",
      description:
        "The background color to use for filled text fields when using the light theme.",
      source: "packages/form/src/text-field/_variables.scss#L131",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      requires: [
        { name: "rmd-grey-100", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "$rmd-grey-100",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-text-field-filled-dark-background-color": {
      name: "rmd-text-field-filled-dark-background-color",
      description:
        "The background color to use for filled text fields when using the dark theme.",
      source: "packages/form/src/text-field/_variables.scss#L138",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      requires: [
        { name: "rmd-grey-700", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "$rmd-grey-700",
      compiled: "#616161",
      overridable: true,
    },
    "rmd-text-field-filled-background-color": {
      name: "rmd-text-field-filled-background-color",
      description: "The default background color for filled text fields.",
      source: "packages/form/src/text-field/_variables.scss#L144-L148",
      requires: [
        { name: "rmd-theme-light", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-text-field-filled-light-background-color,\n  $rmd-text-field-filled-dark-background-color\n)",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-text-field-filled-border-radius": {
      name: "rmd-text-field-filled-border-radius",
      description:
        "The border radius to apply to the top left and top right of the filled text field.\n",
      source: "packages/form/src/text-field/_variables.scss#L153",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-text-field-addon-margin": {
      name: "rmd-text-field-addon-margin",
      description:
        "The amount of spacing between the left or right of the text field and the icon.",
      source: "packages/form/src/text-field/_variables.scss#L160",
      usedBy: [
        {
          name: "rmd-text-field-container",
          type: "mixin",
          packageName: "form",
        },
        { name: "rmd-text-field-addon", type: "mixin", packageName: "form" },
      ],
      requires: [
        {
          name: "rmd-icon-spacing-with-text",
          type: "variable",
          packageName: "icon",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "$rmd-icon-spacing-with-text",
      compiled: "0.5rem",
      overridable: true,
    },
    "rmd-textarea-vertical-padding": {
      name: "rmd-textarea-vertical-padding",
      description: "An additional amount of padding to apply to textareas.\n",
      source: "packages/form/src/text-field/_variables.scss#L164",
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-textarea-addon-top": {
      name: "rmd-textarea-addon-top",
      description:
        "The amount to start offseting the textarea's left/right inline addon icons.\nIf this value isn't set, the icons will be centered in the textarea's height and will continually be centered as the user types more and more text.\n",
      source: "packages/form/src/text-field/_variables.scss#L170",
      usedBy: [
        { name: "rmd-textarea-container", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-form-message-min-height": {
      name: "rmd-form-message-min-height",
      description:
        "The minimum height for the `FormMessage` component. This is really just required to help prevent layout changes when the messages are added and removed from the DOM.",
      source: "packages/form/src/text-field/_variables.scss#L177",
      usedBy: [
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "2rem",
      overridable: true,
    },
    "rmd-form-message-margin-top": {
      name: "rmd-form-message-margin-top",
      description:
        "The amount of margin that should be applied to the top of the `FormMessage` component.\n",
      source: "packages/form/src/text-field/_variables.scss#L182",
      usedBy: [
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-form-message-margin-bottom": {
      name: "rmd-form-message-margin-bottom",
      description:
        "The amount of margin that should be applied to the top of the `FormMessage` component.\n",
      source: "packages/form/src/text-field/_variables.scss#L187",
      usedBy: [
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-form-message-counter-spacing": {
      name: "rmd-form-message-counter-spacing",
      description:
        "The amount of padding to apply to the left of the `FormMessage`'s counter component.",
      source: "packages/form/src/text-field/_variables.scss#L194",
      usedBy: [
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      requires: [
        {
          name: "rmd-icon-spacing-with-text",
          type: "variable",
          packageName: "icon",
        },
      ],
      packageName: "form",
      type: "Number",
      value: "$rmd-icon-spacing-with-text",
      compiled: "0.5rem",
      overridable: true,
    },
    "rmd-form-message-font-size": {
      name: "rmd-form-message-font-size",
      description:
        "The font size to apply to the `FormMessage` component for the messages as well as the counter component.\n\nNote: The remaining typography styles will come from `body-2`.",
      source: "packages/form/src/text-field/_variables.scss#L202",
      usedBy: [
        { name: "rmd-form-message", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-toggle-border-radius": {
      name: "rmd-toggle-border-radius",
      description: "The border radius for the checkbox and radio components.\n",
      source: "packages/form/src/toggle/_variables.scss#L10",
      usedBy: [
        { name: "rmd-toggle", type: "mixin", packageName: "form" },
        { name: "rmd-toggle-icon", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-toggle-inset": {
      name: "rmd-toggle-inset",
      description:
        "This is how much the background layer should be inset relative to the checkbox/radio's icon element. This is used to animate changes in the checked state by covering part of the icon.\n",
      source: "packages/form/src/toggle/_variables.scss#L16",
      packageName: "form",
      type: "Number",
      value: "0.3125rem",
      overridable: true,
    },
    "rmd-toggle-dense-inset": {
      name: "rmd-toggle-dense-inset",
      description:
        "The amount of offset to apply when using the dense theme.\n",
      source: "packages/form/src/toggle/_variables.scss#L21",
      see: [
        { name: "rmd-toggle-inset", type: "variable", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-checkbox-indeterminate-height": {
      name: "rmd-checkbox-indeterminate-height",
      description:
        "The height for the indeterminate checkbox's state line that covers the icon.\n",
      source: "packages/form/src/toggle/_variables.scss#L26",
      packageName: "form",
      type: "Number",
      value: "0.15rem",
      overridable: true,
    },
    "rmd-checkbox-indeterminate-dense-height": {
      name: "rmd-checkbox-indeterminate-dense-height",
      description:
        "The height for the indeterminate checkbox's state line that covers the icon when the dense spec is enabled.\n",
      source: "packages/form/src/toggle/_variables.scss#L31",
      packageName: "form",
      type: "Number",
      value: "0.125rem",
      overridable: true,
    },
    "rmd-switch-track-height": {
      name: "rmd-switch-track-height",
      description:
        "The height for a switch's track. The track is the background that the ball animates left and right on.\n",
      source: "packages/form/src/toggle/_variables.scss#L36",
      usedBy: [
        { name: "rmd-switch", type: "mixin", packageName: "form" },
        { name: "rmd-switch-ball", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-switch-track-width": {
      name: "rmd-switch-track-width",
      description:
        "The width for a switch's track. The track is the background that the ball animates left and right on.\n",
      source: "packages/form/src/toggle/_variables.scss#L41",
      usedBy: [{ name: "rmd-switch", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "Number",
      value: "2.25rem",
      overridable: true,
    },
    "rmd-switch-track-background-color": {
      name: "rmd-switch-track-background-color",
      description:
        "The background color for a switch's track. This is the element that the ball animates left and right on.",
      source: "packages/form/src/toggle/_variables.scss#L48",
      requires: [
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "rgba($rmd-black-base, 0.38)",
      compiled: "rgba(0, 0, 0, 0.38)",
      overridable: true,
    },
    "rmd-switch-track-border-radius": {
      name: "rmd-switch-track-border-radius",
      description:
        "The border radius to apply to the switch's track. This is the element that the ball animates left and right on.\n",
      source: "packages/form/src/toggle/_variables.scss#L53",
      usedBy: [{ name: "rmd-switch", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-switch-ball-size": {
      name: "rmd-switch-ball-size",
      description: "The size of the switch's ball.\n",
      source: "packages/form/src/toggle/_variables.scss#L57",
      usedBy: [
        { name: "rmd-switch", type: "mixin", packageName: "form" },
        { name: "rmd-switch-input", type: "mixin", packageName: "form" },
        { name: "rmd-switch-ball", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "1.25rem",
      overridable: true,
    },
    "rmd-switch-ball-border-radius": {
      name: "rmd-switch-ball-border-radius",
      description: "The border radius for the switch's ball.\n",
      source: "packages/form/src/toggle/_variables.scss#L61",
      usedBy: [{ name: "rmd-switch-ball", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-switch-ball-offset": {
      name: "rmd-switch-ball-offset",
      description:
        "The amount of offset that should be applied to the ball relative to its track. This is really used so the ball can overlap the track a bit to look a bit nicer.\n",
      source: "packages/form/src/toggle/_variables.scss#L66",
      usedBy: [
        { name: "rmd-switch-input", type: "mixin", packageName: "form" },
        { name: "rmd-switch-ball", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-switch-container-vertical-padding": {
      name: "rmd-switch-container-vertical-padding",
      description:
        "The vertical padding for the switch container. This should generally be large enough so that the ball does not overlap any other elements.\n",
      source: "packages/form/src/toggle/_variables.scss#L71",
      usedBy: [
        { name: "rmd-switch-container", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-switch-container-horizontal-padding": {
      name: "rmd-switch-container-horizontal-padding",
      description:
        "The horizontal padding for the switch container. This should generally be large enough so that the ball does not overlap the label or other elements.",
      source: "packages/form/src/toggle/_variables.scss#L77",
      usedBy: [
        { name: "rmd-switch-container", type: "mixin", packageName: "form" },
      ],
      packageName: "form",
      type: "Number",
      value: "$rmd-switch-ball-size / 2",
      compiled: "0.625rem",
      overridable: true,
    },
    "rmd-switch-ball-disabled-color": {
      name: "rmd-switch-ball-disabled-color",
      description:
        "The color to use for the switch's ball when it is toggled on and disabled.",
      source: "packages/form/src/toggle/_variables.scss#L84-L90",
      usedBy: [
        { name: "rmd-switch-input", type: "mixin", packageName: "form" },
      ],
      requires: [
        {
          name: "rmd-theme-get-swatch",
          type: "function",
          packageName: "theme",
        },
        { name: "rmd-theme-secondary", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value:
        "rmd-theme-get-swatch(\n  $rmd-theme-secondary,\n  200,\n  false,\n  darken($rmd-theme-secondary, 5%),\n  rmd-switch-ball-disabled-color\n)",
      compiled: "#f48fb1",
      overridable: true,
    },
    "rmd-switch-progress-width": {
      name: "rmd-switch-progress-width",
      description:
        "The width of the circular progress bar. This will make the progress bar more prominent than the normal circular progress.\n",
      source: "packages/form/src/toggle/_variables.scss#L95",
      usedBy: [{ name: "rmd-switch", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "Number",
      value: "12",
      overridable: true,
    },
    "rmd-switch-progress-background-color": {
      name: "rmd-switch-progress-background-color",
      description:
        "The background color to use for the switch's ball while the the switch is loading.",
      source: "packages/form/src/toggle/_variables.scss#L101",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      requires: [
        { name: "rmd-white-base", type: "variable", packageName: "theme" },
      ],
      packageName: "form",
      type: "Color",
      value: "$rmd-white-base",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-switch-progress-padding": {
      name: "rmd-switch-progress-padding",
      description:
        "The amount of padding to apply to the async switch's progress bar. This will make it so there is some space between the switch's ball and the progress bar.\n",
      source: "packages/form/src/toggle/_variables.scss#L106",
      usedBy: [{ name: "react-md-toggle", type: "mixin", packageName: "form" }],
      packageName: "form",
      type: "Number",
      value: "0.125rem",
      overridable: true,
    },
  },
};

export default sassdoc;
