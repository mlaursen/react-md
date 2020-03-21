/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-card-theme": {
      name: "rmd-card-theme",
      description:
        "This function is used to quickly get one of the card's theme values. This is really just for the `rmd-card-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/card/src/_functions.scss#L14-L16",
      packageName: "card",
      code: "@function rmd-card-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-card-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-card-theme-values, card);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-card-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the card's theme values.",
      },
    },
    "rmd-card-theme-var": {
      name: "rmd-card-theme-var",
      description:
        "This function is used to get one of the card's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-card-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/card/src/_functions.scss#L31-L33",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      code: "@function rmd-card-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-card-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-card-theme-values,\n    card,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-card-theme-values` map keys to set a value for.",
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
        description: "one of the card's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-card-theme": {
      name: "rmd-card-theme",
      description:
        "Creates the styles for one of the card's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/card/src/_mixins.scss#L27-L29",
      packageName: "card",
      code:
        "@mixin rmd-card-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-card-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-card-theme-values,\n    card\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-card-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-card-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-card-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-card-theme-update-var": {
      name: "rmd-card-theme-update-var",
      description:
        "Updates one of the card's theme variables with the new value for the section of your app.",
      source: "packages/card/src/_mixins.scss#L37-L39",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-dark", type: "mixin", packageName: "theme" },
      ],
      packageName: "card",
      code: "@mixin rmd-card-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-card-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-card-theme-values,\n    card\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The card theme style type to update. This should be one of the `$rmd-card-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-card": {
      name: "rmd-card",
      description:
        "Creates all the styles for the `Card` component only. You'll need to use this within a selector.\n",
      source: "packages/card/src/_mixins.scss#L43-L75",
      usedBy: [{ name: "react-md-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      code: "@mixin rmd-card { … }",
      sourceCode:
        '@mixin rmd-card {\n  @include rmd-theme-update-var(\n    background,\n    rmd-card-theme-var(background-color)\n  );\n  @include rmd-theme-update-var(\n    text-primary-on-background,\n    rmd-card-theme-var(color)\n  );\n  @include rmd-theme-update-var(\n    text-secondary-on-background,\n    rmd-card-theme-var(secondary-color)\n  );\n  @include rmd-utils-mouse-only {\n    &--raiseable {\n      // Note: Only worthwhile with the `--shadowed` class\n      @include rmd-elevation-transition(\n        $rmd-card-base-elevation,\n        $rmd-card-raised-elevation,\n        "&:hover"\n      );\n    }\n  }\n  @include rmd-theme(background-color, surface);\n  @include rmd-theme(color, text-primary-on-background);\n\n  border-radius: $rmd-card-border-radius;\n  display: inline-block;\n\n  &--shadowed {\n    @include rmd-elevation($rmd-card-elevation);\n  }\n\n  &--bordered {\n    border: $rmd-card-border-width solid $rmd-card-border-color;\n  }\n\n  &--full-width {\n    display: block;\n    width: 100%;\n  }\n}\n',
      type: "mixin",
    },
    "rmd-card-header": {
      name: "rmd-card-header",
      description:
        "Creates all the styles for the `CardHeader` component. You'll need to use this within a selector.\n",
      source: "packages/card/src/_mixins.scss#L79-L97",
      usedBy: [{ name: "react-md-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      code: "@mixin rmd-card-header { … }",
      sourceCode:
        "@mixin rmd-card-header {\n  @include rmd-icon-theme-update-var(text-spacing, $rmd-card-header-spacing);\n\n  display: flex;\n  padding: $rmd-card-header-padding;\n  padding-top: $rmd-card-header-padding-top;\n\n  &--top {\n    align-items: flex-start;\n  }\n\n  &--center {\n    align-items: center;\n  }\n\n  &--bottom {\n    align-items: flex-end;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-card-title": {
      name: "rmd-card-title",
      description:
        "Creates all the styles for the `CardTitle` component. You'll need to use this within a selector.\n",
      source: "packages/card/src/_mixins.scss#L101-L110",
      usedBy: [{ name: "react-md-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      code: "@mixin rmd-card-title { … }",
      sourceCode:
        "@mixin rmd-card-title {\n  @include rmd-typography(headline-5);\n\n  margin-bottom: 0;\n  margin-top: 0;\n\n  &--small {\n    @include rmd-typography-value(\n      subtitle-1,\n      line-height,\n      font-size,\n      letter-spacing\n    );\n  }\n}\n",
      type: "mixin",
    },
    "rmd-card-subtitle": {
      name: "rmd-card-subtitle",
      description:
        "Creates all the styles for the `CardSubtitle` component. You'll need to use this within a selector.\n",
      source: "packages/card/src/_mixins.scss#L114-L123",
      usedBy: [{ name: "react-md-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      code: "@mixin rmd-card-subtitle { … }",
      sourceCode:
        "@mixin rmd-card-subtitle {\n  @include rmd-typography(subtitle-2);\n\n  margin-bottom: 0;\n  margin-top: 0;\n\n  &--secondary {\n    @include rmd-theme(color, text-secondary-on-background);\n  }\n}\n",
      type: "mixin",
    },
    "rmd-card-content": {
      name: "rmd-card-content",
      description:
        "Creates all the styles for the `CardContent` component. You'll need to use this within a selector.\n",
      source: "packages/card/src/_mixins.scss#L127-L147",
      usedBy: [{ name: "react-md-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      code: "@mixin rmd-card-content { … }",
      sourceCode:
        "@mixin rmd-card-content {\n  &--secondary {\n    @include rmd-theme(color, text-secondary-on-background);\n  }\n\n  &--remove-margin p {\n    margin-top: 0;\n\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n\n  &--padded {\n    padding: $rmd-card-content-padding;\n  }\n\n  &--extra-padding:last-child {\n    padding-bottom: $rmd-card-content-padding-extra;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-card-actions": {
      name: "rmd-card-actions",
      description:
        "Creates all the styles for the `CardActions` component. You'll need to use this within a selector.\n",
      source: "packages/card/src/_mixins.scss#L151-L164",
      usedBy: [{ name: "react-md-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      code: "@mixin rmd-card-actions { … }",
      sourceCode:
        "@mixin rmd-card-actions {\n  align-items: center;\n  display: flex;\n  justify-content: flex-end;\n  padding: $rmd-card-actions-padding;\n\n  &--start {\n    justify-content: flex-start;\n  }\n\n  &--center {\n    justify-content: center;\n  }\n}\n",
      type: "mixin",
    },
    "react-md-card": {
      name: "react-md-card",
      description: "Creates all the styles for the @react-md/card package.\n",
      source: "packages/card/src/_mixins.scss#L167-L206",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "card",
      code: "@mixin react-md-card { … }",
      sourceCode:
        "@mixin react-md-card {\n  @include rmd-theme-create-root-theme($rmd-card-theme-values, card);\n\n  .rmd-card {\n    @include rmd-card;\n\n    &--no-wrap {\n      @include rmd-typography-text-overflow-ellipsis;\n    }\n\n    &__header {\n      @include rmd-card-header;\n    }\n\n    &__header-addon {\n      flex-shrink: 0;\n    }\n\n    &__header-content {\n      flex-grow: 1;\n      min-width: 0;\n    }\n\n    &__title {\n      @include rmd-card-title;\n    }\n\n    &__subtitle {\n      @include rmd-card-subtitle;\n    }\n\n    &__content {\n      @include rmd-card-content;\n    }\n\n    &__actions {\n      @include rmd-card-actions;\n    }\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-card-background-color": {
      name: "rmd-card-background-color",
      description: "The base background color to apply to cards.\n",
      source: "packages/card/src/_variables.scss#L11",
      packageName: "card",
      type: "Color",
      value: "rmd-theme-var(surface)",
      compiled: "var(--rmd-theme-surface, #fff)",
      overridable: true,
    },
    "rmd-card-color": {
      name: "rmd-card-color",
      description: "The base primary text color to apply to cards.\n",
      source: "packages/card/src/_variables.scss#L15",
      packageName: "card",
      type: "Color",
      value: "rmd-theme-var(on-surface)",
      compiled: "var(--rmd-theme-on-surface, #000)",
      overridable: true,
    },
    "rmd-card-secondary-color": {
      name: "rmd-card-secondary-color",
      description:
        "The base secondary text color to apply to cards. The `CardSubtitle` and `CardContent` components will use this color by default unless the `disableSecondaryColor` prop is enabled.\n",
      source: "packages/card/src/_variables.scss#L21-L25",
      packageName: "card",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-theme-surface) == light,\n  rmd-theme-var(text-primary-on-light),\n  rmd-theme-var(text-primary-on-dark)\n)",
      compiled: "var(--rmd-theme-text-primary-on-light, #212121)",
      overridable: true,
    },
    "rmd-card-elevation": {
      name: "rmd-card-elevation",
      description: "The elevation to use for cards that are not raiseable.\n",
      source: "packages/card/src/_variables.scss#L29",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-card-base-elevation": {
      name: "rmd-card-base-elevation",
      description: "The starting elevation for a raiseable card.\n",
      source: "packages/card/src/_variables.scss#L33",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "1",
      overridable: true,
    },
    "rmd-card-raised-elevation": {
      name: "rmd-card-raised-elevation",
      description: "The ending elevation for a raiseable card.\n",
      source: "packages/card/src/_variables.scss#L37",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "8",
      overridable: true,
    },
    "rmd-card-border-radius": {
      name: "rmd-card-border-radius",
      description: "The border radius to apply to cards.\n",
      source: "packages/card/src/_variables.scss#L41",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-card-header-padding": {
      name: "rmd-card-header-padding",
      description:
        "The amount of padding to apply to the `CardHeader` component.\n",
      source: "packages/card/src/_variables.scss#L45",
      usedBy: [{ name: "rmd-card-header", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-card-header-padding-top": {
      name: "rmd-card-header-padding-top",
      description:
        "Any extra amount of padding to apply to the top of the `cardHeader` component.  This is really just added since it looks a bit nicer to have extra padding top.\n",
      source: "packages/card/src/_variables.scss#L51",
      usedBy: [{ name: "rmd-card-header", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-card-header-spacing": {
      name: "rmd-card-header-spacing",
      description:
        "The amount of spacing to use between the main content in the header and the `beforeChildren` and `afterChildren` props. This really gets used with the `TextIconSpacing` component from the @react-md/icon package\n",
      source: "packages/card/src/_variables.scss#L57",
      usedBy: [{ name: "rmd-card-header", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-card-content-padding": {
      name: "rmd-card-content-padding",
      description:
        "The amount of padding to apply to the `CardContent` component.\n",
      source: "packages/card/src/_variables.scss#L61",
      usedBy: [
        { name: "rmd-card-content", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-card-content-padding-extra": {
      name: "rmd-card-content-padding-extra",
      description:
        "When the `CardContent` component is the last child in the `Card`, it normally looks a bit nicer to apply a bit more padding to it. So this is the extra `padding-bottom` that will be applied in that case.\n",
      source: "packages/card/src/_variables.scss#L67",
      usedBy: [
        { name: "rmd-card-content", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-card-actions-padding": {
      name: "rmd-card-actions-padding",
      description:
        "The amount of padding to apply to the `CardActions` component.\n",
      source: "packages/card/src/_variables.scss#L71",
      usedBy: [
        { name: "rmd-card-actions", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-card-border-color": {
      name: "rmd-card-border-color",
      description: "The border color for a bordered card.\n",
      source: "packages/card/src/_variables.scss#L75",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Color|String",
      value: "rmd-divider-theme-var(background-color)",
      compiled: "var(--rmd-divider-background-color, rgba(0, 0, 0, 0.12))",
      overridable: true,
    },
    "rmd-card-border-width": {
      name: "rmd-card-border-width",
      description: "The width for a bordered card.\n",
      source: "packages/card/src/_variables.scss#L79",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "$rmd-divider-size",
      compiled: "1px",
      overridable: true,
    },
    "rmd-card-theme-values": {
      name: "rmd-card-theme-values",
      description:
        'A Map of all the "themeable" parts of the card package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/card/src/_variables.scss#L85-L89",
      usedBy: [
        { name: "rmd-card-theme", type: "function", packageName: "card" },
        { name: "rmd-card-theme-var", type: "function", packageName: "card" },
        { name: "rmd-card-theme", type: "mixin", packageName: "card" },
        {
          name: "rmd-card-theme-update-var",
          type: "mixin",
          packageName: "card",
        },
        { name: "react-md-card", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      type: "Map",
      value:
        "(\n  background-color: $rmd-card-background-color,\n  color: $rmd-card-color,\n  secondary-color: $rmd-card-secondary-color,\n)",
      compiled:
        "(\n  background-color: var(--rmd-theme-surface, #fff),\n  color: var(--rmd-theme-on-surface, #000),\n  secondary-color: var(--rmd-theme-text-primary-on-light, #212121),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
