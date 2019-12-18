/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {},
  mixins: {},
  variables: {
    "rmd-media-overlay-background-color": {
      name: "rmd-media-overlay-background-color",
      description: "The background color for a media overlay.\n",
      source: "packages/media/src/_variables.scss#L9",
      packageName: "media",
      type: "Color",
      value: "rgba($rmd-black-base, 0.54)",
      compiled: "rgba(0, 0, 0, 0.54)",
      overridable: true,
    },
    "rmd-media-selectors": {
      name: "rmd-media-selectors",
      description:
        "A list of selectors or html elements that should be considered responsive\nmedia by default. This will make it so that when using the `MediaContainer`\ncomponent, the following elements will be responsive automatically.\n",
      source: "packages/media/src/_variables.scss#L15",
      usedBy: [{ name: "react-md-media", type: "mixin", packageName: "media" }],
      packageName: "media",
      type: "List",
      value: "(img '>svg' iframe video embed object)",
      overridable: true,
    },
    "rmd-media-default-aspect-ratio": {
      name: "rmd-media-default-aspect-ratio",
      description:
        "The default aspect ratio for the media component when an aspect ratio is\nenforced.\n",
      source: "packages/media/src/_variables.scss#L20",
      packageName: "media",
      type: "Number",
      value: "percentage(9 / 16)",
      overridable: true,
    },
    "rmd-media-default-aspect-ratios": {
      name: "rmd-media-default-aspect-ratios",
      description:
        "A Map including the default aspect ratios to create for responsive media\nwith a forced aspect ratio. Each key must be a string for a class name suffix\nand each value should be a list in the form of (width height).\n",
      source: "packages/media/src/_variables.scss#L26-L30",
      usedBy: [{ name: "react-md-media", type: "mixin", packageName: "media" }],
      packageName: "media",
      type: "Map",
      value: "(\n  '16-9': 16 9,\n  '4-3': 4 3,\n  '1-1': 1 1,\n)",
      overridable: true,
    },
    "rmd-media-overlay-padding": {
      name: "rmd-media-overlay-padding",
      description: "The default padding for the media overlay component.\n",
      source: "packages/media/src/_variables.scss#L34",
      usedBy: [
        { name: "rmd-media-overlay", type: "mixin", packageName: "media" },
      ],
      packageName: "media",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-media-overlay-horizontal-width": {
      name: "rmd-media-overlay-horizontal-width",
      description:
        "This is the default width for the media overlay component when the position\nis set to `left`, `right`, or `center`. This is really just added since these\npositions might cause overflow issues since their width will change based on\nthe content size. Setting it to a width will prevent this.\n\nSo if you'd like to add the default behavior back, you can set this to `100%`\nor `null`.\n",
      source: "packages/media/src/_variables.scss#L44",
      usedBy: [
        {
          name: "rmd-media-overlay-position",
          type: "mixin",
          packageName: "media",
        },
      ],
      packageName: "media",
      type: "Number",
      value: "30%",
      overridable: true,
    },
    "rmd-media-overlay-positions": {
      name: "rmd-media-overlay-positions",
      description:
        "The positions for the media overlay. This can be set to an empty list or null\nif you'd like to save a few bytes by not generating the styles for some positions.\n",
      source: "packages/media/src/_variables.scss#L49",
      usedBy: [
        {
          name: "rmd-media-overlay-position",
          type: "mixin",
          packageName: "media",
        },
        { name: "rmd-media-overlay", type: "mixin", packageName: "media" },
        { name: "rmd-media-overlay", type: "mixin", packageName: "media" },
      ],
      packageName: "media",
      type: "List",
      value: "(top right bottom left middle center absolute-center)",
      overridable: true,
    },
  },
};

export default sassdoc;
