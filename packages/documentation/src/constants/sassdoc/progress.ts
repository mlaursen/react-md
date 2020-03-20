/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-progress-theme": {
      name: "rmd-progress-theme",
      description:
        "This function is used to quickly get one of the progress's theme values.\nThis is really just for the `rmd-progress-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/progress/src/_functions.scss#L16-L18",
      packageName: "progress",
      code: "@function rmd-progress-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-progress-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-progress-theme-values,\n    progress\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-progress-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the progress's theme values.",
      },
    },
    "rmd-progress-theme-var": {
      name: "rmd-progress-theme-var",
      description:
        "This function is used to get one of the progress's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-progress-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/progress/src/_functions.scss#L33-L35",
      packageName: "progress",
      code:
        "@function rmd-progress-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-progress-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-progress-theme-values,\n    progress,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-progress-theme-values` map keys to set a value for.",
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
        description: "one of the progress's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-progress-theme": {
      name: "rmd-progress-theme",
      description:
        "Creates the styles for one of the progress's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/progress/src/_mixins.scss#L22-L24",
      packageName: "progress",
      code:
        "@mixin rmd-progress-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-progress-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-progress-theme-values,\n    progress\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-progress-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-progress-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-progress-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-progress-theme-update-var": {
      name: "rmd-progress-theme-update-var",
      description:
        "Updates one of the progress's theme variables with the new value for the section of your app.",
      source: "packages/progress/src/_mixins.scss#L32-L34",
      usedBy: [
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
      ],
      packageName: "progress",
      code: "@mixin rmd-progress-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-progress-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-progress-theme-values,\n    progress\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The progress theme style type to update. This should be one of the `$rmd-progress-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "react-md-progress": {
      name: "react-md-progress",
      description: "Creates all the styles for the progress package.\n",
      source: "packages/progress/src/_mixins.scss#L284-L294",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "progress",
      code: "@mixin react-md-progress { … }",
      sourceCode:
        "@mixin react-md-progress {\n  @include rmd-theme-create-root-theme($rmd-progress-theme-values, progress);\n\n  @if $rmd-progress-include-linear {\n    @include rmd-linear-progress;\n  }\n\n  @if $rmd-progress-include-circular {\n    @include rmd-circular-progress;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-progress-include-linear": {
      name: "rmd-progress-include-linear",
      description:
        "Boolean if the linear progress bar styles should be created by default.\n",
      source: "packages/progress/src/_variables.scss#L10",
      usedBy: [
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-progress-include-circular": {
      name: "rmd-progress-include-circular",
      description:
        "Boolean if the circular progress bar styles should be created by default.\n",
      source: "packages/progress/src/_variables.scss#L14",
      usedBy: [
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-progress-color": {
      name: "rmd-progress-color",
      description:
        "This is the main color that should be used for the linear progress and the circular progress components.\n",
      source: "packages/progress/src/_variables.scss#L19",
      packageName: "progress",
      type: "Color",
      value: "$rmd-theme-primary",
      compiled: "#9c27b0",
      overridable: true,
    },
    "rmd-progress-background-color": {
      name: "rmd-progress-background-color",
      description:
        "This is the background color that is used fot the linear progress only.  You normally want this color to be a bit ligher than the main progress color since it'll be underneath the main progress.\n",
      source: "packages/progress/src/_variables.scss#L25-L30",
      packageName: "progress",
      type: "Color",
      value:
        "rmd-theme-get-swatch(\n  $rmd-theme-primary,\n  300,\n  false,\n  rgba($rmd-theme-primary, 0.4)\n)",
      compiled: "#ba68c8",
      overridable: true,
    },
    "rmd-linear-progress-size": {
      name: "rmd-linear-progress-size",
      description:
        "This is the linear progress bar's height or the width when switched to vertical.\n",
      source: "packages/progress/src/_variables.scss#L35",
      packageName: "progress",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-linear-progress-transition-duration": {
      name: "rmd-linear-progress-transition-duration",
      description:
        "The transition duration for the entire linear progress animation. This one is much longer compared to other transitions since progress indicators are normally for longer running background tasks.\n",
      source: "packages/progress/src/_variables.scss#L41",
      packageName: "progress",
      type: "Number",
      value: "2.4s",
      overridable: true,
    },
    "rmd-linear-progress-short-animation-delay": {
      name: "rmd-linear-progress-short-animation-delay",
      description:
        "The delay before the second linear progress animation should start. This animation is for the very quick and smaller bar animation that will appear after the first transition is near the end.\n",
      source: "packages/progress/src/_variables.scss#L47",
      packageName: "progress",
      type: "Number",
      value: "0.75s",
      overridable: true,
    },
    "rmd-linear-progress-styles": {
      name: "rmd-linear-progress-styles",
      description:
        "The linear progress bar styles to apply for the transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L53-L66",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: -35%,\n    right: 100%,\n  ),\n  60%: (\n    left: 100%,\n    right: -90%,\n  ),\n  100%: (\n    left: 100%,\n    right: -90%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-short-styles": {
      name: "rmd-linear-progress-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L72-L85",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: -200%,\n    right: 100%,\n  ),\n  40%: (\n    left: 107%,\n    right: -8%,\n  ),\n  100%: (\n    left: 107%,\n    right: -8%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-reverse-styles": {
      name: "rmd-linear-progress-reverse-styles",
      description:
        "The linear progress bar styles to apply for the transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L91-L104",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: 100%,\n    right: -35%,\n  ),\n  60%: (\n    left: -90%,\n    right: 100%,\n  ),\n  100%: (\n    left: -90%,\n    right: 100%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-reverse-short-styles": {
      name: "rmd-linear-progress-reverse-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L110-L123",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: 100%,\n    right: -200%,\n  ),\n  40%: (\n    left: -8%,\n    right: 107%,\n  ),\n  100%: (\n    left: -8%,\n    right: 107%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-styles": {
      name: "rmd-linear-progress-vertical-styles",
      description:
        "The linear progress bar styles to apply for the vertical transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L129-L142",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: -35%,\n    top: 100%,\n  ),\n  60%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n  100%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-short-styles": {
      name: "rmd-linear-progress-vertical-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter vertical transition.\nEach key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L148-L161",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: -200%,\n    top: 100%,\n  ),\n  40%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n  100%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-reverse-styles": {
      name: "rmd-linear-progress-vertical-reverse-styles",
      description:
        "The linear progress bar styles to apply for the vertical transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L167-L180",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: 100%,\n    top: -35%,\n  ),\n  60%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n  100%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-reverse-short-styles": {
      name: "rmd-linear-progress-vertical-reverse-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter vertical transition.\nEach key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L186-L199",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: 100%,\n    top: -200%,\n  ),\n  40%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n  100%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n)",
      overridable: true,
    },
    "rmd-circular-progress-size": {
      name: "rmd-circular-progress-size",
      description: "The size for the circular progress svg.\n",
      source: "packages/progress/src/_variables.scss#L203",
      packageName: "progress",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-circular-progress-stroke-width": {
      name: "rmd-circular-progress-stroke-width",
      description:
        "The stroke width for the circular svg. I wouldn't change this value unless you also update the `viewbox` for the `CircularProgress` component.\n",
      source: "packages/progress/src/_variables.scss#L208",
      packageName: "progress",
      type: "Number",
      value: "6",
      overridable: true,
    },
    "rmd-circular-progress-dasharray": {
      name: "rmd-circular-progress-dasharray",
      description:
        "The dasharray fro the circular svg. I don't really know how this works so good luck changing it to something else. If this value is changed, you'll aslo need to update the `dasharray` prop for the `CircularProgress` component.\n",
      source: "packages/progress/src/_variables.scss#L215",
      packageName: "progress",
      type: "Number",
      value: "187",
      overridable: true,
    },
    "rmd-circular-progress-transition-duration": {
      name: "rmd-circular-progress-transition-duration",
      description:
        "The entire transition duration for the circular progress. This is really the full time for the change in the `stroke-dashoffset` as the default rotation will rotate `720deg` over this time.\n",
      source: "packages/progress/src/_variables.scss#L221",
      packageName: "progress",
      type: "Number",
      value: "2.4s",
      overridable: true,
    },
    "rmd-circular-progress-start-offset": {
      name: "rmd-circular-progress-start-offset",
      description:
        "The starting dashoffset for the ciruclar progress animation. This will be used for the `0%` and `100%` values in the animation keyframes by default.\n",
      source: "packages/progress/src/_variables.scss#L226",
      packageName: "progress",
      type: "Number",
      value: "$rmd-circular-progress-dasharray",
      compiled: "187",
      overridable: true,
    },
    "rmd-circular-progress-end-offset": {
      name: "rmd-circular-progress-end-offset",
      description:
        "The ending dashoffset for the ciruclar progress animation. This will be used for the `50%` value in the animation keyframes by default.\n",
      source: "packages/progress/src/_variables.scss#L231",
      packageName: "progress",
      type: "Number",
      value: "$rmd-circular-progress-dasharray / 4",
      compiled: "46.75",
      overridable: true,
    },
    "rmd-circular-progress-rotate-styles": {
      name: "rmd-circular-progress-rotate-styles",
      description:
        "The circular progress styles to apply for the rotation transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L237-L250",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    transform: rotate(0deg),\n  ),\n  50%: (\n    transform: rotate(135deg),\n  ),\n  75%: (\n    transform: rotate(450deg),\n  ),\n  100%: (\n    transform: rotate(720deg),\n  ),\n)",
      overridable: true,
    },
    "rmd-circular-progress-dash-styles": {
      name: "rmd-circular-progress-dash-styles",
      description:
        "The circular progress styles to apply for the dashoffset transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L256-L266",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    stroke-dashoffset: $rmd-circular-progress-start-offset,\n  ),\n  50%: (\n    stroke-dashoffset: $rmd-circular-progress-end-offset,\n  ),\n  100%: (\n    stroke-dashoffset: $rmd-circular-progress-start-offset,\n  ),\n)",
      compiled:
        "(\n  0%: (\n    stroke-dashoffset: 187,\n  ),\n  50%: (\n    stroke-dashoffset: 46.75,\n  ),\n  100%: (\n    stroke-dashoffset: 187,\n  ),\n)",
      overridable: true,
    },
    "rmd-progress-theme-values": {
      name: "rmd-progress-theme-values",
      description:
        'A Map of all the "themeable" parts of the progress package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/progress/src/_variables.scss#L272-L278",
      usedBy: [
        {
          name: "rmd-progress-theme",
          type: "function",
          packageName: "progress",
        },
        {
          name: "rmd-progress-theme-var",
          type: "function",
          packageName: "progress",
        },
        { name: "rmd-progress-theme", type: "mixin", packageName: "progress" },
        {
          name: "rmd-progress-theme-update-var",
          type: "mixin",
          packageName: "progress",
        },
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  color: $rmd-progress-color,\n  background-color: $rmd-progress-background-color,\n  linear-size: $rmd-linear-progress-size,\n  circular-size: $rmd-circular-progress-size,\n  circular-width: $rmd-circular-progress-stroke-width,\n)",
      compiled:
        "(\n  color: #9c27b0,\n  background-color: #ba68c8,\n  linear-size: 0.25rem,\n  circular-size: 3rem,\n  circular-width: 6,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
