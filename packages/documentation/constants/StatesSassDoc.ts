/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const StatesSassDoc: PackageSassDoc = {
  name: "states",
  variables: [
    {
      name: "rmd-states-use-ripple",
      type: "Boolean",
      description:
        "Boolean if the pressed and keyboard focus interaction states should use\nthe ripple effect. If this is set to false, a different background color\nwill be applied for each interaction state instead.\n\nNote: You will still need to update the `InteractionStatesContext` to\ndisable the ripple effects in javascript.\n\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-states-use-pressed-states-fallback",
      type: "Boolean",
      description:
        "Boolean if the pressed states fallback should also be included. You'd normally\nwant to disable this if only using the ripple effects, but there isn't too\nmuch code to it so you'd only save a few bytes by disabling it.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-states-light-theme-background-color",
      type: "Color",
      description:
        "The base background color to use for the different interaction states for\na light themed application. This is the color that gets different opacities\napplied to it.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "$rmd-black-base",
      compiledValue: "#000",
      configurable: true,
    },
    {
      name: "rmd-states-dark-theme-background-color",
      type: "Color",
      description:
        "The base background color to use for the different interaction states for\na dark themed application. This is the color that gets different opacities\napplied to it. This is currently the same color as the light themed version,\nbut it's available for reconfiguration if it's desired.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "$rmd-black-base",
      compiledValue: "#000",
      configurable: true,
    },
    {
      name: "rmd-states-light-theme-hover-color",
      type: "Color",
      description: "The hover color to use for light themed backgrounds.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba($rmd-states-light-theme-background-color, 0.08)",
      compiledValue: "rgba(0, 0, 0, 0.08)",
      configurable: true,
    },
    {
      name: "rmd-states-light-theme-focus-color",
      type: "Color",
      description:
        "The keyboard focus color to use for light themed backgrounds.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba($rmd-states-light-theme-background-color, 0.24)",
      compiledValue: "rgba(0, 0, 0, 0.24)",
      configurable: true,
    },
    {
      name: "rmd-states-light-theme-pressed-color",
      type: "Color",
      description: "The pressed color to use for light themed backgrounds.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba(\n  $rmd-states-light-theme-background-color,\n  0.32\n)",
      compiledValue: "rgba(0, 0, 0, 0.32)",
      configurable: true,
    },
    {
      name: "rmd-states-light-theme-selected-color",
      type: "Color",
      description: "The selected color to use for light themed backgrounds.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba(\n  $rmd-states-light-theme-background-color,\n  0.16\n)",
      compiledValue: "rgba(0, 0, 0, 0.16)",
      configurable: true,
    },
    {
      name: "rmd-states-dark-theme-hover-color",
      type: "Color",
      description: "The hover color to use for dark themed backgrounds.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba($rmd-states-dark-theme-background-color, 0.04)",
      compiledValue: "rgba(0, 0, 0, 0.04)",
      configurable: true,
    },
    {
      name: "rmd-states-dark-theme-focus-color",
      type: "Color",
      description:
        "The keyboard focus color to use for dark themed backgrounds.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba($rmd-states-dark-theme-background-color, 0.12)",
      compiledValue: "rgba(0, 0, 0, 0.12)",
      configurable: true,
    },
    {
      name: "rmd-states-dark-theme-pressed-color",
      type: "Color",
      description: "The pressed color to use for dark themed backgrounds.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba($rmd-states-dark-theme-background-color, 0.16)",
      compiledValue: "rgba(0, 0, 0, 0.16)",
      configurable: true,
    },
    {
      name: "rmd-states-dark-theme-selected-color",
      type: "Color",
      description: "The selected color to use for dark themed backgrounds.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba($rmd-states-dark-theme-background-color, 0.12)",
      compiledValue: "rgba(0, 0, 0, 0.12)",
      configurable: true,
    },
    {
      name: "rmd-states-light-theme-ripple-background-color",
      type: "Color",
      description:
        "The base background color to use for the ripple effect in a light themed\napplication.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba($rmd-black-base, 0.08)",
      compiledValue: "rgba(0, 0, 0, 0.08)",
      configurable: true,
    },
    {
      name: "rmd-states-dark-theme-ripple-background-color",
      type: "Color",
      description:
        "The base background color to use for the ripple effect in a dark themed\napplication.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "rgba($rmd-black-base, 0.08)",
      compiledValue: "rgba(0, 0, 0, 0.08)",
      configurable: true,
    },
    {
      name: "rmd-states-background-color",
      type: "Color",
      description:
        "The background color to use for the different states. The default behavior\nis to use a base color and apply different opacities depending on the interaction\nwith the element.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-background-color,\n  $rmd-states-dark-theme-background-color\n)",
      compiledValue: "#000",
      configurable: true,
    },
    {
      name: "rmd-states-hover-color",
      type: "Color",
      description:
        "The default hover color to use. This will be determined based on the current theme type\nof light or dark.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-hover-color,\n  $rmd-states-dark-theme-hover-color\n)",
      compiledValue: "rgba(0, 0, 0, 0.08)",
      configurable: true,
    },
    {
      name: "rmd-states-focus-color",
      type: "Color",
      description:
        "The default focus color to use. This will be determined based on the current theme type\nof light or dark.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-focus-color,\n  $rmd-states-dark-theme-focus-color\n)",
      compiledValue: "rgba(0, 0, 0, 0.24)",
      configurable: true,
    },
    {
      name: "rmd-states-pressed-color",
      type: "Color",
      description:
        "The default pressed color to use. This will be determined based on the current theme type\nof light or dark.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-pressed-color,\n  $rmd-states-dark-theme-pressed-color\n)",
      compiledValue: "rgba(0, 0, 0, 0.32)",
      configurable: true,
    },
    {
      name: "rmd-states-selected-color",
      type: "Color",
      description:
        "The default selected color to use. This will be determined based on the current theme type\nof light or dark.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-selected-color,\n  $rmd-states-dark-theme-selected-color\n)",
      compiledValue: "rgba(0, 0, 0, 0.16)",
      configurable: true,
    },
    {
      name: "rmd-states-ripple-background-color",
      type: "Color",
      description: "The base background color for the ripple effect.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-ripple-background-color,\n  $rmd-states-dark-theme-ripple-background-color\n)",
      compiledValue: "rgba(0, 0, 0, 0.08)",
      configurable: true,
    },
    {
      name: "rmd-states-ripple-transform-duration",
      type: "Number",
      description:
        "The transition duration for the ripple transformation animation. This is the expanding circle\nanimation that overlaps a bit with the fade out animation.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "0.45s",
      compiledValue: "0.45s",
      configurable: true,
    },
    {
      name: "rmd-states-ripple-opacity-duration",
      type: "Number",
      description:
        "The transition duration for the ripple opacity animation. This will be triggered\nwhen the ripple starts its exit animation.\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "0.3s",
      compiledValue: "0.3s",
      configurable: true,
    },
    {
      name: "rmd-states-pressed-class-name",
      type: "String",
      description:
        "The class name to use when using the pressed interaction fallback\n",
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value: "'.rmd-states--pressed'",
      compiledValue: ".rmd-states--pressed",
      configurable: true,
    },
    {
      name: "rmd-states-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the states package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/states/dist/_variables.scss",
      group: "states",
      see: [],
      links: [],
      value:
        "(\n  background-color: inherit,\n  hover-color: $rmd-states-hover-color,\n  focus-color: $rmd-states-focus-color,\n  pressed-color: $rmd-states-pressed-color,\n  selected-color: $rmd-states-selected-color,\n  ripple-background-color: $rmd-states-ripple-background-color,\n  light-hover-color: $rmd-states-light-theme-hover-color,\n  light-focus-color: $rmd-states-light-theme-focus-color,\n  light-pressed-color: $rmd-states-light-theme-pressed-color,\n  light-selected-color: $rmd-states-light-theme-selected-color,\n  light-ripple-background-color: $rmd-states-light-theme-ripple-background-color,\n  dark-hover-color: $rmd-states-dark-theme-hover-color,\n  dark-focus-color: $rmd-states-dark-theme-focus-color,\n  dark-pressed-color: $rmd-states-dark-theme-pressed-color,\n  dark-selected-color: $rmd-states-dark-theme-selected-color,\n  dark-ripple-background-color: $rmd-states-dark-theme-ripple-background-color,\n)",
      compiledValue:
        "(\n  background-color: inherit,\n  hover-color: rgba(0, 0, 0, 0.08),\n  focus-color: rgba(0, 0, 0, 0.24),\n  pressed-color: rgba(0, 0, 0, 0.32),\n  selected-color: rgba(0, 0, 0, 0.16),\n  ripple-background-color: rgba(0, 0, 0, 0.08),\n  light-hover-color: rgba(0, 0, 0, 0.08),\n  light-focus-color: rgba(0, 0, 0, 0.24),\n  light-pressed-color: rgba(0, 0, 0, 0.32),\n  light-selected-color: rgba(0, 0, 0, 0.16),\n  light-ripple-background-color: rgba(0, 0, 0, 0.08),\n  dark-hover-color: rgba(0, 0, 0, 0.04),\n  dark-focus-color: rgba(0, 0, 0, 0.12),\n  dark-pressed-color: rgba(0, 0, 0, 0.16),\n  dark-selected-color: rgba(0, 0, 0, 0.12),\n  dark-ripple-background-color: rgba(0, 0, 0, 0.08),\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-states-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the states's theme values. This is really\njust for the `rmd-states-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/states/dist/_functions.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@function rmd-states-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-states-theme-values, states);\n}",
      oneLineCode: "@function rmd-states-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-states-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the states's theme values.",
      },
    },
    {
      name: "rmd-states-theme-var",
      type: "function",
      description:
        "This function is used to get one of the states's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-states-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/states/dist/_functions.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@function rmd-states-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-states-theme-values, states, $fallback);\n}",
      oneLineCode:
        "@function rmd-states-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-states-theme-values` map keys to set a value for.",
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
        description: "one of the states's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-states-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the states's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-states-theme-values, states);\n}",
      oneLineCode:
        "@mixin rmd-states-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-states-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-states-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-states-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-states-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the states's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-states-theme-values, states);\n}",
      oneLineCode:
        "@mixin rmd-states-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The states theme style type to update. This should be one\n  of the `$rmd-states-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-states-psuedo-surface",
      type: "mixin",
      description:
        'This is a mixin that is used to be able to create a "surface" for a psuedo\nelement. It applies some base styling so that it will fill the entire\ncontainer element and not have pointer-events attached.\n',
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-psuedo-surface {\n  border-radius: inherit;\n  bottom: 0;\n  content: '';\n  left: 0;\n  pointer-events: none;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 0;\n}",
      oneLineCode: "@mixin rmd-states-psuedo-surface { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-states-surface-base",
      type: "mixin",
      description:
        'Generates all the base styles for an interaction "surface". This should\nnormally be applied to a `::before` or `::after` psuedo element.\n',
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-surface-base {\n  @include rmd-transition(standard);\n  @include rmd-states-psuedo-surface;\n  @include rmd-states-theme(background-color);\n\n  transition: background-color $rmd-transition-standard-time;\n}",
      oneLineCode: "@mixin rmd-states-surface-base { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-states-touch-only",
      type: "mixin",
      description:
        "This mixin allows you to add styles to an element only when the user is\ninteracting with your app on a touch device.\n",
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-touch-only {\n  .rmd-states--touch & {\n    @content;\n  }\n}",
      oneLineCode: "@mixin rmd-states-touch-only { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-states-keyboard-only",
      type: "mixin",
      description:
        "This mixin allows you to add styles to an element only when the user is\ninteracting with your app with a keyboard.\n",
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-keyboard-only {\n  .rmd-states--keyboard & {\n    @content;\n  }\n}",
      oneLineCode: "@mixin rmd-states-keyboard-only { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-states-mouse-only",
      type: "mixin",
      description:
        "This mixin allows you to add styles to an element only when the user is\ninteracting with your app with a mouse.\n",
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-mouse-only {\n  .rmd-states--mouse & {\n    @content;\n  }\n}",
      oneLineCode: "@mixin rmd-states-mouse-only { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-states-pressed-styles",
      type: "mixin",
      description:
        "A simple mixin that allows you to add custom pressed state styles to an\nelement.\n",
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-pressed-styles($pressed-class-name: $rmd-states-pressed-class-name) {\n  &#{$pressed-class-name} {\n    @content;\n  }\n}",
      oneLineCode:
        "@mixin rmd-states-pressed-styles($pressed-class-name: $rmd-states-pressed-class-name) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "pressed-class-name",
          default: "rmd-states-pressed-class-name",
          description:
            "The class name\nto use to indicate that the element is currently being pressed.",
        },
      ],
    },
    {
      name: "rmd-states-surface",
      type: "mixin",
      description:
        'This is the main interaction states creator. It will apply all the styles\nto an element so that it will:\n- gain the pointer cursor when it is not disabled (also works for aria-disabled)\n- create a `::before` element for transitioning between the different interaction\n  states\n- apply the hover opacity when not disabled **and for non-touch devices** (see more below)\n- apply the focused opacity after a **keyboard** focus event (see more below)\n- apply the pressed opacity if not using the ripple effect (see more below)\n\n### Hover Opacity\nThis requires the usage of a `COMPONENT_TO_MAKE` to work correctly. If `COMPONENT_TO_MAKE` is\nnot used in your application, the hover effect will be applied on mobile devices after touch\nevents. This is because a touch event still goes through the mouse events and applies the\nhover state after being touched.\n\n### Focused Opacity\nThis requires the usage of the `KeyboardTracker` component to work correctly. If the\n`KeyboardTracker` is not used in your application and not near the root of the React render\ntree, you most likely will not have any focus states. This is actually one of the "biggest"\nfeatures of react-md until the `:focus-visible` css selector has gained traction and browser\nsupport.\n\n### Pressed Opacity\nIf you are using the ripple effect for pressed states, this will be ignored as a ripple element\nwill be created instead to show the pressed state. When the ripple effect is disabled, pressing\nan element will just trigger a background opacity change like the over interaction states.\n',
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-surface {\n  @include rmd-utils-hide-focus-outline;\n\n  &::before {\n    @include rmd-states-surface-base;\n  }\n\n  &:disabled,\n  &[aria-disabled='true'] {\n    @include rmd-states-theme-update-var(hover-color, transparent);\n  }\n\n  &:not(:disabled):not([aria-disabled='true']):hover {\n    cursor: pointer;\n  }\n\n  &:hover {\n    @include rmd-states-theme-update-var(background-color, rmd-states-theme-var(hover-color));\n  }\n\n  @include rmd-states-keyboard-only {\n    &:focus {\n      @include rmd-states-theme-update-var(background-color, rmd-states-theme-var(focus-color));\n\n      &:hover {\n        @include rmd-states-theme-update-var(background-color, rmd-states-theme-var(hover-color));\n      }\n    }\n  }\n\n  @include rmd-states-touch-only {\n    &:focus,\n    &:hover {\n      @include rmd-states-theme-update-var(background-color, transparent);\n    }\n  }\n\n  @if $rmd-states-use-pressed-states-fallback {\n    @include rmd-states-pressed-styles {\n      @include rmd-states-theme-update-var(background-color, rmd-states-theme-var(pressed-color));\n      @include rmd-states-keyboard-only {\n        @include rmd-states-theme-update-var(background-color, rmd-states-theme-var(pressed-color));\n      }\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-states-surface { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-states-surface-selected",
      type: "mixin",
      description:
        "This is a mixin that should be used along with the `rmd-states-surface` mixin if you'd also\nlike to be able to add a selected state to an element. This really just adds another opacity\nbackground change when the element is considered selected. This is not apart of the main\nsurface mixin since selection states are a bit less used and it might be better to do different\nstyles than just a background change to show selection.\n",
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin rmd-states-surface-selected {\n  #{$selector} {\n    @include rmd-states-theme-update-var(background-color, rmd-states-theme-var(selected-color));\n  }\n}",
      oneLineCode: "@mixin rmd-states-surface-selected { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "react-md-states",
      type: "mixin",
      description:
        "Creates all the root styles for the states package as well as the themeable\ncss variables and their default values.\n",
      file: "@react-md/states/dist/_mixins.scss",
      group: "states",
      see: [],
      links: [],
      code:
        "@mixin react-md-states {\n  $ignored: background-color hover-color focus-color selected-color;\n  @include rmd-theme-create-root-theme($rmd-states-theme-values, states, $ignored);\n\n  @if $rmd-states-use-ripple {\n    .rmd-ripple-container {\n      @include rmd-states-ripple-container;\n    }\n\n    .rmd-ripple {\n      @include rmd-states-ripple;\n    }\n  }\n}",
      oneLineCode: "@mixin react-md-states { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default StatesSassDoc;
