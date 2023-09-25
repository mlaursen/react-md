"use client";
import { type ReactElement } from "react";
import {
  NavigationItemList,
  type NavigationItem,
} from "./NavigationItemList.jsx";

const items: readonly NavigationItem[] = [
  {
    href: "/getting-started",
    children: "Getting Started",
    items: [
      {
        href: "/installation",
        children: "Installation",
      },
      {
        href: "/create-a-layout",
        children: "Create a layout",
      },
      {
        href: "/example-projects",
        children: "Example projects",
      },
    ],
  },
  {
    href: "/customization",
    children: "Customization",
    items: [
      {
        href: "/theme",
        children: "Theme",
      },
      {
        href: "/color-palette",
        children: "Color Palette",
      },
      {
        href: "/dark-mode",
        children: "Dark Mode",
      },
      {
        href: "/theme-builder",
        children: "Theme Builder",
      },
      {
        href: "/breakpoints",
        children: "Breakpoints",
      },
      {
        href: "/transitions",
        children: "Transitions",
      },
    ],
  },
  {
    href: "/components",
    children: "Components",
    items: [
      {
        key: "inputs",
        type: "group",
        children: "Inputs",
        items: [
          {
            href: "/button",
            children: "Button",
          },
        ],
      },
      {
        key: "presentation",
        type: "group",
        children: "Presentation",
        items: [
          {
            href: "/icon",
            children: "Icon",
          },
          {
            href: "/material-icons-symbols",
            children: "Material Icons/Symbols",
          },
        ],
      },
    ],
  },
  // {
  //   href: "/hooks",
  //   children: "Hooks",
  //   items: [
  //     {
  //       key: "resizing-and-positioning",
  //       type: "group",
  //       children: "Resizing and Positioning",
  //       items: [
  //         {
  //           href: "/use-app-size",
  //           children: "useAppSize",
  //         },
  //         {
  //           href: "/use-media-query",
  //           children: "useMediaQuery",
  //         },
  //         {
  //           href: "/use-resize-observer",
  //           children: "useResizeObserver",
  //         },
  //         {
  //           href: "/use-resize-listener",
  //           children: "useResizeListener",
  //         },
  //         {
  //           href: "/use-window-size",
  //           children: "useWindowSize",
  //         },
  //         {
  //           href: "/use-intersection-observer",
  //           children: "useIntersectionObserver",
  //         },
  //       ],
  //     },
  //     {
  //       key: "form-state",
  //       type: "group",
  //       children: "Form State",
  //       items: [
  //         {
  //           href: "/use-text-field",
  //           children: "useTextField",
  //         },
  //         {
  //           href: "/use-number-field",
  //           children: "useNumberField",
  //         },
  //         {
  //           href: "/use-checkbox-group",
  //           children: "useCheckboxGroup",
  //         },
  //         {
  //           href: "/use-radio-group",
  //           children: "useRadioGroup",
  //         },
  //         {
  //           href: "/use-slider",
  //           children: "useSlider",
  //         },
  //         {
  //           href: "/use-range-slider",
  //           children: "useRangeSlider",
  //         },
  //         {
  //           href: "/use-file-upload",
  //           children: "useFileUpload",
  //         },
  //       ],
  //     },
  //     {
  //       key: "actions",
  //       type: "group",
  //       children: "Actions",
  //       items: [
  //         {
  //           href: "/use-async-action",
  //           children: "useAsyncAction",
  //         },
  //         {
  //           href: "/use-debounced-function",
  //           children: "useDebouncedFunction",
  //         },
  //         {
  //           href: "/use-throttled-function",
  //           children: "useThrottledFunction",
  //         },
  //       ],
  //     },
  //     {
  //       key: "layout",
  //       type: "group",
  //       children: "Layout",
  //       items: [
  //         {
  //           href: "/use-layout-tree",
  //           children: "useLayoutTree",
  //         },
  //         {
  //           href: "/use-temporary-layout",
  //           children: "useTemporaryLayout",
  //         },
  //         {
  //           href: "/use-expandable-layout",
  //           children: "useExpandableLayout",
  //         },
  //         {
  //           href: "/use-resizable-layout",
  //           children: "useResizableLayout",
  //         },
  //         {
  //           href: "/use-window-splitter",
  //           children: "useWindowSplitter",
  //         },
  //       ],
  //     },
  //     {
  //       key: "ui-and-state",
  //       type: "group",
  //       children: "UI and State",
  //       items: [
  //         {
  //           href: "/use-tooltip",
  //           children: "useTooltip",
  //         },
  //         {
  //           href: "/use-dropzone",
  //           children: "useDropzone",
  //         },
  //         {
  //           href: "/use-fixed-positioning",
  //           children: "useFixedPositioning",
  //         },
  //         {
  //           href: "/use-html-class-name",
  //           children: "useHtmlClassName",
  //         },
  //         {
  //           href: "/use-color-scheme",
  //           children: "useColorScheme",
  //         },
  //         {
  //           href: "/use-css-variables",
  //           children: "useCSSVariables",
  //         },
  //         {
  //           href: "/use-scroll-lock",
  //           children: "useScrollLock",
  //         },
  //         {
  //           href: "/use-toggle",
  //           children: "useToggle",
  //         },
  //         {
  //           href: "/use-local-storage",
  //           children: "useLocalStorage",
  //         },
  //       ],
  //     },
  //     {
  //       key: "low-level",
  //       type: "group",
  //       children: "Low-level",
  //       items: [
  //         {
  //           href: "/use-element-interaction",
  //           children: "useElementInteraction",
  //         },
  //         {
  //           href: "/use-higher-contrast-children",
  //           children: "useHigherContrastChildren",
  //         },
  //         {
  //           href: "/use-hover-mode",
  //           children: "useHoverMode",
  //         },
  //         {
  //           href: "/use-hover-mode-provider",
  //           children: "useHoverModeProvider",
  //         },
  //         {
  //           href: "/use-draggable",
  //           children: "useDraggable",
  //         },
  //         {
  //           href: "/use-focus-container",
  //           children: "useFocusContainer",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   href: "/testing",
  //   children: "Testing",
  //   items: [
  //     {
  //       href: "/jest",
  //       children: "Jest",
  //     },
  //   ],
  // },
  // {
  //   href: "/styling",
  //   children: "Styling",
  //   items: [
  //     {
  //       href: "/class-name-functions",
  //       children: "Class Name Functions",
  //     },
  //     {
  //       href: "/css-modules",
  //       children: "CSS Modules",
  //     },
  //   ],
  // },
  // {
  //   href: "/utils",
  //   children: "Utils",
  //   items: [
  //     {
  //       key: "lists",
  //       type: "group",
  //       children: "Lists",
  //       items: [
  //         {
  //           href: "/alpha-numeric-sort",
  //           children: "alphaNumericSort",
  //         },
  //         {
  //           href: "/fuzzy-filter",
  //           children: "fuzzyFilter",
  //         },
  //         {
  //           href: "/case-insensitive-filter",
  //           children: "caseInsensitiveFilter",
  //         },
  //         {
  //           href: "/loop",
  //           children: "loop",
  //         },
  //         {
  //           href: "/find-match-index",
  //           children: "findMatchIndex",
  //         },
  //       ],
  //     },
  //     {
  //       key: "numbers",
  //       type: "group",
  //       children: "Numbers",
  //       items: [
  //         {
  //           href: "/random-int",
  //           children: "randomInt",
  //         },
  //         {
  //           href: "/get-percentage",
  //           children: "getPercentage",
  //         },
  //         {
  //           href: "/nearest",
  //           children: "nearest",
  //         },
  //         {
  //           href: "/within-range",
  //           children: "withinRange",
  //         },
  //         {
  //           href: "/parse-css-length-unit",
  //           children: "parseCssLengthUnit",
  //         },
  //       ],
  //     },
  //     {
  //       key: "async",
  //       type: "group",
  //       children: "Async",
  //       items: [
  //         {
  //           href: "/wait",
  //           children: "wait",
  //         },
  //       ],
  //     },
  //     {
  //       key: "colors-and-accessibility",
  //       type: "group",
  //       children: "Colors and Accessibility",
  //       items: [
  //         {
  //           href: "/hex-to-rgb",
  //           children: "hexToRGB",
  //         },
  //         {
  //           href: "/get-rgb",
  //           children: "getRGB",
  //         },
  //         {
  //           href: "/get-luminance",
  //           children: "getLuminance",
  //         },
  //         {
  //           href: "/get-contrast-ratio",
  //           children: "getContrastRatio",
  //         },
  //         {
  //           href: "/is-contrast-compliant",
  //           children: "isContrastCompliant",
  //         },
  //         {
  //           href: "/contrast-color",
  //           children: "contrastColor",
  //         },
  //         {
  //           href: "/is-element-visible",
  //           children: "isElementVisible",
  //         },
  //       ],
  //     },
  //     {
  //       key: "other",
  //       type: "group",
  //       children: "Other",
  //       items: [
  //         {
  //           href: "/bem",
  //           children: "bem",
  //         },
  //         {
  //           href: "/identity",
  //           children: "identity",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    href: "/migration",
    children: "Migration",
    items: [
      {
        href: "/v5-to-v6",
        children: "v5 to v6",
      },
      {
        href: "/v4-to-v5",
        children: "v4 to v5",
      },
      {
        href: "/v3-to-v4",
        children: "v3 to v4",
      },
      {
        href: "/v2-to-v3",
        children: "v2 to v3",
      },
    ],
  },
];

export function Navigation(): ReactElement {
  return <NavigationItemList items={items} depth={0} />;
}
