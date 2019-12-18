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
        "@function rmd-transition-theme($style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-transition-theme-values, transition);\n}",
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
        "@function rmd-transition-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-transition-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-transition-theme-values, transition, $fallback);\n}",
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
        "This function is used to quickly get one of the transition's theme values. This is really\njust for the `rmd-transition-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/transition/src/_functions.scss#L14-L16",
      packageName: "transition",
      code: "@function rmd-transition-theme($style) { … }",
      sourceCode:
        "@function rmd-transition-theme($style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-transition-theme-values, transition);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "One of the `$rmd-transition-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-transition-theme-var": {
      name: "rmd-transition-theme-var",
      description:
        "This function is used to get one of the transition's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-transition-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/transition/src/_functions.scss#L29-L31",
      packageName: "transition",
      code:
        "@function rmd-transition-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-transition-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-transition-theme-values, transition, $fallback);\n}",
      type: "mixin",
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
