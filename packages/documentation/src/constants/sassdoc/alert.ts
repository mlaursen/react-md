/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-alert-theme": {
      name: "rmd-alert-theme",
      description:
        "This function is used to quickly get one of the alert's theme values. This is really just for the `rmd-alert-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/alert/src/_functions.scss#L15-L17",
      packageName: "alert",
      code: "@function rmd-alert-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-alert-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-alert-theme-values, alert);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-alert-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the alert's theme values.",
      },
    },
    "rmd-alert-theme-var": {
      name: "rmd-alert-theme-var",
      description:
        "This function is used to get one of the alert's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-alert-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/alert/src/_functions.scss#L32-L34",
      packageName: "alert",
      code:
        "@function rmd-alert-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-alert-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-alert-theme-values,\n    alert,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-alert-theme-values` map keys to set a value for.",
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
        description: "one of the alert's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-alert-theme": {
      name: "rmd-alert-theme",
      description:
        "Creates the styles for one of the alert's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/alert/src/_mixins.scss#L24-L26",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      code:
        "@mixin rmd-alert-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-alert-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-alert-theme-values,\n    alert\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-alert-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-alert-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-alert-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-alert-theme-update-var": {
      name: "rmd-alert-theme-update-var",
      description:
        "Updates one of the alert's theme variables with the new value for the section of your app.",
      source: "packages/alert/src/_mixins.scss#L34-L36",
      packageName: "alert",
      code: "@mixin rmd-alert-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-alert-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-alert-theme-values,\n    alert\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The alert theme style type to update. This should be one of the `$rmd-alert-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-snackbar": {
      name: "rmd-snackbar",
      description:
        "Generates the styles for a snackbar and should probably only be used internally.\n",
      source: "packages/alert/src/_mixins.scss#L40-L52",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      code: "@mixin rmd-snackbar { … }",
      sourceCode:
        "@mixin rmd-snackbar {\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  left: 0;\n  margin: $rmd-snackbar-margin;\n  // disable pointer events since otherwise this will block clicking on elements while the toast\n  // is visible. they will be re-enabled on the toast itself.\n  pointer-events: none;\n  position: fixed;\n  right: 0;\n  z-index: $rmd-snackbar-z-index;\n}\n",
      type: "mixin",
    },
    "rmd-toast": {
      name: "rmd-toast",
      description:
        "Generates the styles for a toast and should probably only be used internally.\n",
      source: "packages/alert/src/_mixins.scss#L56-L143",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      code: "@mixin rmd-toast { … }",
      sourceCode:
        "@mixin rmd-toast {\n  @include rmd-elevation($rmd-toast-elevation);\n  @include rmd-typography(subtitle-2);\n  @include rmd-alert-theme(background-color);\n  @include rmd-alert-theme(color);\n\n  align-items: center;\n  border-radius: $rmd-toast-border-radius;\n  display: flex;\n  min-height: $rmd-toast-min-height;\n  min-width: $rmd-toast-min-width;\n  padding: 0 $rmd-toast-horizontal-padding;\n  pointer-events: auto;\n  transform-origin: center;\n\n  &--padded {\n    padding-bottom: $rmd-toast-vertical-padding;\n    padding-top: $rmd-toast-vertical-padding;\n  }\n\n  &--action {\n    @include rmd-utils-rtl-auto(\n      padding-right,\n      0,\n      $rmd-toast-horizontal-padding\n    );\n  }\n\n  &--two-lines {\n    min-height: $rmd-toast-two-line-min-height;\n  }\n\n  &--stacked {\n    flex-direction: column;\n    padding-bottom: 0;\n  }\n\n  &--enter {\n    @include rmd-transition(deceleration);\n\n    opacity: 0;\n    transform: scale(0);\n    transition: opacity $rmd-toast-enter-duration,\n      transform $rmd-toast-enter-duration;\n  }\n\n  &--enter-active {\n    opacity: 1;\n    transform: scale(1);\n  }\n\n  &--exit {\n    @include rmd-transition(acceleration);\n\n    opacity: 1;\n    transform: scale(1);\n  }\n\n  &--exit-active {\n    opacity: 0;\n    transform: scale(0);\n    transition: opacity $rmd-toast-exit-duration,\n      transform $rmd-toast-exit-duration;\n  }\n\n  &__message {\n    @include rmd-utils-rtl-auto(margin-right, auto);\n\n    display: inline-flex;\n    flex: 1 1 auto;\n    flex-wrap: wrap;\n\n    &--action {\n      @include rmd-utils-rtl-auto(\n        padding-right,\n        $rmd-toast-horizontal-padding,\n        0\n      );\n    }\n\n    p {\n      margin: 0;\n      width: 100%;\n    }\n  }\n\n  &__action {\n    display: inline-flex;\n    flex-shrink: 0;\n    margin: 0 $rmd-toast-action-margin;\n\n    &--stacked {\n      align-self: flex-end;\n      margin-bottom: $rmd-toast-action-margin;\n      margin-top: $rmd-toast-stacked-action-margin-top;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "react-md-alert": {
      name: "react-md-alert",
      description:
        "Creates all the styles for this package as well as defining all the theme CSS variables.\n",
      source: "packages/alert/src/_mixins.scss#L147-L157",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "alert",
      code: "@mixin react-md-alert { … }",
      sourceCode:
        "@mixin react-md-alert {\n  @include rmd-theme-create-root-theme($rmd-alert-theme-values, alert);\n\n  .rmd-snackbar {\n    @include rmd-snackbar;\n  }\n\n  .rmd-toast {\n    @include rmd-toast;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-snackbar-margin": {
      name: "rmd-snackbar-margin",
      description:
        "The amount of margin to apply to the snackbar so that it does not touch the viewport edges.\n",
      source: "packages/alert/src/_variables.scss#L13",
      usedBy: [{ name: "rmd-snackbar", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-snackbar-z-index": {
      name: "rmd-snackbar-z-index",
      description: "The z-index for the snackbar.",
      source: "packages/alert/src/_variables.scss#L19",
      usedBy: [{ name: "rmd-snackbar", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "$rmd-utils-temporary-element-z-index + 10",
      compiled: "40",
      overridable: true,
    },
    "rmd-toast-border-radius": {
      name: "rmd-toast-border-radius",
      description: "The border radius to apply to a toast.\n",
      source: "packages/alert/src/_variables.scss#L23",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-toast-light-background-color": {
      name: "rmd-toast-light-background-color",
      description: "The background color for a toast in light themes.\n",
      source: "packages/alert/src/_variables.scss#L27",
      packageName: "alert",
      type: "Color",
      value: "#323232",
      overridable: true,
    },
    "rmd-toast-light-color": {
      name: "rmd-toast-light-color",
      description: "The text color for a toast in light themes.",
      source: "packages/alert/src/_variables.scss#L33",
      packageName: "alert",
      type: "Color",
      value: "$rmd-white-base",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-toast-dark-background-color": {
      name: "rmd-toast-dark-background-color",
      description: "The background color for a toast in dark themes.\n",
      source: "packages/alert/src/_variables.scss#L37",
      packageName: "alert",
      type: "Color",
      value: "$rmd-toast-light-background-color",
      compiled: "#323232",
      overridable: true,
    },
    "rmd-toast-dark-color": {
      name: "rmd-toast-dark-color",
      description: "The text color for a toast in dark themes",
      source: "packages/alert/src/_variables.scss#L42",
      packageName: "alert",
      type: "Color",
      value: "$rmd-toast-light-color",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-toast-background-color": {
      name: "rmd-toast-background-color",
      description: "The default background color for toasts.",
      source: "packages/alert/src/_variables.scss#L48-L52",
      packageName: "alert",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-toast-light-background-color,\n  $rmd-toast-dark-background-color\n)",
      compiled: "#323232",
      overridable: true,
    },
    "rmd-toast-color": {
      name: "rmd-toast-color",
      description: "The default text color for toasts",
      source: "packages/alert/src/_variables.scss#L58",
      packageName: "alert",
      type: "Color",
      value:
        "if($rmd-theme-light, $rmd-toast-light-color, $rmd-toast-dark-color)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-toast-min-height": {
      name: "rmd-toast-min-height",
      description: "The minimum height for a single line toast.\n",
      source: "packages/alert/src/_variables.scss#L62",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-toast-two-line-min-height": {
      name: "rmd-toast-two-line-min-height",
      description: "The minimum height for a two line toast.\n",
      source: "packages/alert/src/_variables.scss#L66",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "4.25rem",
      overridable: true,
    },
    "rmd-toast-min-width": {
      name: "rmd-toast-min-width",
      description:
        "The min-width to apply to toasts for larger screens. Mobile devices that are smaller than this will just span the entire viewport excluding the default snackbar margin.\n",
      source: "packages/alert/src/_variables.scss#L72",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "21.5rem",
      overridable: true,
    },
    "rmd-toast-vertical-padding": {
      name: "rmd-toast-vertical-padding",
      description:
        "The amount of padding to apply to the top and bottom of the toast.\n",
      source: "packages/alert/src/_variables.scss#L76",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-toast-horizontal-padding": {
      name: "rmd-toast-horizontal-padding",
      description:
        "The amount of padding to apply to the left and right of the toast's message.\nWhen there is also an action in the toast, the right padding will be reduced to the `$rmd-toast-action-margin`.\n",
      source: "packages/alert/src/_variables.scss#L82",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-toast-action-margin": {
      name: "rmd-toast-action-margin",
      description:
        "The amount of margin to apply to the toast's action if there is one. This will be applied to the left and right of the action.\n",
      source: "packages/alert/src/_variables.scss#L87",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-toast-stacked-action-margin-top": {
      name: "rmd-toast-stacked-action-margin-top",
      description:
        "The amount of margin-top to apply to the action button when it has been stacked within the toast.\n",
      source: "packages/alert/src/_variables.scss#L92",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-toast-elevation": {
      name: "rmd-toast-elevation",
      description:
        "The elevation to add to a toast. This will be used to create the correct box-shadow.\n",
      source: "packages/alert/src/_variables.scss#L97",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "6",
      overridable: true,
    },
    "rmd-toast-enter-duration": {
      name: "rmd-toast-enter-duration",
      description:
        "The transition duration for the enter animation for a toast. If this value gets updated, you'll also need to update the `timoout` prop on the `Toast` as well.",
      source: "packages/alert/src/_variables.scss#L105",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "$rmd-transition-standard-time",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-toast-exit-duration": {
      name: "rmd-toast-exit-duration",
      description:
        "The transition duration for the exit animation for a toast. If this value gets updated, you'll also need to update the `timoout` prop on the `Toast` as well.",
      source: "packages/alert/src/_variables.scss#L113",
      usedBy: [{ name: "rmd-toast", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "$rmd-transition-standard-time",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-alert-theme-values": {
      name: "rmd-alert-theme-values",
      description:
        'A Map of all the "themeable" parts of the alert package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/alert/src/_variables.scss#L119-L126",
      usedBy: [
        { name: "rmd-alert-theme", type: "function", packageName: "alert" },
        { name: "rmd-alert-theme-var", type: "function", packageName: "alert" },
        { name: "rmd-alert-theme", type: "mixin", packageName: "alert" },
        {
          name: "rmd-alert-theme-update-var",
          type: "mixin",
          packageName: "alert",
        },
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
      ],
      packageName: "alert",
      type: "Map",
      value:
        "(\n  background-color: $rmd-toast-background-color,\n  color: $rmd-toast-color,\n  light-background-color: $rmd-toast-light-background-color,\n  light-color: $rmd-toast-light-color,\n  dark-background-color: $rmd-toast-dark-background-color,\n  dark-color: $rmd-toast-dark-color,\n)",
      compiled:
        "(\n  background-color: #323232,\n  color: #fff,\n  light-background-color: #323232,\n  light-color: #fff,\n  dark-background-color: #323232,\n  dark-color: #fff,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
