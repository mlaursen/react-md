/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-states-theme": {
      name: "rmd-states-theme",
      description:
        "This function is used to quickly get one of the states's theme values. This is really just for the `rmd-states-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/states/src/_functions.scss#L15-L17",
      packageName: "states",
      code: "@function rmd-states-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-states-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-states-theme-values,\n    states\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-states-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the states's theme values.",
      },
    },
    "rmd-states-theme-var": {
      name: "rmd-states-theme-var",
      description:
        "This function is used to get one of the states's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-states-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/states/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        {
          name: "rmd-states-surface-selected",
          type: "mixin",
          packageName: "states",
        },
      ],
      packageName: "states",
      code:
        "@function rmd-states-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-states-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-states-theme-values,\n    states,\n    $fallback\n  );\n}\n",
      type: "function",
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
            "An optional fallback color to apply. This is set to `null` by default and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the states's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-states-theme": {
      name: "rmd-states-theme",
      description:
        "Creates the styles for one of the states's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/states/src/_mixins.scss#L24-L26",
      usedBy: [
        {
          name: "rmd-states-surface-base",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-states-focus-shadow",
          type: "mixin",
          packageName: "states",
        },
      ],
      packageName: "states",
      code:
        "@mixin rmd-states-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-states-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-states-theme-values,\n    states\n  );\n}\n",
      type: "mixin",
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
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-states-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-states-theme-update-var": {
      name: "rmd-states-theme-update-var",
      description:
        "Updates one of the states's theme variables with the new value for the section of your app.",
      source: "packages/states/src/_mixins.scss#L34-L36",
      usedBy: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        {
          name: "rmd-states-surface-selected",
          type: "mixin",
          packageName: "states",
        },
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-dark", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      code: "@mixin rmd-states-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-states-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-states-theme-values,\n    states\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The states theme style type to update. This should be one of the `$rmd-states-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-states-surface-base": {
      name: "rmd-states-surface-base",
      description:
        'Generates all the base styles for an interaction "surface". This should normally be applied to a `::before` or `::after` pseudo element.\n',
      source: "packages/states/src/_mixins.scss#L40-L46",
      usedBy: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      code: "@mixin rmd-states-surface-base { … }",
      sourceCode:
        "@mixin rmd-states-surface-base {\n  @include rmd-transition(standard);\n  @include rmd-utils-pseudo-element;\n  @include rmd-states-theme(background-color);\n\n  transition: background-color $rmd-transition-standard-time;\n}\n",
      type: "mixin",
    },
    "rmd-states-pressed-styles": {
      name: "rmd-states-pressed-styles",
      description:
        "A simple mixin that allows you to add custom pressed state styles to an element.\n",
      source: "packages/states/src/_mixins.scss#L52-L56",
      packageName: "states",
      code:
        "@mixin rmd-states-pressed-styles($pressed-class-name: $rmd-states-pressed-class-name) { … }",
      sourceCode:
        "@mixin rmd-states-pressed-styles(\n  $pressed-class-name: $rmd-states-pressed-class-name\n) {\n  &#{$pressed-class-name} {\n    @content;\n  }\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "pressed-class-name",
          default: "$rmd-states-pressed-class-name",
          description:
            "The class name to use to indicate that the element is currently being pressed.",
        },
      ],
    },
    "rmd-states-focus-shadow": {
      name: "rmd-states-focus-shadow",
      description:
        "This mixin will add the focus shadow color to your current element only during keyboard focus events. Your element must also have included the `rmd-states-surface-base` mixin for this to work.\n\nNote: If you used the `rmd-states-surface` mixin, this functionality will be included by default. In addition this only works for non-inline elements due to how positioning works for them. You'll either need to update it to be `display: inline-block` or fallbac to the `outline-style`s.",
      source: "packages/states/src/_mixins.scss#L100-L118",
      usedBy: [
        { name: "rmd-button-unstyled", type: "mixin", packageName: "button" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      examples: [
        {
          code:
            ".my-custom-component {\n  @include rmd-states-focus-shadow;\n\n  position: relative;\n\n  &::before {\n    @include rmd-states-surface-base;\n\n    // omit this margin if your component adds its own padding\n    // so that there is some space between the focus effect and\n    // content.\n    margin: -0.25rem;\n  }\n}\n",
          compiled:
            '.my-custom-component {\n  position: relative;\n}\n.rmd-utils--keyboard .my-custom-component:focus::before {\n  box-shadow: var(--rmd-states-focus-shadow, inset 0 0 0 0.125rem #2196f3);\n}\n.my-custom-component::before {\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n  z-index: 0;\n  background-color: var(--rmd-states-background-color, transparent);\n  transition: background-color 0.15s;\n  margin: -0.25rem;\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
        {
          code:
            ".my-custom-component {\n  @include rmd-states-focus-shadow($create-pseudo: true);\n\n  position: relative;\n}\n",
          compiled:
            '.my-custom-component {\n  position: relative;\n}\n.my-custom-component::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n  z-index: 0;\n}\n.rmd-utils--keyboard .my-custom-component:focus::before {\n  box-shadow: var(--rmd-states-focus-shadow, inset 0 0 0 0.125rem #2196f3);\n}\n',
          type: "scss",
          description: "Automatically Creating the pseudo Element",
        },
      ],
      code:
        "@mixin rmd-states-focus-shadow($focus-selector: '&:focus', $create-pseudo: false, $after: false) { … }",
      sourceCode:
        '@mixin rmd-states-focus-shadow(\n  $focus-selector: "&:focus",\n  $create-pseudo: false,\n  $after: false\n) {\n  $pseudo-selector: if($after, "&::after", "&::before");\n\n  @if $create-pseudo {\n    #{$pseudo-selector} {\n      @include rmd-utils-pseudo-element;\n    }\n  }\n\n  @if $rmd-states-use-focus-shadow {\n    @include rmd-utils-keyboard-only {\n      #{$focus-selector} {\n        #{$pseudo-selector} {\n          @include rmd-states-theme(box-shadow, focus-shadow);\n        }\n      }\n    }\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "focus-selector",
          default: "'&:focus'",
          description:
            "A selector to use for the focus effect. This should normally stay as the default value, but can be used if the focus state is only triggered by class name changes since the element isn't truely focusable.",
        },
        {
          type: "Boolean",
          name: "create-pseudo",
          default: "false",
          description:
            "Boolean if the pseudo element should also be created with only the `rmd-utils-psuedo-element` mixin. This is useful if you don't want the full states styles that come with the `rmd-states-surface-base` mixin.",
        },
        {
          type: "Boolean",
          name: "after",
          default: "false",
          description:
            "Boolean if the `::after` pseudo element should be used instead of the `::before`.",
        },
      ],
    },
    "rmd-states-surface": {
      name: "rmd-states-surface",
      description:
        'This is the main interaction states creator. It will apply all the styles to an element so that it will:\n- gain the pointer cursor when it is not disabled (also works for\n  aria-disabled)\n- create a `::before` element for transitioning between the different\n  interaction states\n- apply the hover opacity when not disabled **and for non-touch devices**\n  (see more below)\n- apply the focused opacity after a **keyboard** focus event (see more\n  below)\n- apply the pressed opacity if not using the ripple effect (see more below)\n\n### Hover Opacity\n\nThis requires the usage of a `COMPONENT_TO_MAKE` to work correctly. If `COMPONENT_TO_MAKE` is not used in your application, the hover effect will be applied on mobile devices after touch events. This is because a touch event still goes through the mouse events and applies the hover state after being touched.\n\n### Focused Opacity\n\nThis requires the usage of the `KeyboardTracker` component to work correctly. If the `KeyboardTracker` is not used in your application and not near the root of the React render tree, you most likely will not have any focus states. This is actually one of the "biggest" features of react-md until the `:focus-visible` css selector has gained traction and browser support.\n\n### Pressed Opacity\n\nIf you are using the ripple effect for pressed states, this will be ignored as a ripple element will be created instead to show the pressed state. When the ripple effect is disabled, pressing an element will just trigger a background opacity change like the over interaction states.',
      source: "packages/states/src/_mixins.scss#L164-L214",
      usedBy: [
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      packageName: "states",
      code:
        "@mixin rmd-states-surface($focus-selector: '&:focus', $clickable: true, $no-focus-state: false) { … }",
      sourceCode:
        '@mixin rmd-states-surface(\n  $focus-selector: "&:focus",\n  $clickable: true,\n  $no-focus-state: false\n) {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-states-focus-shadow($focus-selector);\n\n  &::before {\n    @include rmd-states-surface-base;\n  }\n\n  &:disabled,\n  &[aria-disabled="true"] {\n    @include rmd-states-theme-update-var(hover-color, transparent);\n  }\n\n  @if $clickable {\n    &:not(:disabled):not([aria-disabled="true"]):hover {\n      cursor: pointer;\n    }\n  }\n\n  &:hover {\n    @include rmd-states-theme-update-var(\n      background-color,\n      rmd-states-theme-var(hover-color)\n    );\n  }\n\n  @if $rmd-states-use-focus-background and not $no-focus-state {\n    @include rmd-utils-keyboard-only {\n      #{$focus-selector} {\n        @include rmd-states-theme-update-var(\n          background-color,\n          rmd-states-theme-var(focus-color)\n        );\n\n        &:hover {\n          @include rmd-states-theme-update-var(\n            background-color,\n            rmd-states-theme-var(hover-color)\n          );\n        }\n      }\n    }\n  }\n\n  @include rmd-utils-touch-only {\n    &:focus,\n    &:hover {\n      @include rmd-states-theme-update-var(background-color, transparent);\n    }\n  }\n\n  @if $rmd-states-use-pressed-states-fallback {\n    @include rmd-states-pressed-styles {\n      @include rmd-states-theme-update-var(\n        background-color,\n        rmd-states-theme-var(pressed-color)\n      );\n      @include rmd-utils-keyboard-only {\n        @include rmd-states-theme-update-var(\n          background-color,\n          rmd-states-theme-var(pressed-color)\n        );\n      }\n    }\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "focus-selector",
          default: "'&:focus'",
          description:
            "A selector to use for the focus effect. This should normally stay as the default value, but can be used if the focus state is only triggered by class name changes since the element isn't truely focusable.",
        },
        {
          type: "Boolean",
          name: "clickable",
          default: "true",
          description:
            "Boolean if the surface element should gain the pointer cursor when hovered.",
        },
        {
          type: "Boolean",
          name: "no-focus-state",
          default: "false",
          description:
            "Boolean if the keyboard focus background color change should be disabled.",
        },
      ],
    },
    "rmd-states-surface-selected": {
      name: "rmd-states-surface-selected",
      description:
        "This is a mixin that should be used along with the `rmd-states-surface` mixin if you'd also like to be able to add a selected state to an element.\nThis really just adds another opacity background change when the element is considered selected. This is not apart of the main surface mixin since selection states are a bit less used and it might be better to do different styles than just a background change to show selection.",
      source: "packages/states/src/_mixins.scss#L226-L243",
      usedBy: [
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        { name: "rmd-tree-item", type: "mixin", packageName: "tree" },
      ],
      packageName: "states",
      code:
        "@mixin rmd-states-surface-selected($selector: '&--selected') { … }",
      sourceCode:
        '@mixin rmd-states-surface-selected($selector: "&--selected") {\n  #{$selector} {\n    @include rmd-states-theme-update-var(\n      background-color,\n      rmd-states-theme-var(selected-color)\n    );\n\n    // since the base states disables the additional hover and focus states in touch mode,\n    // they have to be re-enabled for the selected state or else the background color won\'t\n    // appear until the user blurs the selected item.\n    @include rmd-utils-touch-only {\n      &:hover,\n      &:focus {\n        @include rmd-states-theme-update-var(\n          background-color,\n          rmd-states-theme-var(selected-color)\n        );\n      }\n    }\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "selector",
          default: "'&--selected'",
          description:
            "The selector to use when a surface is considered selected. The selected state will be applied when this class is active.",
        },
      ],
    },
    "react-md-states": {
      name: "react-md-states",
      description:
        "Creates all the root styles for the states package as well as the themeable css variables and their default values.\n",
      source: "packages/states/src/_mixins.scss#L282-L295",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "states",
      code: "@mixin react-md-states { … }",
      sourceCode:
        "@mixin react-md-states {\n  $ignored: background-color hover-color focus-color selected-color;\n  @include rmd-theme-create-root-theme(\n    $rmd-states-theme-values,\n    states,\n    $ignored\n  );\n\n  @if $rmd-states-use-ripple {\n    .rmd-ripple-container {\n      @include rmd-states-ripple-container;\n    }\n\n    .rmd-ripple {\n      @include rmd-states-ripple;\n    }\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-states-use-ripple": {
      name: "rmd-states-use-ripple",
      description:
        "Boolean if the pressed and keyboard focus interaction states should use the ripple effect. If this is set to false, a different background color will be applied for each interaction state instead.\n\nNote: You will still need to update the `InteractionStatesContext` to disable the ripple effects in javascript.",
      source: "packages/states/src/_variables.scss#L18",
      usedBy: [
        { name: "react-md-states", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-states-use-pressed-states-fallback": {
      name: "rmd-states-use-pressed-states-fallback",
      description:
        "Boolean if the pressed states fallback should also be included. You'd normally want to disable this if only using the ripple effects, but there isn't too much code to it so you'd only save a few bytes by disabling it.\n",
      source: "packages/states/src/_variables.scss#L24",
      usedBy: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-states-use-focus-shadow": {
      name: "rmd-states-use-focus-shadow",
      description:
        "Boolean if the focus state should still us a box-shadow outline for keyboard users.  This is generally recommended for accessibility since the default `outline-style` is removed, and just a `background-color` change normally isn't enough to help users determine the current focus of the page at a glance.",
      source: "packages/states/src/_variables.scss#L33",
      usedBy: [
        {
          name: "rmd-states-focus-shadow",
          type: "mixin",
          packageName: "states",
        },
      ],
      packageName: "states",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-states-use-focus-background": {
      name: "rmd-states-use-focus-background",
      description:
        "Boolean if the default focus state should change the background color to the focus color. This will apply to all components and styles within `react-md` and can be used as a feature toggle. If this is set to `false`,\neither the `$rmd-states-use-focus-shadow` should be enabled or another custom focus state should be implemented.",
      source: "packages/states/src/_variables.scss#L42",
      usedBy: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-states-light-theme-background-color": {
      name: "rmd-states-light-theme-background-color",
      description:
        "The base background color to use for the different interaction states for a light themed application. This is the color that gets different opacities applied to it.\n",
      source: "packages/states/src/_variables.scss#L48",
      packageName: "states",
      type: "Color",
      value: "$rmd-black-base",
      compiled: "#000",
      overridable: true,
    },
    "rmd-states-dark-theme-background-color": {
      name: "rmd-states-dark-theme-background-color",
      description:
        "The base background color to use for the different interaction states for a dark themed application. This is the color that gets different opacities applied to it. This is currently the same color as the light themed version,\nbut it's available for reconfiguration if it's desired.\n",
      source: "packages/states/src/_variables.scss#L55",
      packageName: "states",
      type: "Color",
      value: "$rmd-black-base",
      compiled: "#000",
      overridable: true,
    },
    "rmd-states-light-theme-hover-color": {
      name: "rmd-states-light-theme-hover-color",
      description: "The hover color to use for light themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L59",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-light-theme-background-color, 0.08)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-light-theme-focus-color": {
      name: "rmd-states-light-theme-focus-color",
      description:
        "The keyboard focus color to use for light themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L63",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-light-theme-background-color, 0.24)",
      compiled: "rgba(0, 0, 0, 0.24)",
      overridable: true,
    },
    "rmd-states-light-theme-pressed-color": {
      name: "rmd-states-light-theme-pressed-color",
      description: "The pressed color to use for light themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L67-L70",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba(\n  $rmd-states-light-theme-background-color,\n  0.32\n)",
      compiled: "rgba(0, 0, 0, 0.32)",
      overridable: true,
    },
    "rmd-states-light-theme-selected-color": {
      name: "rmd-states-light-theme-selected-color",
      description: "The selected color to use for light themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L74-L77",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba(\n  $rmd-states-light-theme-background-color,\n  0.16\n)",
      compiled: "rgba(0, 0, 0, 0.16)",
      overridable: true,
    },
    "rmd-states-dark-theme-hover-color": {
      name: "rmd-states-dark-theme-hover-color",
      description: "The hover color to use for dark themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L81",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-dark-theme-background-color, 0.04)",
      compiled: "rgba(0, 0, 0, 0.04)",
      overridable: true,
    },
    "rmd-states-dark-theme-focus-color": {
      name: "rmd-states-dark-theme-focus-color",
      description:
        "The keyboard focus color to use for dark themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L85",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-dark-theme-background-color, 0.12)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-states-dark-theme-pressed-color": {
      name: "rmd-states-dark-theme-pressed-color",
      description: "The pressed color to use for dark themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L89",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-dark-theme-background-color, 0.16)",
      compiled: "rgba(0, 0, 0, 0.16)",
      overridable: true,
    },
    "rmd-states-dark-theme-selected-color": {
      name: "rmd-states-dark-theme-selected-color",
      description: "The selected color to use for dark themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L93",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-dark-theme-background-color, 0.12)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-states-light-theme-ripple-background-color": {
      name: "rmd-states-light-theme-ripple-background-color",
      description:
        "The base background color to use for the ripple effect in a light themed application.\n",
      source: "packages/states/src/_variables.scss#L98",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-black-base, 0.08)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-dark-theme-ripple-background-color": {
      name: "rmd-states-dark-theme-ripple-background-color",
      description:
        "The base background color to use for the ripple effect in a dark themed application.\n",
      source: "packages/states/src/_variables.scss#L103",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-black-base, 0.08)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-background-color": {
      name: "rmd-states-background-color",
      description:
        "The background color to use for the different states. The default behavior is to use a base color and apply different opacities depending on the interaction with the element.\n",
      source: "packages/states/src/_variables.scss#L109-L113",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-background-color,\n  $rmd-states-dark-theme-background-color\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-states-hover-color": {
      name: "rmd-states-hover-color",
      description:
        "The default hover color to use. This will be determined based on the current theme type of light or dark.\n",
      source: "packages/states/src/_variables.scss#L118-L122",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-hover-color,\n  $rmd-states-dark-theme-hover-color\n)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-focus-color": {
      name: "rmd-states-focus-color",
      description:
        "The default focus color to use. This will be determined based on the current theme type of light or dark.\n",
      source: "packages/states/src/_variables.scss#L127-L131",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-focus-color,\n  $rmd-states-dark-theme-focus-color\n)",
      compiled: "rgba(0, 0, 0, 0.24)",
      overridable: true,
    },
    "rmd-states-pressed-color": {
      name: "rmd-states-pressed-color",
      description:
        "The default pressed color to use. This will be determined based on the current theme type of light or dark.\n",
      source: "packages/states/src/_variables.scss#L136-L140",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-pressed-color,\n  $rmd-states-dark-theme-pressed-color\n)",
      compiled: "rgba(0, 0, 0, 0.32)",
      overridable: true,
    },
    "rmd-states-selected-color": {
      name: "rmd-states-selected-color",
      description:
        "The default selected color to use. This will be determined based on the current theme type of light or dark.\n",
      source: "packages/states/src/_variables.scss#L145-L149",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-selected-color,\n  $rmd-states-dark-theme-selected-color\n)",
      compiled: "rgba(0, 0, 0, 0.16)",
      overridable: true,
    },
    "rmd-states-focus-shadow-width": {
      name: "rmd-states-focus-shadow-width",
      description:
        "The keyboard focus shadow width to use when the `$rmd-states-use-focus-shadow` variable is enabled.\n",
      source: "packages/states/src/_variables.scss#L154",
      packageName: "states",
      type: "Number",
      value: "0.125rem",
      overridable: true,
    },
    "rmd-states-focus-shadow-color": {
      name: "rmd-states-focus-shadow-color",
      description:
        "The keyboard focus shadow color to use when the `$rmd-states-use-focus-shadow` variable is enabled.\n",
      source: "packages/states/src/_variables.scss#L159",
      packageName: "states",
      type: "Color",
      value: "$rmd-blue-500",
      compiled: "#2196f3",
      overridable: true,
    },
    "rmd-states-focus-shadow": {
      name: "rmd-states-focus-shadow",
      description:
        "The box-shadow to use when the user keyboard-focuses an element and the `$rmd-states-use-focus-shadow` variable is enabled.\n",
      source: "packages/states/src/_variables.scss#L164",
      packageName: "states",
      type: "String",
      value:
        "inset 0 0 0 $rmd-states-focus-shadow-width $rmd-states-focus-shadow-color",
      compiled: "inset 0 0 0 0.125rem #2196f3",
      overridable: true,
    },
    "rmd-states-ripple-background-color": {
      name: "rmd-states-ripple-background-color",
      description: "The base background color for the ripple effect.\n",
      source: "packages/states/src/_variables.scss#L168-L172",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-ripple-background-color,\n  $rmd-states-dark-theme-ripple-background-color\n)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-ripple-transform-duration": {
      name: "rmd-states-ripple-transform-duration",
      description:
        "The transition duration for the ripple transformation animation. This is the expanding circle animation that overlaps a bit with the fade out animation.\n",
      source: "packages/states/src/_variables.scss#L177",
      packageName: "states",
      type: "Number",
      value: "0.45s",
      overridable: true,
    },
    "rmd-states-ripple-opacity-duration": {
      name: "rmd-states-ripple-opacity-duration",
      description:
        "The transition duration for the ripple opacity animation. This will be triggered when the ripple starts its exit animation.\n",
      source: "packages/states/src/_variables.scss#L182",
      packageName: "states",
      type: "Number",
      value: "0.3s",
      overridable: true,
    },
    "rmd-states-pressed-class-name": {
      name: "rmd-states-pressed-class-name",
      description:
        "The class name to use when using the pressed interaction fallback\n",
      source: "packages/states/src/_variables.scss#L186",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "states",
      type: "String",
      value: "'.rmd-states--pressed'",
      compiled: ".rmd-states--pressed",
      overridable: true,
    },
    "rmd-states-theme-values": {
      name: "rmd-states-theme-values",
      description:
        'A Map of all the "themeable" parts of the states package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/states/src/_variables.scss#L192-L210",
      usedBy: [
        { name: "rmd-states-theme", type: "function", packageName: "states" },
        {
          name: "rmd-states-theme-var",
          type: "function",
          packageName: "states",
        },
        { name: "rmd-states-theme", type: "mixin", packageName: "states" },
        {
          name: "rmd-states-theme-update-var",
          type: "mixin",
          packageName: "states",
        },
        { name: "react-md-states", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      type: "Map",
      value:
        "(\n  background-color: transparent,\n  hover-color: $rmd-states-hover-color,\n  focus-color: $rmd-states-focus-color,\n  focus-shadow: $rmd-states-focus-shadow,\n  pressed-color: $rmd-states-pressed-color,\n  selected-color: $rmd-states-selected-color,\n  ripple-background-color: $rmd-states-ripple-background-color,\n  light-hover-color: $rmd-states-light-theme-hover-color,\n  light-focus-color: $rmd-states-light-theme-focus-color,\n  light-pressed-color: $rmd-states-light-theme-pressed-color,\n  light-selected-color: $rmd-states-light-theme-selected-color,\n  light-ripple-background-color: $rmd-states-light-theme-ripple-background-color,\n  dark-hover-color: $rmd-states-dark-theme-hover-color,\n  dark-focus-color: $rmd-states-dark-theme-focus-color,\n  dark-pressed-color: $rmd-states-dark-theme-pressed-color,\n  dark-selected-color: $rmd-states-dark-theme-selected-color,\n  dark-ripple-background-color: $rmd-states-dark-theme-ripple-background-color,\n)",
      compiled:
        "(\n  background-color: transparent,\n  hover-color: rgba(0, 0, 0, 0.08),\n  focus-color: rgba(0, 0, 0, 0.24),\n  focus-shadow: inset 0 0 0 0.125rem #2196f3,\n  pressed-color: rgba(0, 0, 0, 0.32),\n  selected-color: rgba(0, 0, 0, 0.16),\n  ripple-background-color: rgba(0, 0, 0, 0.08),\n  light-hover-color: rgba(0, 0, 0, 0.08),\n  light-focus-color: rgba(0, 0, 0, 0.24),\n  light-pressed-color: rgba(0, 0, 0, 0.32),\n  light-selected-color: rgba(0, 0, 0, 0.16),\n  light-ripple-background-color: rgba(0, 0, 0, 0.08),\n  dark-hover-color: rgba(0, 0, 0, 0.04),\n  dark-focus-color: rgba(0, 0, 0, 0.12),\n  dark-pressed-color: rgba(0, 0, 0, 0.16),\n  dark-selected-color: rgba(0, 0, 0, 0.12),\n  dark-ripple-background-color: rgba(0, 0, 0, 0.08),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
