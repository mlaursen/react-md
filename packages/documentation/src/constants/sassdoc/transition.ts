/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-transition-theme": {
      name: "rmd-transition-theme",
      description:
        "This function is used to quickly get one of the transition's theme values. This is really\njust for the `rmd-transition-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/transition/src/_functions.scss#L14-L16",
      packageName: "transition",
      code: "@function rmd-transition-theme($style) { … }",
      sourceCode:
        "@function rmd-transition-theme($style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-transition-theme-values,\n    transition\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "One of the `$rmd-transition-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the transition's theme values.",
      },
    },
    "rmd-transition-theme-var": {
      name: "rmd-transition-theme-var",
      description:
        "This function is used to get one of the transition's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-transition-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/transition/src/_functions.scss#L29-L31",
      packageName: "transition",
      code:
        "@function rmd-transition-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-transition-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-transition-theme-values,\n    transition,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-transition-theme-values` map keys to set a value for.",
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
        description: "one of the transition's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-transition-theme": {
      name: "rmd-transition-theme",
      description:
        "Creates the styles for one of the transition's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      source: "packages/transition/src/_mixins.scss#L17-L24",
      usedBy: [
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
      ],
      packageName: "transition",
      code:
        "@mixin rmd-transition-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-transition-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-transition-theme-values,\n    transition\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-transition-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-transition-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-transition-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-transition-set-theme-var": {
      name: "rmd-transition-set-theme-var",
      description:
        "Updates one of the transition's theme variables with the new value for the section\nof your app.\n\n",
      source: "packages/transition/src/_mixins.scss#L32-L34",
      packageName: "transition",
      code: "@mixin rmd-transition-set-theme-var($theme-style, $-) { … }",
      sourceCode:
        "@mixin rmd-transition-set-theme-var($theme-style, $-) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-transition-theme-values,\n    transition\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The transition theme style type to update. This should be one\n  of the `$rmd-transition-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "-",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-transition-shadow-transition": {
      name: "rmd-transition-shadow-transition",
      description:
        "A mixin that allows you to animate box shadow performantly.\n\n",
      source: "packages/transition/src/_mixins.scss#L98-L131",
      usedBy: [
        {
          name: "rmd-elevation-transition",
          type: "mixin",
          packageName: "elevation",
        },
      ],
      packageName: "transition",
      examples: [
        {
          code:
            '@import "@react-md/theme/dist/scss/color-palette";\n\n.my-class {\n  $start-shadow: inset 0 0 1px $rmd-blue-500;\n  $end-shadow: inset 0 0 4px $rmd-blue-500;\n\n  @include rmd-transition-shadow-transition(\n    $start-shadow,\n    $end-shadow,\n    ("&:focus" "&:hover")\n  );\n}\n',
          compiled:
            '.my-class {\n  box-shadow: inset 0 0 1px #2196f3;\n  position: relative;\n}\n.my-class::before {\n  transition-timing-function: var(\n    --rmd-transition-standard,\n    cubic-bezier(0.4, 0, 0.2, 1)\n  );\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n  z-index: 0;\n  box-shadow: inset 0 0 4px #2196f3;\n  opacity: 0;\n  transition: opacity 0.15s;\n}\n.my-class:focus::before,\n.my-class:hover::before {\n  opacity: 1;\n}\n',
          type: "scss",
          description: "Simple Usage",
        },
        {
          code:
            '@import "@react-md/elevation/dist/scss/functions";\n@import "@react-md/theme/dist/scss/color-palette";\n\n.my-class {\n  $start-shadow: rmd-elevation(2);\n  $end-shadow: rmd-elevation(4), inset 0 0 4px $rmd-blue-500;\n\n  @include rmd-transition-shadow-transition(\n    $start-shadow,\n    $end-shadow,\n    "&:focus"\n  );\n}\n',
          compiled:
            '.my-class {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  position: relative;\n}\n.my-class::before {\n  transition-timing-function: var(\n    --rmd-transition-standard,\n    cubic-bezier(0.4, 0, 0.2, 1)\n  );\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n  z-index: 0;\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),\n    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12),\n    inset 0 0 4px #2196f3;\n  opacity: 0;\n  transition: opacity 0.15s;\n}\n.my-class:focus::before {\n  opacity: 1;\n}\n',
          type: "scss",
          description: "Merging with elevation",
        },
      ],
      code:
        "@mixin rmd-transition-shadow-transition($start-shadow, $end-shadow, $active-selectors, $before: true, $duration: $rmd-transition-standard-time, $pseudo-z-index: 0) { … }",
      sourceCode:
        '@mixin rmd-transition-shadow-transition(\n  $start-shadow,\n  $end-shadow,\n  $active-selectors,\n  $before: true,\n  $duration: $rmd-transition-standard-time,\n  $pseudo-z-index: 0\n) {\n  @include rmd-transition-parent-shadow($start-shadow);\n\n  $shadow-target: if($before, "&::before", "&::after");\n\n  #{$shadow-target} {\n    @include rmd-transition-pseudo-shadow(\n      $end-shadow,\n      $duration,\n      $pseudo-z-index\n    );\n  }\n\n  // remove the leading \'&\'\n  $suffix: str-slice($shadow-target, 2);\n  $active-string: "";\n  @if type-of($active-selectors) == string {\n    $active-string: $active-selectors + $suffix;\n  } @else if type-of($active-selectors) == list {\n    @for $i from 1 to length($active-selectors) + 1 {\n      $selector: nth($active-selectors, $i);\n\n      $prefix: $active-string + if($i > 1, ", ", "");\n      $active-string: $prefix + $selector + $suffix;\n    }\n  }\n\n  #{$active-string} {\n    opacity: 1;\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "start-shadow",
          description: "The starting box-shadow to use.",
        },
        {
          type: "String",
          name: "end-shadow",
          description: "The ending box-shadow to use.",
        },
        {
          type: "List|String",
          name: "active-selectors",
          description:
            "Either a single string or a list of strings that is used\n  to determine when the `$end-shadow` should be used.",
        },
        {
          type: "Boolean",
          name: "before",
          default: "true",
          description:
            "Boolean if the `::before` or `::after` pseudo selector should be\n  used as the `end-shadow` target.",
        },
        {
          type: "String|Number",
          name: "duration",
          default: "rmd-transition-standard-time",
          description: "The animation duration",
        },
        {
          type: "Number",
          name: "pseudo-z-index",
          default: "0",
          description:
            "The z-index to apply. This is set to 0 by default so that\nit can be shown more easily if there are child elements with position absolute",
        },
      ],
    },
    "rmd-transition": {
      name: "rmd-transition",
      description:
        "Adds a transition timing function for the provided transition type.\n\n",
      source: "packages/transition/src/_mixins.scss#L139-L144",
      usedBy: [
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "rmd-label", type: "mixin", packageName: "form" },
        { name: "rmd-overlay", type: "mixin", packageName: "overlay" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        {
          name: "rmd-states-surface-base",
          type: "mixin",
          packageName: "states",
        },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-collapse", type: "mixin", packageName: "transition" },
        { name: "rmd-collapse", type: "mixin", packageName: "transition" },
        { name: "rmd-cross-fade", type: "mixin", packageName: "transition" },
      ],
      packageName: "transition",
      code: "@mixin rmd-transition($type, $animation) { … }",
      sourceCode:
        "@mixin rmd-transition($type, $animation) {\n  @include rmd-transition-theme(\n    if($animation, animation-timing-function, transition-timing-function),\n    $type\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "type",
          description:
            "The transition type that should be used. This should be one of the\n  keys for `$rmd-transitions`",
        },
        {
          type: "Boolean",
          name: "animation",
          description:
            "Boolean if this should be applied to the animation timing\n  function instead of the transition timing function.",
        },
      ],
    },
    "rmd-collapse": {
      name: "rmd-collapse",
      description:
        "Creates the styles for the Collapse component within react-md\n",
      source: "packages/transition/src/_mixins.scss#L147-L164",
      usedBy: [
        {
          name: "react-md-transition",
          type: "mixin",
          packageName: "transition",
        },
      ],
      packageName: "transition",
      code: "@mixin rmd-collapse { … }",
      sourceCode:
        "@mixin rmd-collapse {\n  .rmd-collapse {\n    transition-property: max-height, padding-bottom, padding-top;\n    will-change: max-height, padding-bottom, padding-top;\n\n    &--no-overflow {\n      overflow: hidden;\n    }\n\n    &--enter {\n      @include rmd-transition($rmd-collapse-enter-transition-func);\n    }\n\n    &--leave {\n      @include rmd-transition($rmd-collapse-leave-transition-func);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-cross-fade": {
      name: "rmd-cross-fade",
      description:
        "Creates the cross fade animation styles. This animation is usually used\nwhen loading in new parts of a page or page transitions as there is no\nexit animation by default.\n",
      source: "packages/transition/src/_mixins.scss#L169-L183",
      usedBy: [
        {
          name: "react-md-transition",
          type: "mixin",
          packageName: "transition",
        },
      ],
      packageName: "transition",
      code: "@mixin rmd-cross-fade { … }",
      sourceCode:
        "@mixin rmd-cross-fade {\n  .rmd-cross-fade {\n    opacity: 0;\n    transform: translateY($rmd-cross-fade-translate-distance);\n\n    &--active {\n      @include rmd-transition(deceleration);\n\n      opacity: 1;\n      transform: translateY(0);\n      transition-duration: $rmd-cross-fade-transition-duration;\n      transition-property: opacity, transform;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "react-md-transition": {
      name: "react-md-transition",
      description:
        "Creates the transition theme css variables as well as the styles\nfor components in the transition package.\n",
      source: "packages/transition/src/_mixins.scss#L250-L256",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "transition",
      code: "@mixin react-md-transition { … }",
      sourceCode:
        "@mixin react-md-transition {\n  @include rmd-theme-create-root-theme(\n    $rmd-transition-theme-values,\n    transition\n  );\n\n  @include rmd-collapse;\n  @include rmd-cross-fade;\n  @include rmd-transition-classes;\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-transition-sharp": {
      name: "rmd-transition-sharp",
      description:
        'The transition timing to use for "sharp" transitions. Not really sure what a "sharp" transition\nis at the time of writing this though.\n',
      source: "packages/transition/src/_variables.scss#L8",
      packageName: "transition",
      type: "String",
      value: "cubic-bezier(0.4, 0, 0.6, 1)",
      overridable: true,
    },
    "rmd-transition-standard": {
      name: "rmd-transition-standard",
      description:
        "The transition timing function to use for standard/normal transitions. This is normally applied\nto moving elements within the page.\n",
      source: "packages/transition/src/_variables.scss#L13",
      packageName: "transition",
      type: "String",
      value: "cubic-bezier(0.4, 0, 0.2, 1)",
      overridable: true,
    },
    "rmd-transition-acceleration": {
      name: "rmd-transition-acceleration",
      description:
        "The transition timing function to use for transitions that should start the animation slowly\nand build up momentum at the end of the transition. This is normally used for exit/leave\ntransitions.\n",
      source: "packages/transition/src/_variables.scss#L19",
      packageName: "transition",
      type: "String",
      value: "cubic-bezier(0.4, 0, 1, 1)",
      overridable: true,
    },
    "rmd-transition-deceleration": {
      name: "rmd-transition-deceleration",
      description:
        "The transition timing function to use for transitions that should start the animation quickly\nand slow down momentum at the end of the transition. This is normally used for enter/appear\ntransitions.\n",
      source: "packages/transition/src/_variables.scss#L25",
      packageName: "transition",
      type: "String",
      value: "cubic-bezier(0, 0, 0.2, 1)",
      overridable: true,
    },
    "rmd-transition-enter-time": {
      name: "rmd-transition-enter-time",
      description: "The default enter transition time.\n",
      source: "packages/transition/src/_variables.scss#L29",
      packageName: "transition",
      type: "Number",
      value: "0.2s",
      overridable: true,
    },
    "rmd-transition-leave-time": {
      name: "rmd-transition-leave-time",
      description: "The default leave transition time.\n",
      source: "packages/transition/src/_variables.scss#L33",
      packageName: "transition",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-transition-standard-time": {
      name: "rmd-transition-standard-time",
      description:
        "The default transition time for a linear animation/transition.\n",
      source: "packages/transition/src/_variables.scss#L37",
      usedBy: [
        { name: "rmd-label", type: "mixin", packageName: "form" },
        {
          name: "rmd-states-surface-base",
          type: "mixin",
          packageName: "states",
        },
      ],
      packageName: "transition",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-collapse-enter-transition-func": {
      name: "rmd-collapse-enter-transition-func",
      description:
        "The transition easing function to apply when the collapse's content is animating\nin. This should be one of the `$rmd-transitions` keys.\n\n",
      source: "packages/transition/src/_variables.scss#L43",
      usedBy: [
        { name: "rmd-collapse", type: "mixin", packageName: "transition" },
      ],
      packageName: "transition",
      type: "String",
      value: "deceleration",
      overridable: true,
    },
    "rmd-collapse-leave-transition-func": {
      name: "rmd-collapse-leave-transition-func",
      description:
        "The transition easing function to apply when the collapse's content is animating\nout. This should be one of the `$rmd-transitions` keys.\n\n",
      source: "packages/transition/src/_variables.scss#L49",
      usedBy: [
        { name: "rmd-collapse", type: "mixin", packageName: "transition" },
      ],
      packageName: "transition",
      type: "String",
      value: "acceleration",
      overridable: true,
    },
    "rmd-cross-fade-translate-distance": {
      name: "rmd-cross-fade-translate-distance",
      description:
        "The distance that the cross fade animation should move. This will\nbe applied to `translateY`.\n",
      source: "packages/transition/src/_variables.scss#L54",
      usedBy: [
        { name: "rmd-cross-fade", type: "mixin", packageName: "transition" },
      ],
      packageName: "transition",
      type: "Number",
      value: "-1rem",
      overridable: true,
    },
    "rmd-cross-fade-transition-duration": {
      name: "rmd-cross-fade-transition-duration",
      description: "The transition duration for the cross fade animation.\n",
      source: "packages/transition/src/_variables.scss#L58",
      usedBy: [
        { name: "rmd-cross-fade", type: "mixin", packageName: "transition" },
      ],
      packageName: "transition",
      type: "Number",
      value: "0.3s",
      overridable: true,
    },
    "rmd-transition-scale-enter-duration": {
      name: "rmd-transition-scale-enter-duration",
      description: "The transition enter duration for the scaling animation.\n",
      source: "packages/transition/src/_variables.scss#L62",
      packageName: "transition",
      type: "Number",
      value: "$rmd-transition-enter-time",
      compiled: "0.2s",
      overridable: true,
    },
    "rmd-transition-scale-leave-duration": {
      name: "rmd-transition-scale-leave-duration",
      description: "The transition leave duration for the scaling animation.\n",
      source: "packages/transition/src/_variables.scss#L66",
      packageName: "transition",
      type: "Number",
      value: "$rmd-transition-leave-time",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-transition-scale-y-enter-duration": {
      name: "rmd-transition-scale-y-enter-duration",
      description:
        "The transition enter duration for the vertical scale animation.\n",
      source: "packages/transition/src/_variables.scss#L70",
      packageName: "transition",
      type: "Number",
      value: "$rmd-transition-enter-time",
      compiled: "0.2s",
      overridable: true,
    },
    "rmd-transition-scale-y-leave-duration": {
      name: "rmd-transition-scale-y-leave-duration",
      description:
        "The transition leave duration for the vertical scale animation.\n",
      source: "packages/transition/src/_variables.scss#L74",
      packageName: "transition",
      type: "Number",
      value: "$rmd-transition-leave-time",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-transition-theme-values": {
      name: "rmd-transition-theme-values",
      description:
        'A Map of all the "themeable" parts of the transition package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/transition/src/_variables.scss#L80-L85",
      usedBy: [
        {
          name: "rmd-transition-theme",
          type: "function",
          packageName: "transition",
        },
        {
          name: "rmd-transition-theme-var",
          type: "function",
          packageName: "transition",
        },
        {
          name: "rmd-transition-theme",
          type: "mixin",
          packageName: "transition",
        },
        {
          name: "rmd-transition-set-theme-var",
          type: "mixin",
          packageName: "transition",
        },
        {
          name: "react-md-transition",
          type: "mixin",
          packageName: "transition",
        },
      ],
      packageName: "transition",
      type: "Map",
      value:
        "(\n  sharp: $rmd-transition-sharp,\n  standard: $rmd-transition-standard,\n  acceleration: $rmd-transition-acceleration,\n  deceleration: $rmd-transition-deceleration,\n)",
      compiled:
        "(\n  sharp: cubic-bezier(0.4, 0, 0.6, 1),\n  standard: cubic-bezier(0.4, 0, 0.2, 1),\n  acceleration: cubic-bezier(0.4, 0, 1, 1),\n  deceleration: cubic-bezier(0, 0, 0.2, 1),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
