/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {},
  mixins: {},
  variables: {
    "rmd-layout-main-focus-shadow": {
      name: "rmd-layout-main-focus-shadow",
      description:
        "The box-shadow to use when the `<main>` element has been keyboard focused\nfrom the `SkipToMainContent` link.\n\n",
      source: "packages/layout/src/_variables.scss#L11",
      packageName: "layout",
      type: "String",
      value: "$rmd-states-focus-shadow",
      compiled: "inset 0 0 0 0.125rem #2196f3",
      overridable: true,
    },
    "rmd-layout-main-focus-z-index": {
      name: "rmd-layout-main-focus-z-index",
      description:
        "The z-index to use for the `<main>` element when it is keyboard focused. This\nz-index is just used so that it should appear over all elements.\n",
      source: "packages/layout/src/_variables.scss#L16",
      packageName: "layout",
      type: "Number",
      value: "999",
      overridable: true,
    },
  },
};

export default sassdoc;
