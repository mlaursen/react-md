/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-tabs-theme": {
      name: "rmd-tabs-theme",
      description:
        "This function is used to quickly get one of the tabs's theme values. This is really just for the `rmd-tabs-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/tabs/src/_functions.scss#L15-L17",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-tabs-theme-values",
          type: "variable",
          packageName: "tabs",
        },
      ],
      packageName: "tabs",
      code: "@function rmd-tabs-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tabs-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tabs-theme-values, tabs);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tabs-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the tabs's theme values.",
      },
    },
    "rmd-tabs-theme-var": {
      name: "rmd-tabs-theme-var",
      description:
        "This function is used to get one of the tabs's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-tabs-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/tabs/src/_functions.scss#L32-L34",
      usedBy: [{ name: "rmd-tab", type: "mixin", packageName: "tabs" }],
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-tabs-theme-values",
          type: "variable",
          packageName: "tabs",
        },
      ],
      packageName: "tabs",
      code: "@function rmd-tabs-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-tabs-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-tabs-theme-values,\n    tabs,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tabs-theme-values` map keys to set a value for.",
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
        description: "one of the tabs's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-tabs-theme": {
      name: "rmd-tabs-theme",
      description:
        "Creates the styles for one of the tabs's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/tabs/src/_mixins.scss#L26-L28",
      usedBy: [
        { name: "rmd-tabs", type: "mixin", packageName: "tabs" },
        { name: "rmd-tab", type: "mixin", packageName: "tabs" },
      ],
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-tabs-theme-values",
          type: "variable",
          packageName: "tabs",
        },
      ],
      packageName: "tabs",
      code:
        "@mixin rmd-tabs-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-tabs-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-tabs-theme-values,\n    tabs\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-tabs-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-tabs-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-tabs-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-tabs-theme-update-var": {
      name: "rmd-tabs-theme-update-var",
      description:
        "Updates one of the tabs's theme variables with the new value for the section of your app.",
      source: "packages/tabs/src/_mixins.scss#L36-L38",
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
          name: "rmd-tabs-theme-values",
          type: "variable",
          packageName: "tabs",
        },
      ],
      packageName: "tabs",
      code: "@mixin rmd-tabs-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-tabs-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-tabs-theme-values,\n    tabs\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The tabs theme style type to update. This should be one of the `$rmd-tabs-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-tabs": {
      name: "rmd-tabs",
      description: "",
      source: "packages/tabs/src/_mixins.scss#L41-L86",
      usedBy: [{ name: "react-md-tabs", type: "mixin", packageName: "tabs" }],
      requires: [
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-utils-scroll", type: "mixin", packageName: "utils" },
        {
          name: "rmd-utils-hide-scrollbar",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-tabs-theme", type: "mixin", packageName: "tabs" },
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
        {
          name: "rmd-tab-active-indicator-height",
          type: "variable",
          packageName: "tabs",
        },
        { name: "rmd-tab-min-width", type: "variable", packageName: "tabs" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
        { name: "rmd-tabs-positions", type: "variable", packageName: "tabs" },
        {
          name: "rmd-tabs-scrollable-padding",
          type: "variable",
          packageName: "tabs",
        },
      ],
      packageName: "tabs",
      code: "@mixin rmd-tabs { … }",
      sourceCode:
        '@mixin rmd-tabs {\n  // I can use the -webkit-scrolbar and scrollbar-width stuff due to my limited\n  // browser support. Yay!  The scrollbars will be hidden, but still scrollable.\n  // For non-MacOS users, you can still get the normal scroll behavior by\n  // holding shift+scroll or use keyboard movement.\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-utils-scroll(x);\n  @include rmd-utils-hide-scrollbar;\n\n  display: flex;\n  flex-wrap: nowrap;\n  position: relative;\n  width: 100%;\n\n  &::after {\n    @include rmd-transition(deceleration);\n    @include rmd-tabs-theme(background-color, indicator-color);\n\n    bottom: 0;\n    content: "";\n    height: $rmd-tab-active-indicator-height;\n    left: 0;\n    max-width: var(--rmd-tab-width, $rmd-tab-min-width);\n    pointer-events: none;\n    position: absolute;\n    transform: translateX(var(--rmd-tab-offset, 0));\n    width: 100%;\n    z-index: 1;\n  }\n\n  &--animate::after {\n    transition: transform $rmd-transition-standard-time,\n      max-width $rmd-transition-standard-time;\n  }\n\n  @each $position in $rmd-tabs-positions {\n    &--#{$position} {\n      $justify: if(\n        $position == center,\n        $position,\n        if($position == left, flex-start, flex-end)\n      );\n\n      justify-content: $justify;\n    }\n  }\n\n  &--padded {\n    @include rmd-utils-rtl-auto(padding-left, $rmd-tabs-scrollable-padding);\n  }\n}\n',
      type: "mixin",
    },
    "rmd-tab": {
      name: "rmd-tab",
      description: "",
      source: "packages/tabs/src/_mixins.scss#L89-L127",
      usedBy: [{ name: "react-md-tabs", type: "mixin", packageName: "tabs" }],
      requires: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        {
          name: "rmd-typography-text-overflow-ellipsis",
          type: "mixin",
          packageName: "typography",
        },
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-tabs-theme", type: "mixin", packageName: "tabs" },
        {
          name: "rmd-icon-theme-update-var",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-tabs-theme-var", type: "function", packageName: "tabs" },
        { name: "rmd-tab-height", type: "variable", packageName: "tabs" },
        { name: "rmd-tab-max-width", type: "variable", packageName: "tabs" },
        { name: "rmd-tab-min-width", type: "variable", packageName: "tabs" },
        {
          name: "rmd-tab-horizontal-padding",
          type: "variable",
          packageName: "tabs",
        },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
        {
          name: "rmd-tab-stacked-height",
          type: "variable",
          packageName: "tabs",
        },
        {
          name: "rmd-tab-vertical-padding",
          type: "variable",
          packageName: "tabs",
        },
      ],
      packageName: "tabs",
      code: "@mixin rmd-tab { … }",
      sourceCode:
        "@mixin rmd-tab {\n  @include rmd-states-surface;\n  @include rmd-transition(standard);\n  @include rmd-typography(button, (line-height));\n  @include rmd-typography-text-overflow-ellipsis;\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-tabs-theme(color, inactive);\n\n  align-items: center;\n  background-color: transparent;\n  border-width: 0;\n  display: inline-flex;\n  flex-grow: 1;\n  flex-shrink: 0;\n  height: $rmd-tab-height;\n  justify-content: center;\n  max-width: $rmd-tab-max-width;\n  min-width: $rmd-tab-min-width;\n  padding: 0 $rmd-tab-horizontal-padding;\n  position: relative;\n  transition: color $rmd-transition-standard-time;\n\n  &--stacked {\n    flex-direction: column;\n    height: $rmd-tab-stacked-height;\n    padding-bottom: $rmd-tab-vertical-padding;\n    padding-top: $rmd-tab-vertical-padding;\n  }\n\n  &--active {\n    @include rmd-tabs-theme(color, active);\n    @include rmd-icon-theme-update-var(color, rmd-tabs-theme-var(active));\n  }\n\n  &--disabled {\n    @include rmd-tabs-theme(color, disabled);\n    @include rmd-icon-theme-update-var(color, rmd-tabs-theme-var(disabled));\n  }\n}\n",
      type: "mixin",
    },
    "rmd-tab-panels": {
      name: "rmd-tab-panels",
      description: "",
      source: "packages/tabs/src/_mixins.scss#L130-L213",
      usedBy: [{ name: "react-md-tabs", type: "mixin", packageName: "tabs" }],
      requires: [
        { name: "rmd-utils-scroll", type: "mixin", packageName: "utils" },
      ],
      packageName: "tabs",
      code: "@mixin rmd-tab-panels { … }",
      sourceCode:
        "@mixin rmd-tab-panels {\n  @include rmd-utils-scroll(y);\n\n  align-items: flex-start;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  height: 100%;\n  overflow-x: hidden;\n\n  // sass-lint:disable no-duplicate-properties\n  &--slide-left {\n    // the animations here confused me a lot, so hopefully this will clear up\n    // how this works along with some flows...\n    //\n    // The tab panels will animate the first and second child by changing the X\n    // position in `translate3d`. The first panel will always be the current\n    // panel that matches the `activeIndex` while the second panel will not\n    // exist or the previous panel that matched based on `activeIndex`.\n    //\n    // So some flows:\n    // - Start with a single active panel with activeIndex 0\n    //   - [Panel0]\n    // - Switch to panel with activeIndex 1\n    //   - [Panel1, Panel0]\n    // - Finsh animation and remove previous panel\n    //   - [Panel1]\n    // - Switch to panel with activeIndex 0 again\n    //   - [Panel0, Panel1]\n    // - Finsh animation and remove previous panel\n    //   - [Panel0]\n    //\n    // So what's so confusing about this? Well, when adding a new slide, you'll\n    // need to slide the panels to the left. However... the next panel is\n    // actually the **first** panel within the panel list instead of the second.\n    // This means that we need to swap the positions with css for the current\n    // active panel and the previous active panel so we get:\n    //\n    // - [Panel1, Panel0] - Actual\n    // - [Panel0, Panel1] - Wanted\n    //\n    // This can be accomplished by moving the current active panel (Panel1) out\n    // of view by using 100% of the tab panel's container width which now is in\n    // the same location as the previous active panel (Panel0). Both panels are\n    // now out of view, so we'll want to move the previous active panel back to\n    // within view by moving it 100% of the tab panel's container width but in\n    // the opposite direction.\n    //\n    // Ok, we now have [Panel0, Panel1] displayed. Now we need to animate them\n    // both to the left. This can be done by just removing the custom 100%\n    // transform we added to the current active panel (Panel1) and moving the\n    // previous active panel (Panel0) another 100%.\n    //\n    // Whew. Done!\n    //\n    // Sliding right is super easy since the panels are in the desired order\n    // already in the dom. All that's required is moving them negative 100% of\n    // the tab panel's container width so the new current panel slides into view\n    // while the previous panel slides out of view.\n    //\n    // Sliding left when there's no conditional rendering is super easy as well\n    // as it's just the reverse of sliding right now since the panels are always\n    // in order.\n\n    #{--p1-start}: 100%;\n    #{--p2-start}: -100%;\n    #{--p1-end}: 0;\n    #{--p2-end}: -200%;\n  }\n\n  &--slide-left-persistent {\n    #{--p1-start}: 0;\n    #{--p2-start}: 0;\n    #{--p1-end}: -100%;\n    #{--p2-end}: -100%;\n  }\n\n  &--slide-right {\n    #{--p1-start}: -100%;\n    #{--p2-start}: -100%;\n    #{--p1-end}: 0;\n    #{--p2-end}: 0;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-tab-panel": {
      name: "rmd-tab-panel",
      description: "",
      source: "packages/tabs/src/_mixins.scss#L216-L243",
      usedBy: [{ name: "react-md-tabs", type: "mixin", packageName: "tabs" }],
      requires: [
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "tabs",
      code: "@mixin rmd-tab-panel { … }",
      sourceCode:
        "@mixin rmd-tab-panel {\n  flex-shrink: 0;\n  height: 100%;\n  width: 100%;\n  will-change: transform;\n\n  &--animate {\n    @include rmd-transition(standard);\n\n    transition: transform $rmd-transition-standard-time;\n  }\n\n  &--enter {\n    transform: translate3d(var(--p1-start), 0, 0);\n  }\n\n  &--enter-active {\n    transform: translate3d(var(--p1-end), 0, 0);\n  }\n\n  &--exit {\n    transform: translate3d(var(--p2-start), 0, 0);\n  }\n\n  &--exit-active {\n    transform: translate3d(var(--p2-end), 0, 0);\n  }\n}\n",
      type: "mixin",
    },
    "react-md-tabs": {
      name: "react-md-tabs",
      description:
        "Creates all the styles for this package as well as defining all the theme CSS variables.\n",
      source: "packages/tabs/src/_mixins.scss#L247-L265",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        { name: "rmd-tabs", type: "mixin", packageName: "tabs" },
        { name: "rmd-tab", type: "mixin", packageName: "tabs" },
        { name: "rmd-tab-panels", type: "mixin", packageName: "tabs" },
        { name: "rmd-tab-panel", type: "mixin", packageName: "tabs" },
        {
          name: "rmd-tabs-theme-values",
          type: "variable",
          packageName: "tabs",
        },
      ],
      packageName: "tabs",
      code: "@mixin react-md-tabs { … }",
      sourceCode:
        "@mixin react-md-tabs {\n  @include rmd-theme-create-root-theme($rmd-tabs-theme-values, tabs);\n\n  .rmd-tabs {\n    @include rmd-tabs;\n  }\n\n  .rmd-tab {\n    @include rmd-tab;\n  }\n\n  .rmd-tab-panels {\n    @include rmd-tab-panels;\n  }\n\n  .rmd-tab-panel {\n    @include rmd-tab-panel;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-tab-height": {
      name: "rmd-tab-height",
      description: "The default height for a tab.\n",
      source: "packages/tabs/src/_variables.scss#L10",
      usedBy: [{ name: "rmd-tab", type: "mixin", packageName: "tabs" }],
      packageName: "tabs",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-tab-stacked-height": {
      name: "rmd-tab-stacked-height",
      description:
        "The default height for a tab that has stacked text with an icon.\n",
      source: "packages/tabs/src/_variables.scss#L14",
      usedBy: [{ name: "rmd-tab", type: "mixin", packageName: "tabs" }],
      packageName: "tabs",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-tab-horizontal-padding": {
      name: "rmd-tab-horizontal-padding",
      description:
        "The amount of padding to apply to the left and right of the tab's content\n",
      source: "packages/tabs/src/_variables.scss#L18",
      usedBy: [{ name: "rmd-tab", type: "mixin", packageName: "tabs" }],
      packageName: "tabs",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-tab-vertical-padding": {
      name: "rmd-tab-vertical-padding",
      description:
        "The amount of padding to apply to the top and bottom of the tab's content\n",
      source: "packages/tabs/src/_variables.scss#L22",
      usedBy: [{ name: "rmd-tab", type: "mixin", packageName: "tabs" }],
      packageName: "tabs",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-tab-min-width": {
      name: "rmd-tab-min-width",
      description:
        "The minimum width for a tab. The way tabs work is that they will grow as needed to fill the entire space of the `Tabs` container width. This also means that they will shrink if the `Tabs` container is small.\n",
      source: "packages/tabs/src/_variables.scss#L28",
      usedBy: [
        { name: "rmd-tabs", type: "mixin", packageName: "tabs" },
        { name: "rmd-tab", type: "mixin", packageName: "tabs" },
      ],
      packageName: "tabs",
      type: "Number",
      value: "5.625rem",
      overridable: true,
    },
    "rmd-tab-max-width": {
      name: "rmd-tab-max-width",
      description:
        "The maxium width for a tab. The way tabs work is that they will grow as needed to fill the entire space of the `Tabs` container width. This also means that they will shrink if the `Tabs` container is small.\n",
      source: "packages/tabs/src/_variables.scss#L34",
      usedBy: [{ name: "rmd-tab", type: "mixin", packageName: "tabs" }],
      packageName: "tabs",
      type: "Number",
      value: "20rem",
      overridable: true,
    },
    "rmd-tab-indicator-color": {
      name: "rmd-tab-indicator-color",
      description: "The tab indicator color to use.",
      source: "packages/tabs/src/_variables.scss#L40",
      requires: [
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
      ],
      packageName: "tabs",
      type: "Color|String",
      value: "rmd-theme-var(primary)",
      compiled: "var(--rmd-theme-primary, #9c27b0)",
      overridable: true,
    },
    "rmd-tab-active-color": {
      name: "rmd-tab-active-color",
      description: "The color to use when a tab has become active.",
      source: "packages/tabs/src/_variables.scss#L46",
      requires: [{ name: "rmd-theme", type: "function", packageName: "theme" }],
      packageName: "tabs",
      type: "Color|String",
      value: "rmd-theme(text-primary-on-background)",
      compiled: "#212121",
      overridable: true,
    },
    "rmd-tab-inactive-color": {
      name: "rmd-tab-inactive-color",
      description: "The color to use when a tab is inactive.",
      source: "packages/tabs/src/_variables.scss#L52",
      requires: [{ name: "rmd-theme", type: "function", packageName: "theme" }],
      packageName: "tabs",
      type: "Color|String",
      value: "rmd-theme(text-secondary-on-background)",
      compiled: "#757575",
      overridable: true,
    },
    "rmd-tab-disabled-color": {
      name: "rmd-tab-disabled-color",
      description: "The color to use when a tab is disabled.",
      source: "packages/tabs/src/_variables.scss#L58",
      requires: [{ name: "rmd-theme", type: "function", packageName: "theme" }],
      packageName: "tabs",
      type: "Color|String",
      value: "rmd-theme(text-disabled-on-background)",
      compiled: "#9e9e9e",
      overridable: true,
    },
    "rmd-tab-active-indicator-height": {
      name: "rmd-tab-active-indicator-height",
      description: "The height for the active tab indicator divider.\n",
      source: "packages/tabs/src/_variables.scss#L62",
      usedBy: [{ name: "rmd-tabs", type: "mixin", packageName: "tabs" }],
      packageName: "tabs",
      type: "Number",
      value: "0.125rem",
      overridable: true,
    },
    "rmd-tabs-positions": {
      name: "rmd-tabs-positions",
      description:
        "A list of alignments that should be supported by the Tabs component. These values should be valid values for the `justify-content` property.\n",
      source: "packages/tabs/src/_variables.scss#L67",
      usedBy: [{ name: "rmd-tabs", type: "mixin", packageName: "tabs" }],
      packageName: "tabs",
      type: "List",
      value: "(left center right)",
      overridable: true,
    },
    "rmd-tabs-scrollable-padding": {
      name: "rmd-tabs-scrollable-padding",
      description:
        "The amount of padding to use when the `scollable` prop is enabled on the `Tabs` component that will be added to the left of the first tab (or right for RTL languages). This padding is useful to help users know that the content is scrollable.\n",
      source: "packages/tabs/src/_variables.scss#L73",
      usedBy: [{ name: "rmd-tabs", type: "mixin", packageName: "tabs" }],
      packageName: "tabs",
      type: "Number",
      value: "3.25rem",
      overridable: true,
    },
    "rmd-tabs-theme-values": {
      name: "rmd-tabs-theme-values",
      description: "A map of all the themeable parts of the tabs package.\n",
      source: "packages/tabs/src/_variables.scss#L77-L82",
      usedBy: [
        { name: "rmd-tabs-theme", type: "function", packageName: "tabs" },
        { name: "rmd-tabs-theme-var", type: "function", packageName: "tabs" },
        { name: "rmd-tabs-theme", type: "mixin", packageName: "tabs" },
        {
          name: "rmd-tabs-theme-update-var",
          type: "mixin",
          packageName: "tabs",
        },
        { name: "react-md-tabs", type: "mixin", packageName: "tabs" },
      ],
      packageName: "tabs",
      type: "Map",
      value:
        "(\n  active: $rmd-tab-active-color,\n  inactive: $rmd-tab-inactive-color,\n  disabled: $rmd-tab-disabled-color,\n  indicator-color: $rmd-tab-indicator-color,\n)",
      compiled:
        "(\n  active: #212121,\n  inactive: #757575,\n  disabled: #9e9e9e,\n  indicator-color: var(--rmd-theme-primary, #9c27b0),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
