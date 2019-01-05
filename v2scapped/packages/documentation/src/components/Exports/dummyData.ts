/* tslint:disable:max-line-length */
import { IDocumentedFile, IDocumentedPackage } from "./types.d";

const db: any = {
  typography: {
    components: {
      Text: {
        name: "Text",
        type: "component",
        source: "packages/typography/src/Text.tsx",
        sourceLine: 133,
        description: `The \`Text\` component is used to render text with te material design typography styles applied. By
default, everything will be rendered in a \`<p>\` tag with the normal paragraphy styles.

When the \`type\` prop is changed to another typography style, this component will determine the "best"
element to render the text in *unless* the \`component\` prop is provided. The default mapping is:
- \`"headline-1" -> <h1>\`
- \`"headline-2" -> <h2>\`
- \`"headline-3" -> <h3>\`
- \`"headline-4" -> <h4>\`
- \`"headline-5" -> <h5>\`
- \`"headline-6" -> <h6>\`
- \`"subtitle-1" -> <h5>\`
- \`"subtitle-2" -> <h6>\`
- \`"body-1"     -> <p>\`
- \`"body-2"     -> <p>\`
- \`"caption"    -> <caption>\`
- \`"overline"   -> <span>\`
- \`"button"     -> <button>\`
NOTE: if the \`component\` prop is not \`null\`, this logic will be ignored and the provided \`component\`
will be used instead.`,
        typeParameters: [
          {
            name: "P",
            description: `Any additional props that are valid when using the \`component\` prop or the built-in
"auto-component" logic. By default, this will just allow any HTMLElement props for each the default
elements in the "auto-component" logic.`,
            defaultValue: "DefaultTextProps",
            type: "object",
            typeReferences: ["DefaultTextProps"],
          },
        ],
        typeReferences: [],
        props: "ITextProps",
        links: [],
      },
      TextContainer: {
        name: "TextContainer",
        type: "component",
        source: "packages/typography/src/TextContainer.tsx",
        sourceLine: 74,
        description:
          "The `TextContainer` component is a simple wrapper around a `<div>`, `<section>`, `<article>`, or `<aside>` element that applies the text container styles.",
        typeParameters: [
          {
            name: "P",
            description: `Any additional props that are valid when using the \`component\` prop or the built-in
            "auto-component" logic. By default, this will just allow any HTMLElement props for each the default
elements in the "auto-component" logic.`,
            defaultValue: "DefaultTextProps",
            type: "object",
            typeReferences: ["DefaultTextProps"],
          },
        ],
        typeReferences: [],
        props: "ITextContainerProps",
        links: [],
      },
    },
  },
};

const textFile: IDocumentedFile = {
  TextTypes: {
    name: "TextTypes",
    type: "type",
    tsType: "union",
    source: "packages/typography/src/Text.tsx",
    sourceLine: 10,
    description:
      "A union of all the material design provided typography styles. When used with the Text component, this will generate the correct typography className to apply and determine what component to be rendered as if none was provided.",
    value:
      '"headline-1" | "headline-2" | "headline-3" | "headline-4" | "headline-5" | "headline-6" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2" | "caption" | "overline" | "button"',
    typeParameters: [],
    typeReferences: [],
    links: [],
  },
  DefaultTextProps: {
    name: "DefaultTextProps",
    type: "type",
    tsType: "union",
    source: "packages/typography/src/Text.tsx",
    sourceLine: 29,
    description:
      'The default additional props that can be applied to the Text component. This mostly just covers all the elements that can be rendered "natively".',
    value:
      "HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLButtonElement | HTMLTableCaptionElement | HTMLAnchorElement | HTMLBodyElement | HTMLHtmlElement>",
    typeParameters: [],
    typeReferences: [
      "HTMLAttributes",
      "HTMLHeadingElement",
      "HTMLParagraphElement",
      "HTMLSpanElement",
      "HTMLDivElement",
      "HTMLButtonElement",
      "HTMLTableCaptionElement",
      "HTMLAnchorElement",
      "HTMLBodyElement",
      "HTMLHtmlElement",
    ],
    links: [],
  },
  TextRenderFunction: {
    name: "TextRenderFunction",
    type: "type",
    tsType: "function reflection",
    source: "packages/typography/src/Text.tsx",
    sourceLine: 45,
    description:
      "A type describing the text component's children render function. It provides an object containing the correct (and merged) className and exects a renderable element to be returned.",
    value: "(props: { className: string }) => ReactNode",
    typeParameters: [],
    typeReferences: ["ReactNode"],
    links: [],
  },
  ITextProps: {
    name: "ITextProps",
    type: "interface",
    source: "packages/typography/src/Text.tsx",
    sourceLine: 52,
    description: "The base props for rendering the text component.",
    extends: [],
    attributes: [
      {
        name: "className",
        description: "An optiona className to merge into typography styles.",
        defaultValue: "",
        required: false,
        type: "string",
        typeReferences: [],
        typeParameterReferences: [],
      },
      {
        name: "component",
        description: `The component to render as when the children are not a render function. If this prop is omitted, the component will be determined by the \`type\` prop where:
- \`"headline-1" -> <h1>\`
- \`"headline-2" -> <h2>\`
- \`"headline-3" -> <h3>\`
- \`"headline-4" -> <h4>\`
- \`"headline-5" -> <h5>\`
- \`"headline-6" -> <h6>\`
- \`"subtitle-1" -> <h5>\`
- \`"subtitle-2" -> <h6>\`
- \`"body-1"     -> <p>\`
- \`"body-2"     -> <p>\`
- \`"caption"    -> <caption>\`
- \`"overline"   -> <span>\`
- \`"button"     -> <button>\`
`,
        defaultValue: "null",
        required: false,
        type: "ReactType<P> | null",
        typeReferences: ["ReactType"],
        typeParameterReferences: ["P"],
      },
      {
        name: "type",
        description:
          "One of the material design typography text styles. This is used to generate a className that can be applied to any element and have the correct typography.",
        defaultValue: "body-1",
        required: false,
        type: "TextTypes",
        typeReferences: ["Typography.Text.TextTypes"],
        typeParameterReferences: ["P"],
      },
      {
        name: "children",
        description:
          "Either a child render function or a react node. If this is not the child render function, a different wrapper component can be provided using the `component` prop.",
        required: false,
        defaultValue: "",
        type: "ReactNode | TextRenderFunction",
        typeReferences: ["ReactNode", "TextRenderFunction"],
        typeParameterReferences: [],
      },
    ],
    typeParameters: [
      {
        name: "P",
        type: "any",
        description: "Any additional props that are available based on the component prop.",
        defaultValue: "DefaultTextProps",
        typeReferences: ["DefaultTextProps"],
      },
    ],
    typeReferences: [],
    links: [],
  },
  ITextDefaultProps: {
    name: "ITextDefaultProps",
    type: "default-props",
    extends: [],
    source: "packages/typography/src/Text.tsx",
    sourceLine: 94,
    description: `The default defined props for the text component.`,
    attributes: [
      {
        name: "type",
        type: "TextTypes",
        typeReferences: ["TextTypes"],
        typeParameterReferences: [],
      },
    ],
    typeParameters: [],
    typeReferences: [],
    links: [],
  },
  Text: {
    name: "Text",
    type: "component",
    source: "packages/typography/src/Text.tsx",
    sourceLine: 133,
    description: `The \`Text\` component is used to render text with te material design typography styles applied. By
default, everything will be rendered in a \`<p>\` tag with the normal paragraphy styles.

When the \`type\` prop is changed to another typography style, this component will determine the "best"
element to render the text in *unless* the \`component\` prop is provided. The default mapping is:
- \`"headline-1" -> <h1>\`
- \`"headline-2" -> <h2>\`
- \`"headline-3" -> <h3>\`
- \`"headline-4" -> <h4>\`
- \`"headline-5" -> <h5>\`
- \`"headline-6" -> <h6>\`
- \`"subtitle-1" -> <h5>\`
- \`"subtitle-2" -> <h6>\`
- \`"body-1"     -> <p>\`
- \`"body-2"     -> <p>\`
- \`"caption"    -> <caption>\`
- \`"overline"   -> <span>\`
- \`"button"     -> <button>\`
NOTE: if the \`component\` prop is not \`null\`, this logic will be ignored and the provided \`component\`
will be used instead.`,
    typeParameters: [
      {
        name: "P",
        description: `Any additional props that are valid when using the \`component\` prop or the built-in
"auto-component" logic. By default, this will just allow any HTMLElement props for each the default
elements in the "auto-component" logic.`,
        defaultValue: "DefaultTextProps",
        type: "object",
        typeReferences: ["DefaultTextProps"],
      },
    ],
    typeReferences: [],
    props: "ITextProps",
    links: [],
  },
};

const textContainerFile: IDocumentedFile = {
  TextContainerSize: {
    name: "TextContainerSize",
    type: "type",
    tsType: "union",
    source: "packages/typography/src/TextContainer.tsx",
    sourceLine: 9,
    description:
      "A union of the available text container sizes. One of these values must be chosen to help set the max width for text.",
    value: '"auto" | "mobile" | "desktop"',
    typeParameters: [],
    typeReferences: [],
    links: [],
  },
  DefaultTextContainerProps: {
    name: "DefaultTextContainerProps",
    type: "type",
    tsType: "union",
    source: "packages/typography/src/TextContainer.tsx",
    sourceLine: 15,
    description:
      "The default additional props that can be provided to the `TextContainer`. By default, it is just all the div element attributes.",
    value: '"auto" | "mobile" | "desktop"',
    typeParameters: [],
    typeReferences: [],
    links: [],
  },
};

export const TYPOGRAPHY_PACKAGE: IDocumentedPackage = {
  Text: textFile,
  TextContainer: textContainerFile,
};

export default textFile;
