/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const TransitionSassDoc: PackageSassDoc = {
  name: "transition",
  variables: [
    {
      name: "rmd-transition-sharp",
      type: "String",
      description:
        'The transition timing to use for "sharp" transitions. Not really sure what a "sharp" transition\nis at the time of writing this though.\n',
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "cubic-bezier(0.4, 0, 0.6, 1)",
      compiledValue: "cubic-bezier(0.4, 0, 0.6, 1)",
      configurable: true,
    },
    {
      name: "rmd-transition-standard",
      type: "String",
      description:
        "The transition timing function to use for standard/normal transitions. This is normally applied\nto moving elements within the page.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "cubic-bezier(0.4, 0, 0.2, 1)",
      compiledValue: "cubic-bezier(0.4, 0, 0.2, 1)",
      configurable: true,
    },
    {
      name: "rmd-transition-acceleration",
      type: "String",
      description:
        "The transition timing function to use for transitions that should start the animation slowly\nand build up momentum at the end of the transition. This is normally used for exit/leave\ntransitions.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "cubic-bezier(0.4, 0, 1, 1)",
      compiledValue: "cubic-bezier(0.4, 0, 1, 1)",
      configurable: true,
    },
    {
      name: "rmd-transition-deceleration",
      type: "String",
      description:
        "The transition timing function to use for transitions that should start the animation quickly\nand slow down momentum at the end of the transition. This is normally used for enter/appear\ntransitions.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "cubic-bezier(0, 0, 0.2, 1)",
      compiledValue: "cubic-bezier(0, 0, 0.2, 1)",
      configurable: true,
    },
    {
      name: "rmd-transition-enter-time",
      type: "Number",
      description: "The default enter transition time.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "0.2s",
      compiledValue: "0.2s",
      configurable: true,
    },
    {
      name: "rmd-transition-leave-time",
      type: "Number",
      description: "The default leave transition time.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-transition-standard-time",
      type: "Number",
      description:
        "The default transition time for a linear animation/transition.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-collapse-enter-transition-func",
      type: "String",
      description:
        "The transition easing function to apply when the collapse's content is animating\nin. This should be one of the `$rmd-transitions` keys.\n\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "deceleration",
      compiledValue: "deceleration",
      configurable: true,
    },
    {
      name: "rmd-collapse-leave-transition-func",
      type: "String",
      description:
        "The transition easing function to apply when the collapse's content is animating\nout. This should be one of the `$rmd-transitions` keys.\n\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "acceleration",
      compiledValue: "acceleration",
      configurable: true,
    },
    {
      name: "rmd-cross-fade-translate-distance",
      type: "Number",
      description:
        "The distance that the cross fade animation should move. This will\nbe applied to `translateY`.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "-1rem",
      compiledValue: "-1rem",
      configurable: true,
    },
    {
      name: "rmd-cross-fade-transition-duration",
      type: "Number",
      description: "The transition duration for the cross fade animation.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value: "0.3s",
      compiledValue: "0.3s",
      configurable: true,
    },
    {
      name: "rmd-transition-theme-values",
      type: "Map",
      description: "A Map of all the available transitions for react-md.\n",
      file: "@react-md/transition/dist/_variables.scss",
      group: "transition",
      see: [],
      links: [],
      value:
        "(\n  sharp: $rmd-transition-sharp,\n  standard: $rmd-transition-standard,\n  acceleration: $rmd-transition-acceleration,\n  deceleration: $rmd-transition-deceleration,\n)",
      compiledValue:
        "(\n  sharp: cubic-bezier(0.4, 0, 0.6, 1),\n  standard: cubic-bezier(0.4, 0, 0.2, 1),\n  acceleration: cubic-bezier(0.4, 0, 1, 1),\n  deceleration: cubic-bezier(0, 0, 0.2, 1),\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-transition-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the transition's theme values. This is really\njust for the `rmd-transition-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/transition/dist/_functions.scss",
      group: "transition",
      see: [],
      links: [],
      code:
        "@function rmd-transition-theme($style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-transition-theme-values, transition);\n}",
      oneLineCode: "@function rmd-transition-theme($style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "One of the `$rmd-transition-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the transition's theme values.",
      },
    },
    {
      name: "rmd-transition-theme-var",
      type: "function",
      description:
        "This function is used to get one of the transition's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-transition-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/transition/dist/_functions.scss",
      group: "transition",
      see: [],
      links: [],
      code:
        "@function rmd-transition-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-transition-theme-values, transition, $fallback);\n}",
      oneLineCode:
        "@function rmd-transition-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
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
  ],
  mixins: [
    {
      name: "rmd-transition-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the transition's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/transition/dist/_mixins.scss",
      group: "transition",
      see: [],
      links: [],
      code:
        "@mixin rmd-transition-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-transition-theme-values,\n    transition\n  );\n}",
      oneLineCode:
        "@mixin rmd-transition-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
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
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-transition-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-transition-set-theme-var",
      type: "mixin",
      description:
        "Updates one of the transition's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/transition/dist/_mixins.scss",
      group: "transition",
      see: [],
      links: [],
      code:
        "@mixin rmd-transition-set-theme-var($theme-style: , $-: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-transition-theme-values, transition);\n}",
      oneLineCode:
        "@mixin rmd-transition-set-theme-var($theme-style: , $-: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The transition theme style type to update. This should be one\n  of the `$rmd-transition-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "-",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-transition",
      type: "mixin",
      description:
        "Adds a transition timing function for the provided transition type.\n\n",
      file: "@react-md/transition/dist/_mixins.scss",
      group: "transition",
      see: [],
      links: [],
      code:
        "@mixin rmd-transition($type: , $animation: ) {\n  @include rmd-transition-theme(\n    if($animation, animation-timing-function, transition-timing-function),\n    $type\n  );\n}",
      oneLineCode: "@mixin rmd-transition($type: , $animation: ) { … }",
      throws: [],
      examples: [],
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
    {
      name: "rmd-collapse",
      type: "mixin",
      description:
        "Creates the styles for the Collapse component within react-md\n",
      file: "@react-md/transition/dist/_mixins.scss",
      group: "transition",
      see: [],
      links: [],
      code:
        "@mixin rmd-collapse {\n  .rmd-collapse {\n    transition-property: max-height, padding-bottom, padding-top;\n    will-change: max-height, padding-bottom, padding-top;\n\n    &--no-overflow {\n      overflow: hidden;\n    }\n\n    &--enter {\n      @include rmd-transition($rmd-collapse-enter-transition-func);\n    }\n\n    &--leave {\n      @include rmd-transition($rmd-collapse-leave-transition-func);\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-collapse { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-cross-fade",
      type: "mixin",
      description:
        "Creates the cross fade animation styles. This animation is usually used\nwhen loading in new parts of a page or page transitions as there is no\nexit animation by default.\n",
      file: "@react-md/transition/dist/_mixins.scss",
      group: "transition",
      see: [],
      links: [],
      code:
        "@mixin rmd-cross-fade {\n  .rmd-cross-fade {\n    opacity: 0;\n    transform: translateY($rmd-cross-fade-translate-distance);\n\n    &--active {\n      @include rmd-transition(deceleration);\n\n      opacity: 1;\n      transform: translateY(0);\n      transition-duration: $rmd-cross-fade-transition-duration;\n      transition-property: opacity, transform;\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-cross-fade { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "react-md-transition",
      type: "mixin",
      description:
        "Creates the transition theme css variables as well as the styles\nfor components in the transition package.\n",
      file: "@react-md/transition/dist/_mixins.scss",
      group: "transition",
      see: [],
      links: [],
      code:
        "@mixin react-md-transition {\n  @include rmd-theme-create-root-theme($rmd-transition-theme-values, transition);\n\n  @include rmd-collapse;\n  @include rmd-cross-fade;\n}",
      oneLineCode: "@mixin react-md-transition { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default TransitionSassDoc;
