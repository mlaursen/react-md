/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-form-theme": {
      name: "rmd-form-theme",
      description:
        "This function is used to quickly get one of the form's theme values. This is really just for the `rmd-form-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/form/src/_functions.scss#L15-L17",
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
        { name: "rmd-toggle-dense-theme", type: "mixin", packageName: "form" },
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
      usedBy: [{ name: "rmd-label", type: "mixin", packageName: "form" }],
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
        { name: "rmd-toggle-dense-theme", type: "mixin", packageName: "form" },
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-dark", type: "mixin", packageName: "theme" },
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
    "react-md-form": {
      name: "react-md-form",
      description:
        "Creates the styles for forms within react-md. This requires either the `rmd-form-use-font-forms` or `rmd-form-use-svg-forms` variables to be enabled to generate any styles.\n",
      source: "packages/form/src/_mixins.scss#L36-L54",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "form",
      code: "@mixin react-md-form { … }",
      sourceCode:
        "@mixin react-md-form {\n  $omit: (\n    addon-top label-left-offset label-top-offset label-active-background-color\n      label-active-padding text-offset text-padding-left text-padding-right\n      text-padding-top\n  );\n  @include rmd-theme-create-root-theme($rmd-form-theme-values, form, $omit);\n\n  @include react-md-file-input;\n  @include react-md-label;\n  @include react-md-toggle;\n  @include react-md-text-field;\n  // has to come after text field since it overrides some of the\n  // text-field-container styles\n  @include react-md-select;\n\n  .rmd-fieldset {\n    @include rmd-fieldset;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-label": {
      name: "rmd-label",
      description:
        "Creates the base styles for a `<label>` element as well as all the different states a label can be in.\n",
      source: "packages/form/src/label/_mixins.scss#L14-L33",
      packageName: "form",
      code: "@mixin rmd-label { … }",
      sourceCode:
        "@mixin rmd-label {\n  @include rmd-typography(body-1);\n  @include rmd-transition(standard);\n\n  display: inline-flex;\n  font-size: $rmd-label-font-size;\n  transition: color $rmd-transition-standard-time;\n\n  &--active {\n    @include rmd-form-theme(color, active-color);\n  }\n\n  &--error {\n    @include rmd-form-theme(color, error-color);\n  }\n\n  &--disabled {\n    @include rmd-form-theme(color, disabled-color);\n  }\n}\n",
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
      packageName: "form",
      code: "@mixin rmd-text-field-base { … }",
      sourceCode:
        "@mixin rmd-text-field-base {\n  @include rmd-typography(body-1, font-size);\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-text-field-placeholder {\n    @include rmd-transition(standard);\n    @include rmd-theme(color, text-secondary-on-background);\n\n    // want to gain the same font styles as the input/textarea itself,\n    // just apply different colors as needed instead. Can't just do font: inherit\n    // since it'll break the styles in firefox.\n    font-family: inherit;\n    font-size: inherit;\n    font-weight: inherit;\n  }\n\n  background-color: transparent;\n  border-width: 0;\n  color: inherit;\n  font-size: 1em;\n  width: 100%;\n\n  &[disabled] {\n    @include rmd-theme(color, text-disabled-on-background);\n\n    @include rmd-text-field-placeholder {\n      @include rmd-theme(color, text-disabled-on-background);\n    }\n  }\n}\n",
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
      packageName: "form",
      code: "@mixin rmd-toggle-dense-theme { … }",
      sourceCode:
        "@mixin rmd-toggle-dense-theme {\n  @include rmd-form-theme-update-var(\n    toggle-inset,\n    rmd-form-theme-var(toggle-dense-inset)\n  );\n  @include rmd-form-theme-update-var(\n    indeterminate-height,\n    rmd-form-theme-var(indeterminate-dense-height)\n  );\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-form-error-color": {
      name: "rmd-form-error-color",
      description: "The color to use when a form contains an error.\n",
      source: "packages/form/src/_variables.scss#L17",
      packageName: "form",
      type: "Color",
      value: "$rmd-theme-error",
      compiled: "#f44336",
      overridable: true,
    },
    "rmd-form-error-hover-color": {
      name: "rmd-form-error-hover-color",
      description:
        "This is the color that is used when a text field/textarea is errored and the user hovers over it.\n",
      source: "packages/form/src/_variables.scss#L22-L27",
      packageName: "form",
      type: "Color",
      value:
        "rmd-theme-get-swatch(\n  $rmd-form-error-color,\n  700,\n  true,\n  darken($rmd-form-error-color, 20%)\n)",
      compiled: "#d50000",
      overridable: true,
    },
    "rmd-form-active-color": {
      name: "rmd-form-active-color",
      description:
        "The color to use when a form element (text, checkbox, radio, etc) is currently active by the user(normally focus).\n",
      source: "packages/form/src/_variables.scss#L32",
      packageName: "form",
      type: "Color",
      value: "rmd-theme-var(secondary)",
      compiled: "var(--rmd-theme-secondary, #f50057)",
      overridable: true,
    },
    "rmd-form-disabled-color": {
      name: "rmd-form-disabled-color",
      description: "The color to use when a form element is disabled.\n",
      source: "packages/form/src/_variables.scss#L36",
      packageName: "form",
      type: "Color",
      value: "rmd-theme-var(text-disabled-on-background)",
      compiled: "var(--rmd-theme-text-disabled-on-background, #9e9e9e)",
      overridable: true,
    },
    "rmd-form-placeholder-color": {
      name: "rmd-form-placeholder-color",
      description:
        "The default color to use for placeholder text within text fields.\n",
      source: "packages/form/src/_variables.scss#L40",
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
      source: "packages/form/src/_variables.scss#L48-L80",
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
      source: "packages/form/src/select/_variables.scss#L11",
      packageName: "form",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-select-native-addon-top": {
      name: "rmd-select-native-addon-top",
      description:
        "The default position for a text-field addon when the native select is a multi-select. If this isn't set, the addon will always be centered based on the size of the select field instead.\n",
      source: "packages/form/src/select/_variables.scss#L17",
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-listbox-z-index": {
      name: "rmd-listbox-z-index",
      description: "The z-index to use for a temporary listbox.\n",
      source: "packages/form/src/select/_variables.scss#L21",
      packageName: "form",
      type: "Number",
      value: "10",
      overridable: true,
    },
    "rmd-listbox-elevation": {
      name: "rmd-listbox-elevation",
      description:
        "The elevation level for a temporary listbox. This should be a number between 0-24 as it generates a material design box shadow value.\n",
      source: "packages/form/src/select/_variables.scss#L26",
      packageName: "form",
      type: "Number",
      value: "8",
      overridable: true,
    },
    "rmd-option-focused-styles": {
      name: "rmd-option-focused-styles",
      description:
        "The styles to apply when an option is focused with `aria-activedescendant` behavior. This should be a map of styles that should be applied.\n",
      source: "packages/form/src/select/_variables.scss#L31-L33",
      packageName: "form",
      type: "Map",
      value: "(\n  box-shadow: inset 0 0 0 2px $rmd-blue-500,\n)",
      compiled: "(\n  box-shadow: inset 0 0 0 2px #2196f3,\n)",
      overridable: true,
    },
    "rmd-option-selected-styles": {
      name: "rmd-option-selected-styles",
      description:
        "The styles to apply when an option is selected. This should be a map of style properties with values to apply.\n",
      source: "packages/form/src/select/_variables.scss#L38-L41",
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
      source: "packages/form/src/select/_variables.scss#L46",
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-option-selected-content": {
      name: "rmd-option-selected-content",
      description:
        "The content to use for the selected state of the option. If this value is set to null, the `::after` styles will not be created and the `$rmd-option-horizontal-padding` variable will not be used to update the list item's horizontal padding for options. This is useful if you want to use icons or ignore the selected state instead.\n",
      source: "packages/form/src/select/_variables.scss#L54",
      packageName: "form",
      type: "String",
      value: "'\\2713'",
      overridable: true,
    },
    "rmd-option-horizontal-padding": {
      name: "rmd-option-horizontal-padding",
      description:
        "The amount of horizontal padding that should be applied to each option.\nThis overrides the `$rmd-list-item-horizontal-padding` css variable so that the selected checkmark styles can appear nicely.\n",
      source: "packages/form/src/select/_variables.scss#L61",
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
        "The color to use for the text field's borders/underlines while the user is focusing the text field.\n",
      source: "packages/form/src/text-field/_variables.scss#L13",
      packageName: "form",
      type: "Color",
      value: "$rmd-states-focus-shadow-color",
      compiled: "#2196f3",
      overridable: true,
    },
    "rmd-text-field-light-border-color": {
      name: "rmd-text-field-light-border-color",
      description:
        "The text field's border color to use in light themed apps or backgrounds.\n",
      source: "packages/form/src/text-field/_variables.scss#L17",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
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
        "The text field's border color to use in dark themed apps or backgrounds.\n",
      source: "packages/form/src/text-field/_variables.scss#L21",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "form",
      type: "Color",
      value: "rgba($rmd-white-base, 0.5)",
      compiled: "rgba(255, 255, 255, 0.5)",
      overridable: true,
    },
    "rmd-text-field-border-color": {
      name: "rmd-text-field-border-color",
      description: "The default text field's border color to use.\n",
      source: "packages/form/src/text-field/_variables.scss#L25-L29",
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
        "The text field's border color to use in light themed apps or backgrounds when the user is hovering the text field.\n",
      source: "packages/form/src/text-field/_variables.scss#L34",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
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
        "The text field's border color to use in dark themed apps or backgrounds when the user is hovering the text field.\n",
      source: "packages/form/src/text-field/_variables.scss#L39",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "form",
      type: "Color",
      value: "rgba($rmd-white-base, 0.87)",
      compiled: "rgba(255, 255, 255, 0.87)",
      overridable: true,
    },
    "rmd-text-field-border-hover-color": {
      name: "rmd-text-field-border-hover-color",
      description: "The default text field's hover border color to use.\n",
      source: "packages/form/src/text-field/_variables.scss#L43-L47",
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
      source: "packages/form/src/text-field/_variables.scss#L51",
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-text-field-border-width": {
      name: "rmd-text-field-border-width",
      description: "The default border width for outlined text fields.\n",
      source: "packages/form/src/text-field/_variables.scss#L55",
      packageName: "form",
      type: "Number",
      value: "1px",
      overridable: true,
    },
    "rmd-text-field-border-width-active": {
      name: "rmd-text-field-border-width-active",
      description:
        "The border width for outlined text fields that are currently focused.\n",
      source: "packages/form/src/text-field/_variables.scss#L59",
      packageName: "form",
      type: "Number",
      value: "2px",
      overridable: true,
    },
    "rmd-text-field-label-height": {
      name: "rmd-text-field-label-height",
      description: "The height to use for a text field with a label.\n",
      source: "packages/form/src/text-field/_variables.scss#L63",
      packageName: "form",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-text-field-label-dense-height": {
      name: "rmd-text-field-label-dense-height",
      description:
        "The height to use for a text field with a label with the dense spec.\n",
      source: "packages/form/src/text-field/_variables.scss#L67",
      packageName: "form",
      type: "Number",
      value: "3.25rem",
      overridable: true,
    },
    "rmd-text-field-height": {
      name: "rmd-text-field-height",
      description:
        "The height to use for a text field without a label (so placeholder only).\n",
      source: "packages/form/src/text-field/_variables.scss#L71",
      packageName: "form",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-text-field-dense-height": {
      name: "rmd-text-field-dense-height",
      description:
        "The height to use for a text field without a label with the dense spec (so placeholder only).\n",
      source: "packages/form/src/text-field/_variables.scss#L76",
      packageName: "form",
      type: "Number",
      value: "2.5rem",
      overridable: true,
    },
    "rmd-text-field-outline-padding": {
      name: "rmd-text-field-outline-padding",
      description:
        "The amount of padding to apply to the left and right of the text field when it has the outline theme applied.\n",
      source: "packages/form/src/text-field/_variables.scss#L81",
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-text-field-underline-label-padding-top": {
      name: "rmd-text-field-underline-label-padding-top",
      description:
        "The amount of padding to apply to the top of an underlined or filled text field. This is used to push the input down a little bit to look nice with the floating label.\n",
      source: "packages/form/src/text-field/_variables.scss#L87",
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-text-field-underline-label-left-offset": {
      name: "rmd-text-field-underline-label-left-offset",
      description:
        "The amount of offset to apply to the floating label for an underlined or filled text field when there is an icon to the left of the input.\n",
      source: "packages/form/src/text-field/_variables.scss#L92",
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
      source: "packages/form/src/text-field/_variables.scss#L98",
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-text-field-underline-padding": {
      name: "rmd-text-field-underline-padding",
      description:
        "The amount of padding to apply to the left and right of the text field when it has the underline theme applied.\n",
      source: "packages/form/src/text-field/_variables.scss#L103",
      packageName: "form",
      type: "Number",
      value: "null",
      overridable: true,
    },
    "rmd-text-field-filled-padding": {
      name: "rmd-text-field-filled-padding",
      description:
        "The amount of padding to apply to the left and right of the text field when it has the filled theme applied.\n",
      source: "packages/form/src/text-field/_variables.scss#L108",
      packageName: "form",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-text-field-filled-light-background-color": {
      name: "rmd-text-field-filled-light-background-color",
      description:
        "The background color to use for filled text fields when using the light theme.\n",
      source: "packages/form/src/text-field/_variables.scss#L113",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
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
        "The background color to use for filled text fields when using the dark theme.\n",
      source: "packages/form/src/text-field/_variables.scss#L118",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "form",
      type: "Color",
      value: "$rmd-grey-700",
      compiled: "#616161",
      overridable: true,
    },
    "rmd-text-field-filled-background-color": {
      name: "rmd-text-field-filled-background-color",
      description: "The default background color for filled text fields.\n",
      source: "packages/form/src/text-field/_variables.scss#L122-L126",
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
      source: "packages/form/src/text-field/_variables.scss#L131",
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-text-field-addon-margin": {
      name: "rmd-text-field-addon-margin",
      description:
        "The amount of spacing between the left or right of the text field and the icon.\n",
      source: "packages/form/src/text-field/_variables.scss#L136",
      packageName: "form",
      type: "Number",
      value: "$rmd-icon-spacing-with-text",
      compiled: "0.5rem",
      overridable: true,
    },
    "rmd-textarea-vertical-padding": {
      name: "rmd-textarea-vertical-padding",
      description: "An additional amount of padding to apply to textareas.\n",
      source: "packages/form/src/text-field/_variables.scss#L140",
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-textarea-addon-top": {
      name: "rmd-textarea-addon-top",
      description:
        "The amount to start offseting the textarea's left/right inline addon icons.\nIf this value isn't set, the icons will be centered in the textarea's height and will continually be centered as the user types more and more text.\n",
      source: "packages/form/src/text-field/_variables.scss#L146",
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-form-message-min-height": {
      name: "rmd-form-message-min-height",
      description:
        "The minimum height for the `FormMessage` component. This is really just required to help prevent layout changes when the messages are added and removed from the DOM.",
      source: "packages/form/src/text-field/_variables.scss#L153",
      packageName: "form",
      type: "Number",
      value: "2rem",
      overridable: true,
    },
    "rmd-form-message-margin-top": {
      name: "rmd-form-message-margin-top",
      description:
        "The amount of margin that should be applied to the top of the `FormMessage` component.\n",
      source: "packages/form/src/text-field/_variables.scss#L158",
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-form-message-margin-bottom": {
      name: "rmd-form-message-margin-bottom",
      description:
        "The amount of margin that should be applied to the top of the `FormMessage` component.\n",
      source: "packages/form/src/text-field/_variables.scss#L163",
      packageName: "form",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-form-message-counter-spacing": {
      name: "rmd-form-message-counter-spacing",
      description:
        "The amount of padding to apply to the left of the `FormMessage`'s counter component.",
      source: "packages/form/src/text-field/_variables.scss#L169",
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
      source: "packages/form/src/text-field/_variables.scss#L177",
      packageName: "form",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-toggle-border-radius": {
      name: "rmd-toggle-border-radius",
      description: "The border radius for the checkbox and radio components.\n",
      source: "packages/form/src/toggle/_variables.scss#L10",
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
      packageName: "form",
      type: "Number",
      value: "2.25rem",
      overridable: true,
    },
    "rmd-switch-track-background-color": {
      name: "rmd-switch-track-background-color",
      description:
        "The background color for a switch's track. This is the element that the ball animates left and right on.\n",
      source: "packages/form/src/toggle/_variables.scss#L46",
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
      source: "packages/form/src/toggle/_variables.scss#L51",
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-switch-ball-size": {
      name: "rmd-switch-ball-size",
      description: "The size of the switch's ball.\n",
      source: "packages/form/src/toggle/_variables.scss#L55",
      packageName: "form",
      type: "Number",
      value: "1.25rem",
      overridable: true,
    },
    "rmd-switch-ball-border-radius": {
      name: "rmd-switch-ball-border-radius",
      description: "The border radius for the switch's ball.\n",
      source: "packages/form/src/toggle/_variables.scss#L59",
      packageName: "form",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-switch-ball-offset": {
      name: "rmd-switch-ball-offset",
      description:
        "The amount of offset that should be applied to the ball relative to its track. This is really used so the ball can overlap the track a bit to look a bit nicer.\n",
      source: "packages/form/src/toggle/_variables.scss#L64",
      packageName: "form",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-switch-container-vertical-padding": {
      name: "rmd-switch-container-vertical-padding",
      description:
        "The vertical padding for the switch container. This should generally be large enough so that the ball does not overlap any other elements.\n",
      source: "packages/form/src/toggle/_variables.scss#L69",
      packageName: "form",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-switch-container-horizontal-padding": {
      name: "rmd-switch-container-horizontal-padding",
      description:
        "The horizontal padding for the switch container. This should generally be large enough so that the ball does not overlap the label or other elements.\n",
      source: "packages/form/src/toggle/_variables.scss#L74",
      packageName: "form",
      type: "Number",
      value: "$rmd-switch-ball-size / 2",
      compiled: "0.625rem",
      overridable: true,
    },
    "rmd-switch-ball-disabled-color": {
      name: "rmd-switch-ball-disabled-color",
      description:
        "The color to use for the switch's ball when it is toggled on and disabled.\n",
      source: "packages/form/src/toggle/_variables.scss#L78-L83",
      packageName: "form",
      type: "Color",
      value:
        "rmd-theme-get-swatch(\n  $rmd-theme-secondary,\n  200,\n  false,\n  lighten($rmd-theme-secondary, 12%)\n)",
      compiled: "#f48fb1",
      overridable: true,
    },
    "rmd-switch-progress-width": {
      name: "rmd-switch-progress-width",
      description:
        "The width of the circular progress bar. This will make the progress bar more prominent than the normal circular progress.\n",
      source: "packages/form/src/toggle/_variables.scss#L88",
      packageName: "form",
      type: "Number",
      value: "12",
      overridable: true,
    },
    "rmd-switch-progress-background-color": {
      name: "rmd-switch-progress-background-color",
      description:
        "The background color to use for the switch's ball while the the switch is loading.\n",
      source: "packages/form/src/toggle/_variables.scss#L92",
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
      source: "packages/form/src/toggle/_variables.scss#L97",
      packageName: "form",
      type: "Number",
      value: "0.125rem",
      overridable: true,
    },
  },
};

export default sassdoc;
