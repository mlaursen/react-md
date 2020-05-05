/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {},
  mixins: {
    "rmd-layout-app-bar-offset": {
      name: "rmd-layout-app-bar-offset",
      description:
        "A utility function to apply offset to one of the layout components. This should probably not be used externally.\n",
      source: "packages/layout/src/_mixins.scss#L18-L22",
      usedBy: [
        { name: "rmd-layout-main", type: "mixin", packageName: "layout" },
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      code: "@mixin rmd-layout-app-bar-offset { … }",
      sourceCode:
        "@mixin rmd-layout-app-bar-offset {\n  &--offset {\n    @include rmd-app-bar-offset;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-layout-header": {
      name: "rmd-layout-header",
      description:
        "Creates all the styles for the layout header/app-bar. This should probably not be used externally.\n",
      source: "packages/layout/src/_mixins.scss#L26-L43",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      code: "@mixin rmd-layout-header { … }",
      sourceCode:
        "@mixin rmd-layout-header {\n  &--nav-offset {\n    @include rmd-utils-rtl {\n      @include rmd-sheet-theme(right, static-width);\n\n      left: auto;\n    }\n\n    @include rmd-sheet-theme(left, static-width);\n\n    // using left and right doesn't actually work how I expected...\n    // left: 0, right: 0 will span the entire relative container or\n    // viewport when fixed, but left: 16, right: 0 won't set the right\n    // edge to the edge of the viewport/relative container so you\n    // have to also adjust the width\n    width: calc(100% - #{rmd-sheet-theme-var(static-width)});\n  }\n}\n",
      type: "mixin",
    },
    "rmd-layout-main": {
      name: "rmd-layout-main",
      description:
        "Creates the styles for the `<main>` element. This should probably not be used externally.\n",
      source: "packages/layout/src/_mixins.scss#L47-L82",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      code: "@mixin rmd-layout-main { … }",
      sourceCode:
        '@mixin rmd-layout-main {\n  @include rmd-layout-app-bar-offset;\n\n  // going to replace the default focus outline with the custom box-shadow\n  // instead\n  @include rmd-utils-hide-focus-outline;\n\n  @include rmd-utils-keyboard-only {\n    @include rmd-transition-shadow-transition(\n      none,\n      $rmd-layout-main-focus-shadow,\n      "&:focus"\n    );\n\n    &::before {\n      @include rmd-app-bar-theme(top, height);\n\n      // need to inherit the margin based for the offsets\n      margin: inherit;\n      position: fixed;\n      z-index: $rmd-layout-main-focus-z-index;\n    }\n  }\n\n  // need to polyfill for IE11 even though not 100% supported\n  display: block;\n  height: 100%;\n\n  &--nav-offset {\n    @include rmd-utils-rtl {\n      @include rmd-sheet-theme(margin-right, static-width);\n\n      margin-left: auto;\n    }\n\n    // might need to change to just left and right instead of margin-left and\n    // margin-right for some browser support\n    @include rmd-sheet-theme(margin-left, static-width);\n  }\n}\n',
      type: "mixin",
    },
    "react-md-layout": {
      name: "react-md-layout",
      description: "Creates all the styles for the layout package.\n",
      source: "packages/layout/src/_mixins.scss#L85-L101",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "layout",
      code: "@mixin react-md-layout { … }",
      sourceCode:
        "@mixin react-md-layout {\n  .rmd-layout-header {\n    @include rmd-layout-header;\n  }\n\n  .rmd-layout-nav {\n    @include rmd-layout-app-bar-offset;\n  }\n\n  .rmd-layout-nav-header {\n    @include rmd-divider-border(bottom);\n  }\n\n  .rmd-layout-main {\n    @include rmd-layout-main;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-layout-main-focus-shadow": {
      name: "rmd-layout-main-focus-shadow",
      description:
        "The box-shadow to use when the `<main>` element has been keyboard focused from the `SkipToMainContent` link.",
      source: "packages/layout/src/_variables.scss#L12",
      usedBy: [
        { name: "rmd-layout-main", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      type: "String",
      value: "$rmd-states-focus-shadow",
      compiled: "inset 0 0 0 0.125rem #2196f3",
      overridable: true,
    },
    "rmd-layout-main-focus-z-index": {
      name: "rmd-layout-main-focus-z-index",
      description:
        "The z-index to use for the `<main>` element when it is keyboard focused.\nThis z-index is just used so that it should appear over all elements.\n",
      source: "packages/layout/src/_variables.scss#L17",
      usedBy: [
        { name: "rmd-layout-main", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      type: "Number",
      value: "999",
      overridable: true,
    },
  },
};

export default sassdoc;
