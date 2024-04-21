import { type NavigationItem } from "@react-md/core/navigation/types";

export const navItems: readonly NavigationItem[] = [
  {
    type: "route",
    href: "/getting-started",
    children: "Getting Started",
    items: [
      {
        type: "route",
        href: "/installation",
        children: "Installation",
      },
      {
        type: "route",
        href: "/layout",
        children: "Layout",
      },
      {
        type: "route",
        href: "/example-projects",
        children: "Example projects",
      },
    ],
  },
  {
    type: "route",
    href: "/customization",
    children: "Customization",
    items: [
      {
        type: "route",
        href: "/theme",
        children: "Theme",
      },
      {
        type: "route",
        href: "/color-palette",
        children: "Color Palette",
      },
      {
        type: "route",
        href: "/dark-mode",
        children: "Dark Mode",
      },
      {
        type: "route",
        href: "/theme-builder",
        children: "Theme Builder",
      },
      {
        type: "route",
        href: "/breakpoints",
        children: "Breakpoints",
      },
      {
        type: "route",
        href: "/transitions",
        children: "Transitions",
      },
    ],
  },
  {
    type: "route",
    href: "/components",
    children: "Components",
    items: [
      {
        // key: "inputs",
        type: "group",
        children: "Inputs",
        items: [
          {
            type: "route",
            href: "/autocomplete",
            children: "AutoComplete",
          },
          {
            type: "route",
            href: "/button",
            children: "Button",
          },
          {
            type: "route",
            href: "/checkbox",
            children: "Checkbox",
          },
          {
            type: "route",
            href: "/file-input",
            children: "FileInput",
          },
          {
            type: "route",
            href: "/native-select",
            children: "NativeSelect",
          },
          {
            type: "route",
            href: "/radio",
            children: "Radio",
          },
          {
            type: "route",
            href: "/segmented-button",
            children: "SegmentedButton",
          },
          {
            type: "route",
            href: "/select",
            children: "Select",
          },
          {
            type: "route",
            href: "/slider",
            children: "Slider",
          },
          {
            type: "route",
            href: "/switch",
            children: "Switch",
          },
          {
            type: "route",
            href: "/text-field",
            children: "TextField",
          },
        ],
      },
      {
        type: "group",
        children: "Presentation",
        items: [
          {
            type: "route",
            href: "/avatar",
            children: "Avatar",
          },
          {
            type: "route",
            href: "/badge",
            children: "Badge",
          },
          {
            type: "route",
            href: "/chip",
            children: "Chip",
          },
          {
            type: "route",
            href: "/divider",
            children: "Divider",
          },
          {
            type: "route",
            href: "/icon",
            children: "Icon",
          },
          {
            type: "route",
            href: "/text-icon-spacing",
            children: "TextIconSpacing",
          },
          {
            type: "route",
            href: "/icon-rotator",
            children: "IconRotator",
          },
          {
            type: "route",
            href: "/material-icons-and-symbols",
            children: "Material Icons/Symbols",
          },
          {
            type: "route",
            href: "/list",
            children: "List",
          },
          {
            type: "route",
            href: "/responsive-item",
            children: "ResponsiveItem",
          },
          {
            type: "route",
            href: "/table",
            children: "Table",
          },
          {
            type: "route",
            href: "/tooltip",
            children: "Tooltip",
          },
          {
            type: "route",
            href: "/typography",
            children: "Typography",
          },
          {
            type: "route",
            href: "/text-container",
            children: "TextContainer",
          },
        ],
      },
      {
        type: "group",
        children: "Feedback",
        items: [
          {
            type: "route",
            href: "/dialog",
            children: "Dialog",
          },
          {
            type: "route",
            href: "/progress",
            children: "Progress",
          },
          {
            type: "route",
            href: "/overlay",
            children: "Overlay",
          },
          {
            type: "route",
            href: "/sheet",
            children: "Sheet",
          },
          {
            type: "route",
            href: "/skeleton-placeholder",
            children: "SkeletonPlaceholder",
          },
          {
            type: "route",
            href: "/snackbar",
            children: "Snackbar",
          },
        ],
      },
      {
        type: "group",
        children: "Navigation",
        items: [
          {
            type: "route",
            href: "/link",
            children: "Link",
          },
          {
            type: "route",
            href: "/menu",
            children: "Menu",
          },
          {
            type: "route",
            href: "/tabs",
            children: "Tabs",
          },
          {
            type: "route",
            href: "/carousel",
            children: "Carousel",
          },
          {
            type: "route",
            href: "/tree",
            children: "Tree",
          },
        ],
      },
      {
        type: "group",
        children: "Layout",
        items: [
          {
            type: "route",
            href: "/box",
            children: "Box",
          },
          {
            type: "route",
            href: "/app-bar",
            children: "AppBar",
          },
          {
            type: "route",
            href: "/card",
            children: "Card",
          },
          {
            type: "route",
            href: "/expansion-panel",
            children: "ExpansionPanel",
          },
          {
            type: "route",
            href: "/window-splitter",
            children: "WindowSplitter",
          },
        ],
      },
      {
        type: "group",
        children: "Providers",
        items: [
          {
            type: "route",
            href: "/core-providers",
            children: "CoreProviders",
          },
          {
            type: "route",
            href: "/app-size-provider",
            children: "AppSizeProvider",
          },
          {
            type: "route",
            href: "/ssr-provider",
            children: "SsrProvider",
          },
          {
            type: "route",
            href: "/portal-container-provider",
            children: "PortalContainerProvider",
          },
          {
            type: "route",
            href: "/user-interaction-mode-provider",
            children: "UserInteractionModeProvider",
          },
          {
            type: "route",
            href: "/color-scheme-provider",
            children: "ColorSchemeProvider",
          },
          {
            type: "route",
            href: "/theme-provider",
            children: "ThemeProvider",
          },
          {
            type: "route",
            href: "/writing-direction-provider",
            children: "WritingDirectionProvider",
          },
        ],
      },
      {
        type: "group",
        children: "Transitions",
        items: [
          {
            type: "route",
            href: "/collapse",
            children: "Collapse",
          },
          {
            type: "route",
            href: "/cross-fade",
            children: "CrossFade",
          },
          {
            type: "route",
            href: "/css-transition",
            children: "CSSTransition",
          },
          {
            type: "route",
            href: "/scale-transition",
            children: "ScaleTransition",
          },
          {
            type: "route",
            href: "/slide",
            children: "Slide",
          },
        ],
      },
      {
        type: "group",
        children: "Utils",
        items: [
          {
            type: "route",
            href: "/button-unstyled",
            children: "ButtonUnstyled",
          },
          {
            type: "route",
            href: "/portal",
            children: "Portal",
          },
          {
            type: "route",
            href: "/skip-to-main-content",
            children: "SkipToMainContent",
          },
          {
            type: "route",
            href: "/suspense",
            children: "Suspense",
          },
          {
            type: "route",
            href: "/sr-only",
            children: "SrOnly",
          },
        ],
      },
    ],
  },
  {
    type: "route",
    href: "/hooks",
    children: "Hooks",
    items: [
      {
        type: "group",
        children: "Resizing and Positioning",
        items: [
          {
            type: "route",
            href: "/use-app-size",
            children: "useAppSize",
          },
          {
            type: "route",
            href: "/use-media-query",
            children: "useMediaQuery",
          },
          {
            type: "route",
            href: "/use-resize-observer",
            children: "useResizeObserver",
          },
          {
            type: "route",
            href: "/use-resize-listener",
            children: "useResizeListener",
          },
          {
            type: "route",
            href: "/use-window-size",
            children: "useWindowSize",
          },
          {
            type: "route",
            href: "/use-intersection-observer",
            children: "useIntersectionObserver",
          },
        ],
      },
      {
        type: "group",
        children: "Form State",
        items: [
          {
            type: "route",
            href: "/use-text-field",
            children: "useTextField",
          },
          {
            type: "route",
            href: "/use-number-field",
            children: "useNumberField",
          },
          {
            type: "route",
            href: "/use-checkbox-group",
            children: "useCheckboxGroup",
          },
          {
            type: "route",
            href: "/use-radio-group",
            children: "useRadioGroup",
          },
          {
            type: "route",
            href: "/use-slider",
            children: "useSlider",
          },
          {
            type: "route",
            href: "/use-range-slider",
            children: "useRangeSlider",
          },
          {
            type: "route",
            href: "/use-file-upload",
            children: "useFileUpload",
          },
        ],
      },
      {
        type: "group",
        children: "Actions",
        items: [
          {
            type: "route",
            href: "/use-async-action",
            children: "useAsyncAction",
          },
          {
            type: "route",
            href: "/use-debounced-function",
            children: "useDebouncedFunction",
          },
          {
            type: "route",
            href: "/use-throttled-function",
            children: "useThrottledFunction",
          },
        ],
      },
      {
        type: "group",
        children: "Layout",
        items: [
          {
            type: "route",
            href: "/use-layout-tree",
            children: "useLayoutTree",
          },
          {
            type: "route",
            href: "/use-temporary-layout",
            children: "useTemporaryLayout",
          },
          {
            type: "route",
            href: "/use-expandable-layout",
            children: "useExpandableLayout",
          },
          {
            type: "route",
            href: "/use-resizable-layout",
            children: "useResizableLayout",
          },
          {
            type: "route",
            href: "/use-window-splitter",
            children: "useWindowSplitter",
          },
        ],
      },
      {
        type: "group",
        children: "UI and State",
        items: [
          {
            type: "route",
            href: "/use-tooltip",
            children: "useTooltip",
          },
          {
            type: "route",
            href: "/use-dropzone",
            children: "useDropzone",
          },
          {
            type: "route",
            href: "/use-fixed-positioning",
            children: "useFixedPositioning",
          },
          {
            type: "route",
            href: "/use-html-class-name",
            children: "useHtmlClassName",
          },
          {
            type: "route",
            href: "/use-color-scheme",
            children: "useColorScheme",
          },
          {
            type: "route",
            href: "/use-css-variables",
            children: "useCSSVariables",
          },
          {
            type: "route",
            href: "/use-scroll-lock",
            children: "useScrollLock",
          },
          {
            type: "route",
            href: "/use-toggle",
            children: "useToggle",
          },
          {
            type: "route",
            href: "/use-local-storage",
            children: "useLocalStorage",
          },
        ],
      },
      {
        type: "group",
        children: "Low-level",
        items: [
          {
            type: "route",
            href: "/use-element-interaction",
            children: "useElementInteraction",
          },
          {
            type: "route",
            href: "/use-higher-contrast-children",
            children: "useHigherContrastChildren",
          },
          {
            type: "route",
            href: "/use-hover-mode",
            children: "useHoverMode",
          },
          {
            type: "route",
            href: "/use-hover-mode-provider",
            children: "useHoverModeProvider",
          },
          {
            type: "route",
            href: "/use-draggable",
            children: "useDraggable",
          },
          {
            type: "route",
            href: "/use-focus-container",
            children: "useFocusContainer",
          },
        ],
      },
    ],
  },
  {
    type: "route",
    href: "/testing",
    children: "Testing",
    items: [
      {
        type: "route",
        href: "/jest",
        children: "Jest",
      },
    ],
  },
  {
    type: "route",
    href: "/styling",
    children: "Styling",
    items: [
      {
        type: "route",
        href: "/class-name-functions",
        children: "Class Name Functions",
      },
      {
        type: "route",
        href: "/css-modules",
        children: "CSS Modules",
      },
    ],
  },
  {
    type: "route",
    href: "/utils",
    children: "Utils",
    items: [
      {
        type: "group",
        children: "Lists",
        items: [
          {
            type: "route",
            href: "/alpha-numeric-sort",
            children: "alphaNumericSort",
          },
          {
            type: "route",
            href: "/fuzzy-search",
            children: "fuzzySearch",
          },
          {
            type: "route",
            href: "/case-insensitive-search",
            children: "caseInsensitiveSearch",
          },
          {
            type: "route",
            href: "/loop",
            children: "loop",
          },
          {
            type: "route",
            href: "/find-match-index",
            children: "findMatchIndex",
          },
        ],
      },
      {
        type: "group",
        children: "Numbers",
        items: [
          {
            type: "route",
            href: "/random-int",
            children: "randomInt",
          },
          {
            type: "route",
            href: "/get-percentage",
            children: "getPercentage",
          },
          {
            type: "route",
            href: "/nearest",
            children: "nearest",
          },
          {
            type: "route",
            href: "/within-range",
            children: "withinRange",
          },
          {
            type: "route",
            href: "/parse-css-length-unit",
            children: "parseCssLengthUnit",
          },
        ],
      },
      {
        type: "group",
        children: "Async",
        items: [
          {
            type: "route",
            href: "/wait",
            children: "wait",
          },
        ],
      },
      {
        type: "group",
        children: "Colors and Accessibility",
        items: [
          {
            type: "route",
            href: "/hex-to-rgb",
            children: "hexToRGB",
          },
          {
            type: "route",
            href: "/get-rgb",
            children: "getRGB",
          },
          {
            type: "route",
            href: "/get-luminance",
            children: "getLuminance",
          },
          {
            type: "route",
            href: "/get-contrast-ratio",
            children: "getContrastRatio",
          },
          {
            type: "route",
            href: "/is-contrast-compliant",
            children: "isContrastCompliant",
          },
          {
            type: "route",
            href: "/contrast-color",
            children: "contrastColor",
          },
          {
            type: "route",
            href: "/is-element-visible",
            children: "isElementVisible",
          },
        ],
      },
      {
        // key: "other",
        type: "group",
        children: "Other",
        items: [
          {
            type: "route",
            href: "/bem",
            children: "bem",
          },
          {
            type: "route",
            href: "/identity",
            children: "identity",
          },
        ],
      },
    ],
  },
  {
    type: "route",
    href: "/migration",
    children: "Migration",
    items: [
      {
        type: "route",
        href: "/v5-to-v6",
        children: "v5 to v6",
      },
      {
        type: "route",
        href: "/v4-to-v5",
        children: "v4 to v5",
      },
      {
        type: "route",
        href: "/v3-to-v4",
        children: "v3 to v4",
      },
      {
        type: "route",
        href: "/v2-to-v3",
        children: "v2 to v3",
      },
    ],
  },
];
