/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-elevation": {
      name: "rmd-elevation",
      description:
        "Returns a box shadow string for the current material design elevation. This is useful if you want to merge material design elevation with custom box shadow values as well.",
      source: "packages/elevation/src/_functions.scss#L29-L50",
      usedBy: [
        { name: "rmd-elevation", type: "mixin", packageName: "elevation" },
        {
          name: "rmd-elevation-transition",
          type: "mixin",
          packageName: "elevation",
        },
      ],
      requires: [
        {
          name: "rmd-elevation-shadow-1-map",
          type: "variable",
          packageName: "elevation",
        },
        {
          name: "rmd-elevation-shadow-1-opacity",
          type: "variable",
          packageName: "elevation",
        },
        {
          name: "rmd-elevation-shadow-2-map",
          type: "variable",
          packageName: "elevation",
        },
        {
          name: "rmd-elevation-shadow-2-opacity",
          type: "variable",
          packageName: "elevation",
        },
        {
          name: "rmd-elevation-shadow-3-map",
          type: "variable",
          packageName: "elevation",
        },
        {
          name: "rmd-elevation-shadow-3-opacity",
          type: "variable",
          packageName: "elevation",
        },
        { name: "rmd-theme", type: "function", packageName: "theme" },
      ],
      packageName: "elevation",
      examples: [
        {
          code: ".my-class {\n  box-shadow: rmd-elevation(2);\n}\n",
          compiled:
            ".my-class {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n",
          type: "scss",
          description: "Simple usage",
        },
        {
          code:
            ".my-class {\n  box-shadow: rmd-elevation(2), inset 0 0 0 1px $rmd-blue-500;\n}\n",
          compiled:
            ".my-class {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12),\n    inset 0 0 0 1px #2196f3;\n}\n",
          type: "scss",
          description: "Merging Shadows",
        },
      ],
      code:
        "@function rmd-elevation($z-value, $color: $rmd-elevation-color, $opacity-boost: 0) { … }",
      sourceCode:
        '@function rmd-elevation(\n  $z-value,\n  $color: $rmd-elevation-color,\n  $opacity-boost: 0\n) {\n  @if type-of($z-value) != "number" or not unitless($z-value) {\n    @error "$z-value must be a unitless number, but received \'#{$z-value}\'";\n  }\n\n  @if $z-value < 0 or $z-value > 24 {\n    @error "$z-value must be between 0 and 24, but received \'#{$z-value}\'";\n  }\n\n  $color: rmd-theme($color);\n  $shadow-1-value: map-get($rmd-elevation-shadow-1-map, $z-value);\n  $shadow-1-color: rgba(\n    $color,\n    $rmd-elevation-shadow-1-opacity + $opacity-boost\n  );\n\n  $shadow-2-value: map-get($rmd-elevation-shadow-2-map, $z-value);\n  $shadow-2-color: rgba(\n    $color,\n    $rmd-elevation-shadow-2-opacity + $opacity-boost\n  );\n\n  $shadow-3-value: map-get($rmd-elevation-shadow-3-map, $z-value);\n  $shadow-3-color: rgba(\n    $color,\n    $rmd-elevation-shadow-3-opacity + $opacity-boost\n  );\n\n  @return #{"#{$shadow-1-value} #{$shadow-1-color}"},\n    #{"#{$shadow-2-value} #{$shadow-2-color}"},\n    #{"#{$shadow-3-value} #{$shadow-3-color}"};\n}\n',
      throws: [
        "$z-value must be a unitless number, but received ",
        "$z-value must be between 0 and 24, but received ",
      ],
      type: "function",
      parameters: [
        {
          type: "Number",
          name: "z-value",
          description: "This should be a number between 0 and 24.",
        },
        {
          type: "Color",
          name: "color",
          default: "$rmd-elevation-color",
          description: "The color to use for the box-shadow.",
        },
        {
          type: "Number",
          name: "opacity-boost",
          default: "0",
          description:
            "The amount to boost the default opacity levels for the three box-shadows applied.",
        },
      ],
      returns: {
        type: "String",
        description: "the box shadow string for the current elevation.",
      },
    },
  },
  mixins: {
    "rmd-elevation": {
      name: "rmd-elevation",
      description: "Create the box shadow based on a z-value.",
      source: "packages/elevation/src/_mixins.scss#L27-L29",
      usedBy: [
        { name: "rmd-toast", type: "mixin", packageName: "alert" },
        { name: "rmd-app-bar-fixed", type: "mixin", packageName: "app-bar" },
        { name: "rmd-card", type: "mixin", packageName: "card" },
        { name: "rmd-dialog", type: "mixin", packageName: "dialog" },
        { name: "rmd-listbox", type: "mixin", packageName: "form" },
        { name: "rmd-switch-ball", type: "mixin", packageName: "form" },
        { name: "rmd-menu", type: "mixin", packageName: "menu" },
        { name: "rmd-sheet", type: "mixin", packageName: "sheet" },
      ],
      requires: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      examples: [
        {
          code:
            ".my-class {\n  @include rmd-elevation(8);\n\n  background-color: white;\n  position: fixed;\n  z-index: 8;\n}\n",
          compiled:
            ".my-class {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),\n    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n  background-color: white;\n  position: fixed;\n  z-index: 8;\n}\n",
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code:
        "@mixin rmd-elevation($z-value, $color: $rmd-elevation-color, $opacity-boost: 0) { … }",
      sourceCode:
        "@mixin rmd-elevation(\n  $z-value,\n  $color: $rmd-elevation-color,\n  $opacity-boost: 0\n) {\n  box-shadow: rmd-elevation($z-value, $color, $opacity-boost);\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "Number",
          name: "z-value",
          description: "This should be a number between 0 and 24.",
        },
        {
          type: "Color",
          name: "color",
          default: "$rmd-elevation-color",
          description: "The color to use for the box-shadow.",
        },
        {
          type: "Number",
          name: "opacity-boost",
          default: "0",
          description:
            "The amount to boost the default opacity levels for the three box-shadows applied.",
        },
      ],
    },
    "rmd-elevation-transition": {
      name: "rmd-elevation-transition",
      description:
        "This mixin is used to create performant box-shadow transitions between different elevations. What this does behind the scenes is update the element to have `position: relative` along with a pseudo `::before` or `::after` tag that has the new box shadow with an initial opacity set to 0. When the `$active-selectors` class or state is applied to the element, the pseudo element's opacity will be updated to 1 and it'll animate in. This is really just because it is more performant to animate opacity instead of box-shadow itself.",
      source: "packages/elevation/src/_mixins.scss#L56-L79",
      usedBy: [
        { name: "rmd-button", type: "mixin", packageName: "button" },
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
      ],
      requires: [
        {
          name: "rmd-transition-shadow-transition",
          type: "mixin",
          packageName: "transition",
        },
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      code:
        "@mixin rmd-elevation-transition($start, $end, $active-selectors, $before: true, $duration: $rmd-transition-standard-time, $color: $rmd-elevation-color, $opacity-boost: 0) { … }",
      sourceCode:
        "@mixin rmd-elevation-transition(\n  $start,\n  $end,\n  $active-selectors,\n  $before: true,\n  $duration: $rmd-transition-standard-time,\n  $color: $rmd-elevation-color,\n  $opacity-boost: 0\n) {\n  $start-shadow: if(\n    $start == none or $start == 0,\n    none,\n    rmd-elevation($start, $color, $opacity-boost)\n  );\n  $end-shadow: if(\n    $end == none or $end == 0,\n    none,\n    rmd-elevation($end, $color, $opacity-boost)\n  );\n\n  @include rmd-transition-shadow-transition(\n    $start-shadow,\n    $end-shadow,\n    $active-selectors,\n    $before,\n    $duration\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String|Number",
          name: "start",
          description:
            "This should be the starting shadow z-index.\nSo any number from 0 to 24 (inclusive).",
        },
        {
          type: "String|Number",
          name: "end",
          description:
            "This should be the ending shadow z-index. So any number from 0 to 24 (inclusive).",
        },
        {
          type: "List|String",
          name: "active-selectors",
          description:
            "This is normally a class name that should be used or a list of class names for when the box shadow should start animating. This can also be different states such as `&:hover` or `&:focus`",
        },
        {
          type: "Boolean",
          name: "before",
          default: "true",
          description:
            "Boolean the shadow should be placed within the `::before` pseudo element.  When this is set to `false`, the `::after` pseudo element will be used instead.",
        },
        {
          type: "String|Number",
          name: "duration",
          default: "$rmd-transition-standard-time",
          description: "The animation duration to use.",
        },
        {
          type: "Color",
          name: "color",
          default: "$rmd-elevation-color",
          description: "The color to use for the box-shadow.",
        },
        {
          type: "Number",
          name: "opacity-boost",
          default: "0",
          description:
            "The amount to boost the default opacity levels for the three box-shadows applied.",
        },
      ],
    },
  },
  variables: {
    "rmd-elevation-color": {
      name: "rmd-elevation-color",
      description: "The normal elevation color to use.",
      source: "packages/elevation/src/_variables.scss#L15",
      requires: [
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
      ],
      packageName: "elevation",
      type: "Color",
      value: "$rmd-black-base",
      compiled: "#000",
      overridable: false,
    },
    "rmd-elevation-shadow-1-opacity": {
      name: "rmd-elevation-shadow-1-opacity",
      description: "The opacity to apply to the first box-shadow\n",
      source: "packages/elevation/src/_variables.scss#L20",
      see: [
        {
          name: "rmd-elevation-shadow-1-map",
          type: "variable",
          packageName: "elevation",
        },
      ],
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Number",
      value: "0.2",
      overridable: false,
    },
    "rmd-elevation-shadow-2-opacity": {
      name: "rmd-elevation-shadow-2-opacity",
      description: "The opacity to apply to the second box-shadow\n",
      source: "packages/elevation/src/_variables.scss#L25",
      see: [
        {
          name: "rmd-elevation-shadow-2-map",
          type: "variable",
          packageName: "elevation",
        },
      ],
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Number",
      value: "0.14",
      overridable: false,
    },
    "rmd-elevation-shadow-3-opacity": {
      name: "rmd-elevation-shadow-3-opacity",
      description: "The opacity to apply to the third box-shadow\n",
      source: "packages/elevation/src/_variables.scss#L30",
      see: [
        {
          name: "rmd-elevation-shadow-3-map",
          type: "variable",
          packageName: "elevation",
        },
      ],
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Number",
      value: "0.12",
      overridable: false,
    },
    "rmd-elevation-shadow-1-map": {
      name: "rmd-elevation-shadow-1-map",
      description:
        "A Map of the first layer of box-shadows to apply for elevation. This is a map of numbers from 0 -> 24.\n",
      source: "packages/elevation/src/_variables.scss#L35-L61",
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Map",
      value:
        "(\n  0: '0px 0px 0px 0px',\n  1: '0px 2px 1px -1px',\n  2: '0px 3px 1px -2px',\n  3: '0px 3px 3px -2px',\n  4: '0px 2px 4px -1px',\n  5: '0px 3px 5px -1px',\n  6: '0px 3px 5px -1px',\n  7: '0px 4px 5px -2px',\n  8: '0px 5px 5px -3px',\n  9: '0px 5px 6px -3px',\n  10: '0px 6px 6px -3px',\n  11: '0px 6px 7px -4px',\n  12: '0px 7px 8px -4px',\n  13: '0px 7px 8px -4px',\n  14: '0px 7px 9px -4px',\n  15: '0px 8px 9px -5px',\n  16: '0px 8px 10px -5px',\n  17: '0px 8px 11px -5px',\n  18: '0px 9px 11px -5px',\n  19: '0px 9px 12px -6px',\n  20: '0px 10px 13px -6px',\n  21: '0px 10px 13px -6px',\n  22: '0px 10px 14px -6px',\n  23: '0px 11px 14px -7px',\n  24: '0px 11px 15px -7px',\n)",
      overridable: false,
    },
    "rmd-elevation-shadow-2-map": {
      name: "rmd-elevation-shadow-2-map",
      description:
        "A Map of the second layer of box-shadows to apply for elevation. This is a map of numbers from 0 -> 24.\n",
      source: "packages/elevation/src/_variables.scss#L66-L92",
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Map",
      value:
        "(\n  0: '0px 0px 0px 0px',\n  1: '0px 1px 1px 0px',\n  2: '0px 2px 2px 0px',\n  3: '0px 3px 4px 0px',\n  4: '0px 4px 5px 0px',\n  5: '0px 5px 8px 0px',\n  6: '0px 6px 10px 0px',\n  7: '0px 7px 10px 1px',\n  8: '0px 8px 10px 1px',\n  9: '0px 9px 12px 1px',\n  10: '0px 10px 14px 1px',\n  11: '0px 11px 15px 1px',\n  12: '0px 12px 17px 2px',\n  13: '0px 13px 19px 2px',\n  14: '0px 14px 21px 2px',\n  15: '0px 15px 22px 2px',\n  16: '0px 16px 24px 2px',\n  17: '0px 17px 26px 2px',\n  18: '0px 18px 28px 2px',\n  19: '0px 19px 29px 2px',\n  20: '0px 20px 31px 3px',\n  21: '0px 21px 33px 3px',\n  22: '0px 22px 35px 3px',\n  23: '0px 23px 36px 3px',\n  24: '0px 24px 38px 3px',\n)",
      overridable: false,
    },
    "rmd-elevation-shadow-3-map": {
      name: "rmd-elevation-shadow-3-map",
      description:
        "A Map of the third layer of box-shadows to apply for elevation.  This is a map of numbers from 0 -> 24.\n",
      source: "packages/elevation/src/_variables.scss#L97-L123",
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Map",
      value:
        "(\n  0: '0px 0px 0px 0px',\n  1: '0px 1px 3px 0px',\n  2: '0px 1px 5px 0px',\n  3: '0px 1px 8px 0px',\n  4: '0px 1px 10px 0px',\n  5: '0px 1px 14px 0px',\n  6: '0px 1px 18px 0px',\n  7: '0px 2px 16px 1px',\n  8: '0px 3px 14px 2px',\n  9: '0px 3px 16px 2px',\n  10: '0px 4px 18px 3px',\n  11: '0px 4px 20px 3px',\n  12: '0px 5px 22px 4px',\n  13: '0px 5px 24px 4px',\n  14: '0px 5px 26px 4px',\n  15: '0px 6px 28px 5px',\n  16: '0px 6px 30px 5px',\n  17: '0px 6px 32px 5px',\n  18: '0px 7px 34px 6px',\n  19: '0px 7px 36px 6px',\n  20: '0px 8px 38px 7px',\n  21: '0px 8px 40px 7px',\n  22: '0px 8px 42px 7px',\n  23: '0px 9px 44px 8px',\n  24: '0px 9px 46px 8px',\n)",
      overridable: false,
    },
  },
};

export default sassdoc;
