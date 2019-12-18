/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-alert-theme": {
      name: "rmd-alert-theme",
      description:
        "This function is used to quickly get one of the alert's theme values. This is really\njust for the `rmd-alert-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/alert/src/_functions.scss#L14-L16",
      packageName: "alert",
      code: "@function rmd-alert-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-alert-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-alert-theme-values, alert);\n}",
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
        "This function is used to get one of the alert's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-alert-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/alert/src/_functions.scss#L29-L31",
      packageName: "alert",
      code:
        "@function rmd-alert-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-alert-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-alert-theme-values, alert, $fallback);\n}",
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
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
        "This function is used to quickly get one of the alert's theme values. This is really\njust for the `rmd-alert-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/alert/src/_functions.scss#L14-L16",
      packageName: "alert",
      code: "@function rmd-alert-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-alert-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-alert-theme-values, alert);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-alert-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-alert-theme-var": {
      name: "rmd-alert-theme-var",
      description:
        "This function is used to get one of the alert's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-alert-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/alert/src/_functions.scss#L29-L31",
      packageName: "alert",
      code:
        "@function rmd-alert-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-alert-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-alert-theme-values, alert, $fallback);\n}",
      type: "mixin",
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
    },
  },
  variables: {
    "rmd-snackbar-margin": {
      name: "rmd-snackbar-margin",
      description:
        "The amount of margin to apply to the snackbar so that it does not touch the viewport\nedges.\n",
      source: "packages/alert/src/_variables.scss#L10",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-snackbar-z-index": {
      name: "rmd-snackbar-z-index",
      description: "The z-index for the snackbar.\n",
      source: "packages/alert/src/_variables.scss#L14",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "100",
      overridable: true,
    },
    "rmd-toast-border-radius": {
      name: "rmd-toast-border-radius",
      description: "The border radius to apply to a toast.\n",
      source: "packages/alert/src/_variables.scss#L18",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-toast-background-color": {
      name: "rmd-toast-background-color",
      description: "The background color for a toast.\n",
      source: "packages/alert/src/_variables.scss#L22",
      packageName: "alert",
      type: "Color",
      value: "#323232",
      overridable: true,
    },
    "rmd-toast-color": {
      name: "rmd-toast-color",
      description: "The text color for a toast.\n",
      source: "packages/alert/src/_variables.scss#L26",
      packageName: "alert",
      type: "Color",
      value: "$rmd-white-base",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-toast-min-height": {
      name: "rmd-toast-min-height",
      description: "The minimum height for a single line toast.\n",
      source: "packages/alert/src/_variables.scss#L30",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-toast-two-line-min-height": {
      name: "rmd-toast-two-line-min-height",
      description: "The minimum height for a two line toast.\n",
      source: "packages/alert/src/_variables.scss#L34",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "4.25rem",
      overridable: true,
    },
    "rmd-toast-min-width": {
      name: "rmd-toast-min-width",
      description:
        "The min-width to apply to toasts for larger screens. Mobile devices that are smaller than this\nwill just span the entire viewport excluding the default snackbar margin.\n",
      source: "packages/alert/src/_variables.scss#L39",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "21.5rem",
      overridable: true,
    },
    "rmd-toast-vertical-padding": {
      name: "rmd-toast-vertical-padding",
      description:
        "The amount of padding to apply to the top and bottom of the toast.\n",
      source: "packages/alert/src/_variables.scss#L43",
      usedBy: [
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
      ],
      packageName: "alert",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-toast-horizontal-padding": {
      name: "rmd-toast-horizontal-padding",
      description:
        "The amount of padding to apply to the left and right of the toast's message. When there is also\nan action in the toast, the right padding will be reduced to the `$rmd-toast-action-margin`.\n",
      source: "packages/alert/src/_variables.scss#L48",
      usedBy: [
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
      ],
      packageName: "alert",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-toast-action-margin": {
      name: "rmd-toast-action-margin",
      description:
        "The amount of margin to apply to the toast's action if there is one. This will be applied to the left\nand right of the action.\n",
      source: "packages/alert/src/_variables.scss#L53",
      usedBy: [
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
      ],
      packageName: "alert",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-toast-stacked-action-margin-top": {
      name: "rmd-toast-stacked-action-margin-top",
      description:
        "The amount of margin-top to apply to the action button when it has been stacked within the toast.\n",
      source: "packages/alert/src/_variables.scss#L57",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "1",
      overridable: true,
    },
    "rmd-toast-elevation": {
      name: "rmd-toast-elevation",
      description:
        "The elevation to add to a toast. This will be used to create the correct box-shadow.\n",
      source: "packages/alert/src/_variables.scss#L61",
      usedBy: [{ name: "react-md-alert", type: "mixin", packageName: "alert" }],
      packageName: "alert",
      type: "Number",
      value: "6",
      overridable: true,
    },
    "rmd-toast-enter-duration": {
      name: "rmd-toast-enter-duration",
      description:
        "The transition duration for the enter animation for a toast. If this value gets updated, you'll\nalso need to update the `timoout` prop on the `Toast` as well.\n",
      source: "packages/alert/src/_variables.scss#L66",
      usedBy: [
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
      ],
      packageName: "alert",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-toast-exit-duration": {
      name: "rmd-toast-exit-duration",
      description:
        "The transition duration for the exit animation for a toast. If this value gets updated, you'll\nalso need to update the `timoout` prop on the `Toast` as well.\n",
      source: "packages/alert/src/_variables.scss#L71",
      usedBy: [
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
      ],
      packageName: "alert",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-alert-theme-values": {
      name: "rmd-alert-theme-values",
      description:
        'A Map of all the "themeable" parts of the alert package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/alert/src/_variables.scss#L77-L80",
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
        "(\n  toast-background-color: $rmd-toast-background-color,\n  toast-color: $rmd-toast-color,\n)",
      compiled:
        "(\n  toast-background-color: #323232,\n  toast-color: #fff,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
