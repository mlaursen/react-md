import { type NavigationItem } from "@react-md/core/navigation/types";

export const navItems: readonly NavigationItem[] = [
  {
    type: "group",
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
    type: "group",
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
    type: "group",
    href: "/components",
    children: "Components",
    items: [
      { type: "subheader", children: "Inputs" },
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
        href: "/button-unstyled",
        children: "ButtonUnstyled",
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
      { type: "subheader", children: "Form" },
      {
        type: "route",
        href: "/form",
        children: "Form",
      },
      {
        type: "route",
        href: "/form-message",
        children: "FormMessage",
      },

      { type: "subheader", children: "Presentation" },
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
        href: "/icon-rotator",
        children: "IconRotator",
      },
      {
        type: "route",
        href: "/list",
        children: "List",
      },
      {
        type: "route",
        href: "/material-icons-and-symbols",
        children: "Material Icons/Symbols",
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
        href: "/text-container",
        children: "TextContainer",
      },
      {
        type: "route",
        href: "/text-icon-spacing",
        children: "TextIconSpacing",
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

      { type: "subheader", children: "Navigation" },
      {
        type: "route",
        href: "/carousel",
        children: "Carousel",
      },
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
        href: "/navigation",
        children: "Navigation",
      },
      {
        type: "route",
        href: "/tabs",
        children: "Tabs",
      },
      {
        type: "route",
        href: "/tree",
        children: "Tree",
      },

      { type: "subheader", children: "Feedback" },
      {
        type: "route",
        href: "/dialog",
        children: "Dialog",
      },
      {
        type: "route",
        href: "/overlay",
        children: "Overlay",
      },
      {
        type: "route",
        href: "/progress",
        children: "Progress",
      },
      {
        type: "route",
        href: "/sheet",
        children: "Sheet",
      },
      {
        type: "route",
        href: "/snackbar",
        children: "Snackbar",
      },

      { type: "subheader", children: "Layout" },
      {
        type: "route",
        href: "/app-bar",
        children: "AppBar",
      },
      {
        type: "route",
        href: "/box",
        children: "Box",
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

      { type: "subheader", children: "Utils" },
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
        href: "/sr-only",
        children: "SrOnly",
      },
      {
        type: "route",
        href: "/suspense",
        children: "Suspense",
      },

      { type: "subheader", children: "Transitions" },
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
        href: "/skeleton-placeholder",
        children: "SkeletonPlaceholder",
      },
      {
        type: "route",
        href: "/slide",
        children: "Slide",
      },

      { type: "subheader", children: "Providers" },
      {
        type: "route",
        href: "/app-size-provider",
        children: "AppSizeProvider",
      },
      {
        type: "route",
        href: "/color-scheme-provider",
        children: "ColorSchemeProvider",
      },
      {
        type: "route",
        href: "/core-providers",
        children: "CoreProviders",
      },
      {
        type: "route",
        href: "/portal-container-provider",
        children: "PortalContainerProvider",
      },
      {
        type: "route",
        href: "/ssr-provider",
        children: "SsrProvider",
      },
      {
        type: "route",
        href: "/theme-provider",
        children: "ThemeProvider",
      },
      {
        type: "route",
        href: "/user-interaction-mode-provider",
        children: "UserInteractionModeProvider",
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
    href: "/hooks",
    children: "Hooks",
    items: [
      { type: "subheader", children: "Form State" },
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
      {
        type: "route",
        href: "/use-dropzone",
        children: "useDropzone",
      },
      { type: "subheader", children: "UI and State" },
      {
        type: "route",
        href: "/use-active-heading-id",
        children: "useActiveHeadingId",
      },
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
      {
        type: "route",
        href: "/use-toggle",
        children: "useToggle",
      },
      {
        type: "route",
        href: "/use-readonly-set",
        children: "useReadonlySet",
      },
      {
        type: "route",
        href: "/use-storage",
        children: "useStorage",
      },
      { type: "subheader", children: "Resizing and Positioning" },
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
        href: "/use-element-size",
        children: "useElementSize",
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
      {
        type: "route",
        href: "/use-mutation-observer",
        children: "useMutationObserver",
      },
      {
        type: "route",
        href: "/use-fixed-positioning",
        children: "useFixedPositioning",
      },
      { type: "subheader", children: "Actions" },
      {
        type: "route",
        href: "/use-async-function",
        children: "useAsyncFunction",
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
      { type: "subheader", children: "Theming" },
      {
        type: "route",
        href: "/use-html-class-name",
        children: "useHtmlClassName",
      },
      {
        type: "route",
        href: "/use-prefers-dark-theme",
        children: "usePrefersDarkTheme",
      },
      {
        type: "route",
        href: "/use-color-scheme",
        children: "useColorScheme",
      },
      {
        type: "route",
        href: "/use-color-scheme-provider",
        children: "useColorSchemeProvider",
      },
      {
        type: "route",
        href: "/use-color-scheme-meta-tag",
        children: "useColorSchemeMetaTag",
      },
      {
        type: "route",
        href: "/use-css-variables",
        children: "useCSSVariables",
      },
      { type: "subheader", children: "Low-level" },
      {
        type: "route",
        href: "/use-unmounted",
        children: "useUnmounted",
      },
      {
        type: "route",
        href: "/use-ensured-id",
        children: "useEnsuredId",
      },
      {
        type: "route",
        href: "/use-ensured-ref",
        children: "useEnsuredRef",
      },
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
        href: "/use-orientation",
        children: "useOrientation",
      },
      {
        type: "route",
        href: "/use-page-inactive",
        children: "usePageInactive",
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
      {
        type: "route",
        href: "/use-scroll-lock",
        children: "useScrollLock",
      },
    ],
  },
  {
    type: "group",
    href: "/testing",
    children: "Testing",
    items: [
      {
        type: "route",
        href: "/quickstart",
        children: "Quickstart",
      },
      {
        type: "route",
        href: "/recipes",
        children: "Recipes",
      },
      {
        type: "route",
        href: "/polyfills",
        children: "Polyfills",
      },
      {
        type: "route",
        href: "/test-utils",
        children: "Test Utils",
      },
    ],
  },
  {
    type: "group",
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
    type: "group",
    href: "/utils",
    children: "Utils",
    items: [
      { type: "subheader", children: "Lists" },
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
      { type: "subheader", children: "Numbers" },
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
      { type: "subheader", children: "Async" },
      {
        type: "route",
        href: "/wait",
        children: "wait",
      },
      { type: "subheader", children: "Colors and Accessibility" },
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
      { type: "subheader", children: "Styling" },
      {
        type: "route",
        href: "/bem",
        children: "bem",
      },
      {
        type: "route",
        href: "/object-fit",
        children: "objectFit",
      },
      { type: "subheader", children: "Other" },
      {
        type: "route",
        href: "/identity",
        children: "identity",
      },
    ],
  },
  {
    type: "group",
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
