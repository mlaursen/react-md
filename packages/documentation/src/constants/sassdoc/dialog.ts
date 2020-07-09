/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-dialog-theme": {
      name: "rmd-dialog-theme",
      description:
        "This function is used to quickly get one of the dialog's theme values. This is really just for the `rmd-dialog-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/dialog/src/_functions.scss#L15-L17",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-dialog-theme-values",
          type: "variable",
          packageName: "dialog",
        },
      ],
      packageName: "dialog",
      code: "@function rmd-dialog-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-dialog-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-dialog-theme-values,\n    dialog\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-dialog-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the dialog's theme values.",
      },
    },
    "rmd-dialog-theme-var": {
      name: "rmd-dialog-theme-var",
      description:
        "This function is used to get one of the dialog's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-dialog-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/dialog/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "rmd-dialog-container", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-dialog-theme-values",
          type: "variable",
          packageName: "dialog",
        },
      ],
      packageName: "dialog",
      code:
        "@function rmd-dialog-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-dialog-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-dialog-theme-values,\n    dialog,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-dialog-theme-values` map keys to set a value for.",
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
        description: "one of the dialog's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-dialog-theme": {
      name: "rmd-dialog-theme",
      description:
        "Creates the styles for one of the dialog's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/dialog/src/_mixins.scss#L25-L27",
      usedBy: [
        { name: "rmd-dialog", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-header", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-content", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-footer", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-container", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-overlay", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-dialog-theme-values",
          type: "variable",
          packageName: "dialog",
        },
      ],
      packageName: "dialog",
      code:
        "@mixin rmd-dialog-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-dialog-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-dialog-theme-values,\n    dialog\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-dialog-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-dialog-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-dialog-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-dialog-theme-update-var": {
      name: "rmd-dialog-theme-update-var",
      description:
        "Updates one of the dialog's theme variables with the new value for the section of your app.",
      source: "packages/dialog/src/_mixins.scss#L35-L37",
      requires: [
        {
          name: "rmd-theme-update-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-dialog-theme-values",
          type: "variable",
          packageName: "dialog",
        },
      ],
      packageName: "dialog",
      code: "@mixin rmd-dialog-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-dialog-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-dialog-theme-values,\n    dialog\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The dialog theme style type to update. This should be one of the `$rmd-dialog-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-dialog": {
      name: "rmd-dialog",
      description: "Creates the styles for the base dialog element.\n",
      source: "packages/dialog/src/_mixins.scss#L41-L122",
      usedBy: [
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        { name: "rmd-elevation", type: "mixin", packageName: "elevation" },
        {
          name: "rmd-theme-dark-elevation",
          type: "mixin",
          packageName: "theme",
        },
        { name: "rmd-theme-update-var", type: "mixin", packageName: "theme" },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        {
          name: "rmd-app-bar-theme-update-var",
          type: "mixin",
          packageName: "app-bar",
        },
        { name: "rmd-dialog-theme", type: "mixin", packageName: "dialog" },
        { name: "rmd-utils-full-screen", type: "mixin", packageName: "utils" },
        { name: "rmd-utils-scroll", type: "mixin", packageName: "utils" },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
        {
          name: "rmd-dialog-elevation",
          type: "variable",
          packageName: "dialog",
        },
        {
          name: "rmd-dialog-transition-distance",
          type: "variable",
          packageName: "dialog",
        },
        {
          name: "rmd-dialog-enter-duration",
          type: "variable",
          packageName: "dialog",
        },
        {
          name: "rmd-dialog-leave-duration",
          type: "variable",
          packageName: "dialog",
        },
      ],
      packageName: "dialog",
      code: "@mixin rmd-dialog { … }",
      sourceCode:
        "@mixin rmd-dialog {\n  @include rmd-elevation($rmd-dialog-elevation);\n  @include rmd-theme-dark-elevation($rmd-dialog-elevation);\n  @include rmd-theme-update-var(background, rmd-theme-var(surface));\n  @include rmd-theme(background-color, background);\n  @include rmd-theme(color, text-primary-on-background);\n  @include rmd-utils-hide-focus-outline;\n  @if mixin-exists(rmd-app-bar-theme-update-var) {\n    @include rmd-app-bar-theme-update-var(\n      color,\n      rmd-theme-var(text-primary-on-background)\n    );\n  }\n\n  display: flex;\n  flex-direction: column;\n  max-height: 100%;\n  max-width: 100%;\n\n  &--centered {\n    @include rmd-dialog-theme(min-width);\n\n    pointer-events: auto;\n  }\n\n  &--full-page {\n    // this is applied here since there is no longer a container element for\n    // full page dialogs.\n    @include rmd-utils-full-screen;\n    @include rmd-utils-scroll;\n    @include rmd-dialog-theme(z-index);\n  }\n\n  &--enter {\n    transform: translateY($rmd-dialog-transition-distance);\n  }\n\n  &--enter-active {\n    @include rmd-transition(deceleration);\n\n    transform: translateY(0);\n    transition: transform $rmd-dialog-enter-duration;\n  }\n\n  &--exit {\n    @include rmd-transition(acceleration);\n\n    opacity: 1;\n    transform: translateY(0);\n    transition: transform $rmd-dialog-leave-duration,\n      opacity $rmd-dialog-leave-duration;\n  }\n\n  &--exit-active {\n    opacity: 0;\n    transform: translateY($rmd-dialog-transition-distance);\n  }\n\n  &--fixed {\n    @include rmd-dialog-theme(z-index);\n  }\n\n  &--fixed-enter {\n    transform: scale(0);\n  }\n\n  &--fixed-enter-active {\n    @include rmd-transition(deceleration);\n\n    transform: scale(1);\n    transition: transform $rmd-dialog-enter-duration;\n  }\n\n  &--fixed-exit {\n    @include rmd-transition(deceleration);\n\n    opacity: 1;\n    transform: scale(1);\n    transition: transform $rmd-dialog-leave-duration,\n      opacity $rmd-dialog-leave-duration;\n  }\n\n  &--fixed-exit-active {\n    opacity: 0;\n    transform: scale(0);\n  }\n}\n",
      type: "mixin",
    },
    "rmd-dialog-header": {
      name: "rmd-dialog-header",
      description: "Creates the styles for the `DialogHeader` component.\n",
      source: "packages/dialog/src/_mixins.scss#L126-L133",
      usedBy: [
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        { name: "rmd-dialog-theme", type: "mixin", packageName: "dialog" },
      ],
      packageName: "dialog",
      code: "@mixin rmd-dialog-header { … }",
      sourceCode:
        "@mixin rmd-dialog-header {\n  @include rmd-dialog-theme(padding, header-padding);\n  @include rmd-dialog-theme(padding-bottom, header-padding-bottom);\n\n  align-items: center;\n  display: flex;\n  flex: 0 0 auto;\n}\n",
      type: "mixin",
    },
    "rmd-dialog-title": {
      name: "rmd-dialog-title",
      description:
        "Creates the minimal required styles for the `DialogTitle` component.\n",
      source: "packages/dialog/src/_mixins.scss#L137-L141",
      usedBy: [
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
      ],
      packageName: "dialog",
      code: "@mixin rmd-dialog-title { … }",
      sourceCode:
        "@mixin rmd-dialog-title {\n  @include rmd-typography(headline-4);\n\n  margin: 0;\n}\n",
      type: "mixin",
    },
    "rmd-dialog-content": {
      name: "rmd-dialog-content",
      description:
        "Creates the styles for the `DialogContent` component. It is set up so that it will grow to fill the remaining space within the `Dialog` and the `DialogHeader` and `DialogFooter` components will be fixed to the top and bottom edges respectively. It will also include scrolling by default.\n",
      source: "packages/dialog/src/_mixins.scss#L148-L156",
      usedBy: [
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        { name: "rmd-utils-scroll", type: "mixin", packageName: "utils" },
        { name: "rmd-dialog-theme", type: "mixin", packageName: "dialog" },
      ],
      packageName: "dialog",
      code: "@mixin rmd-dialog-content { … }",
      sourceCode:
        "@mixin rmd-dialog-content {\n  @include rmd-utils-scroll;\n\n  flex: 1 1 auto;\n\n  &--padded {\n    @include rmd-dialog-theme(padding, content-padding);\n  }\n}\n",
      type: "mixin",
    },
    "rmd-dialog-footer": {
      name: "rmd-dialog-footer",
      description:
        "Creates the styles for the `DialogFooter` component. It has styles built-in to position the actions in different locations.\n",
      source: "packages/dialog/src/_mixins.scss#L161-L185",
      usedBy: [
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        { name: "rmd-dialog-theme", type: "mixin", packageName: "dialog" },
      ],
      packageName: "dialog",
      code: "@mixin rmd-dialog-footer { … }",
      sourceCode:
        "@mixin rmd-dialog-footer {\n  @include rmd-dialog-theme(padding, footer-padding);\n\n  flex: 0 0 auto;\n\n  &--flex {\n    display: flex;\n  }\n\n  &--flex-v {\n    flex-direction: column;\n  }\n\n  &--start {\n    justify-content: flex-start;\n  }\n\n  &--between {\n    justify-content: space-between;\n  }\n\n  &--end {\n    justify-content: flex-end;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-dialog-container": {
      name: "rmd-dialog-container",
      description:
        "When the dialog is not set to be full page, the dialog gets wrapped in this container component so that it can be centered within the page using flexbox.\n\nIn the past versions, I did some old-school centering logic with `left`,\n`top`, and `transform`, but unfortunately this adds text blur in some browsers and made the transitions harder to customize since you would always need to apply the transforms at each stage of the transition. Using a flexbox approach fixes this.\n",
      source: "packages/dialog/src/_mixins.scss#L197-L206",
      usedBy: [
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        { name: "rmd-utils-full-screen", type: "mixin", packageName: "utils" },
        { name: "rmd-dialog-theme", type: "mixin", packageName: "dialog" },
        {
          name: "rmd-dialog-theme-var",
          type: "function",
          packageName: "dialog",
        },
      ],
      packageName: "dialog",
      code: "@mixin rmd-dialog-container { … }",
      sourceCode:
        "@mixin rmd-dialog-container {\n  @include rmd-utils-full-screen;\n  @include rmd-dialog-theme(z-index);\n\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  margin: rmd-dialog-theme-var(vertical-margin)\n    rmd-dialog-theme-var(horizontal-margin);\n  pointer-events: none;\n}\n",
      type: "mixin",
    },
    "rmd-dialog-overlay": {
      name: "rmd-dialog-overlay",
      description:
        "Creates the styles for the dialog's overlay. This really requires the base styles and component from the overlay package and adds a few changes to help with nested dialogs.\n",
      source: "packages/dialog/src/_mixins.scss#L212-L216",
      usedBy: [
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      requires: [
        { name: "rmd-dialog-theme", type: "mixin", packageName: "dialog" },
      ],
      packageName: "dialog",
      code: "@mixin rmd-dialog-overlay { … }",
      sourceCode:
        "@mixin rmd-dialog-overlay {\n  // update the z-index to be the same as the dialog so that the last defined\n  // dialog with overlay with cover all the others.\n  @include rmd-dialog-theme(z-index);\n}\n",
      type: "mixin",
    },
    "react-md-dialog": {
      name: "react-md-dialog",
      description: "Creates all the styles for the dialog package.\n",
      source: "packages/dialog/src/_mixins.scss#L219-L249",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        { name: "rmd-dialog-container", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-overlay", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-header", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-content", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-footer", type: "mixin", packageName: "dialog" },
        { name: "rmd-dialog-title", type: "mixin", packageName: "dialog" },
        {
          name: "rmd-dialog-theme-values",
          type: "variable",
          packageName: "dialog",
        },
      ],
      packageName: "dialog",
      code: "@mixin react-md-dialog { … }",
      sourceCode:
        "@mixin react-md-dialog {\n  @include rmd-theme-create-root-theme($rmd-dialog-theme-values, dialog);\n\n  .rmd-dialog-container {\n    @include rmd-dialog-container;\n  }\n\n  .rmd-dialog-overlay {\n    @include rmd-dialog-overlay;\n  }\n\n  .rmd-dialog {\n    @include rmd-dialog;\n\n    &__header {\n      @include rmd-dialog-header;\n    }\n\n    &__content {\n      @include rmd-dialog-content;\n    }\n\n    &__footer {\n      @include rmd-dialog-footer;\n    }\n\n    &__title {\n      @include rmd-dialog-title;\n    }\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-dialog-elevation": {
      name: "rmd-dialog-elevation",
      description:
        "The elevation (box-shadow) to use for the dialog when it is not full page.\nThis should be a number between 0 and 24 since it gets passed to the `rmd-elevation` mixin.",
      source: "packages/dialog/src/_variables.scss#L13",
      usedBy: [{ name: "rmd-dialog", type: "mixin", packageName: "dialog" }],
      packageName: "dialog",
      type: "Number",
      value: "16",
      overridable: true,
    },
    "rmd-dialog-z-index": {
      name: "rmd-dialog-z-index",
      description:
        "The z-index for dialogs. This value is a bit larger than overlays just in case other components are using the overlay as well. The dialog's overlay will also gain this z-index value.",
      source: "packages/dialog/src/_variables.scss#L21",
      usedBy: [
        {
          name: "rmd-layout-navigation-z-index",
          type: "variable",
          packageName: "layout",
        },
      ],
      requires: [
        {
          name: "rmd-utils-temporary-element-z-index",
          type: "variable",
          packageName: "utils",
        },
      ],
      packageName: "dialog",
      type: "Number",
      value: "$rmd-utils-temporary-element-z-index",
      compiled: "30",
      overridable: true,
    },
    "rmd-dialog-vertical-margin": {
      name: "rmd-dialog-vertical-margin",
      description:
        "The amount of vertical viewport spacing there should be between the edge of the screen and a non-full page dialog. This value should be big enough so that users can still touch the overlay when a dialog is visible.\n",
      source: "packages/dialog/src/_variables.scss#L27",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-horizontal-margin": {
      name: "rmd-dialog-horizontal-margin",
      description:
        "The amount of horizontal viewport spacing there should be between the edge of the screen and a non-full page dialog. This value should be big enough so that users can still touch the overlay when a dialog is visible.\n",
      source: "packages/dialog/src/_variables.scss#L33",
      packageName: "dialog",
      type: "Number",
      value: "2.5rem",
      overridable: true,
    },
    "rmd-dialog-header-padding": {
      name: "rmd-dialog-header-padding",
      description:
        "The amount of padding to apply to the `DialogHeader` component.\n",
      source: "packages/dialog/src/_variables.scss#L37",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-header-padding-bottom": {
      name: "rmd-dialog-header-padding-bottom",
      description:
        "The amount of padding-bottom to apply to the `DialogHeader` component. This is a bit smaller than the `$rmd-dialog-header-padding` value since it is usually used alongside the `DialogContent` component which has its own padding attached.\n",
      source: "packages/dialog/src/_variables.scss#L44",
      packageName: "dialog",
      type: "Number",
      value: "1.25rem",
      overridable: true,
    },
    "rmd-dialog-content-padding": {
      name: "rmd-dialog-content-padding",
      description:
        "The amount of padding to apply to the `DialogContent` component.\n",
      source: "packages/dialog/src/_variables.scss#L48",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-footer-padding": {
      name: "rmd-dialog-footer-padding",
      description:
        "The amount of padding to apply to the `DialogFooter` component.\n",
      source: "packages/dialog/src/_variables.scss#L52",
      packageName: "dialog",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-dialog-transition-distance": {
      name: "rmd-dialog-transition-distance",
      description:
        'The distance that the dialog should travel while animating in and out of view. By default, this animation will cause the dialog to "fly" upwards. If you change this value to be a negative number, it will "fly" downwards.\n',
      source: "packages/dialog/src/_variables.scss#L58",
      usedBy: [{ name: "rmd-dialog", type: "mixin", packageName: "dialog" }],
      packageName: "dialog",
      type: "Number",
      value: "1.875rem",
      overridable: true,
    },
    "rmd-dialog-enter-duration": {
      name: "rmd-dialog-enter-duration",
      description:
        "The enter animation duration. This should match the `timeout` prop for the `Dialog` component.\n",
      source: "packages/dialog/src/_variables.scss#L63",
      usedBy: [{ name: "rmd-dialog", type: "mixin", packageName: "dialog" }],
      packageName: "dialog",
      type: "Number",
      value: "0.2s",
      overridable: true,
    },
    "rmd-dialog-leave-duration": {
      name: "rmd-dialog-leave-duration",
      description:
        "The leave animation duration. This should match the `timeout` prop for the `Dialog` component.\n",
      source: "packages/dialog/src/_variables.scss#L68",
      usedBy: [{ name: "rmd-dialog", type: "mixin", packageName: "dialog" }],
      packageName: "dialog",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-dialog-min-width": {
      name: "rmd-dialog-min-width",
      description:
        "The min width for a centered dialog. This is really just applied so you don't have super tiny dialogs if there isn't enough content in the dialog.\n",
      source: "packages/dialog/src/_variables.scss#L73",
      packageName: "dialog",
      type: "Number",
      value: "17.5rem",
      overridable: true,
    },
    "rmd-dialog-theme-values": {
      name: "rmd-dialog-theme-values",
      description:
        'A Map of all the "themeable" parts of the dialog package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/dialog/src/_variables.scss#L79-L88",
      usedBy: [
        { name: "rmd-dialog-theme", type: "function", packageName: "dialog" },
        {
          name: "rmd-dialog-theme-var",
          type: "function",
          packageName: "dialog",
        },
        { name: "rmd-dialog-theme", type: "mixin", packageName: "dialog" },
        {
          name: "rmd-dialog-theme-update-var",
          type: "mixin",
          packageName: "dialog",
        },
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      packageName: "dialog",
      type: "Map",
      value:
        "(\n  horizontal-margin: $rmd-dialog-horizontal-margin,\n  vertical-margin: $rmd-dialog-vertical-margin,\n  min-width: $rmd-dialog-min-width,\n  header-padding: $rmd-dialog-header-padding,\n  header-padding-bottom: $rmd-dialog-header-padding-bottom,\n  content-padding: $rmd-dialog-content-padding,\n  footer-padding: $rmd-dialog-footer-padding,\n  z-index: $rmd-dialog-z-index,\n)",
      compiled:
        "(\n  horizontal-margin: 2.5rem,\n  vertical-margin: 1.5rem,\n  min-width: 17.5rem,\n  header-padding: 1.5rem,\n  header-padding-bottom: 1.25rem,\n  content-padding: 1.5rem,\n  footer-padding: 0.5rem,\n  z-index: 30,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
