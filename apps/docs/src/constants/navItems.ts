import { API_ROUTES } from "./apiRoutes.js";

export interface NavigationRouteItem {
  href: string;
  children: string;
  isClient?: boolean;
  items?: readonly NavigationItem[];
}

export interface NavigationDividerItem {
  key: string;
  type: "divider";
}

export interface NavigationSubheaderItem {
  key: string;
  type: "subheader";
  children: string;
}

export interface NavigationGroupItem {
  key: string;
  type: "group";
  children: string;
  items: readonly NavigationItem[];
}

export type NavigationItem =
  | NavigationRouteItem
  | NavigationDividerItem
  | NavigationSubheaderItem
  | NavigationGroupItem;

export const navItems: readonly NavigationItem[] = [
  {
    href: "/getting-started",
    children: "Getting Started",
    items: [
      {
        href: "/installation",
        children: "Installation",
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
          {
            href: "/checkbox",
            children: "Checkbox",
          },
          {
            href: "/file-input",
            children: "FileInput",
          },
          {
            href: "/native-select",
            children: "NativeSelect",
          },
          {
            href: "/radio",
            children: "Radio",
          },
          {
            href: "/segmented-button",
            children: "SegmentedButton",
          },
          {
            href: "/select",
            children: "Select",
          },
          {
            href: "/slider",
            children: "Slider",
          },
          {
            href: "/switch",
            children: "Switch",
          },
          {
            href: "/text-field",
            children: "TextField",
          },
        ],
      },
      {
        key: "presentation",
        type: "group",
        children: "Presentation",
        items: [
          {
            href: "/avatar",
            children: "Avatar",
          },
          {
            href: "/badge",
            children: "Badge",
          },
          {
            href: "/chip",
            children: "Chip",
          },
          {
            href: "/divider",
            children: "Divider",
          },
          {
            href: "/icon",
            children: "Icon",
          },
          {
            href: "/text-icon-spacing",
            children: "TextIconSpacing",
          },
          {
            href: "/icon-rotator",
            children: "IconRotator",
          },
          {
            href: "/material-icons-and-symbols",
            children: "Material Icons/Symbols",
          },
          {
            href: "/list",
            children: "List",
          },
          {
            href: "/responsive-item",
            children: "ResponsiveItem",
          },
          {
            href: "/table",
            children: "Table",
          },
          {
            href: "/tooltip",
            children: "Tooltip",
          },
          {
            href: "/typography",
            children: "Typography",
          },
          {
            href: "/text-container",
            children: "TextContainer",
          },
        ],
      },
      {
        key: "feedback",
        type: "group",
        children: "Feedback",
        items: [
          {
            href: "/dialog",
            children: "Dialog",
          },
          {
            href: "/progress",
            children: "Progress",
          },
          {
            href: "/overlay",
            children: "Overlay",
          },
          {
            href: "/sheet",
            children: "Sheet",
          },
          {
            href: "/skeleton-placeholder",
            children: "SkeletonPlaceholder",
          },
          {
            href: "/snackbar",
            children: "Snackbar",
          },
        ],
      },
      {
        key: "navigation",
        type: "group",
        children: "Navigation",
        items: [
          {
            href: "/link",
            children: "Link",
          },
          {
            href: "/skip-to-main-content",
            children: "SkipToMainContent",
          },
          {
            href: "/menu",
            children: "Menu",
          },
          {
            href: "/tabs",
            children: "Tabs",
          },
          {
            href: "/carousel",
            children: "Carousel",
          },
          {
            href: "/tree",
            children: "Tree",
          },
        ],
      },
      {
        key: "layout",
        type: "group",
        children: "Layout",
        items: [
          {
            href: "/box",
            children: "Box",
          },
          {
            href: "/app-bar",
            children: "AppBar",
          },
          {
            href: "/card",
            children: "Card",
          },
          {
            href: "/expansion-panel",
            children: "ExpansionPanel",
          },
          {
            href: "/window-splitter",
            children: "WindowSplitter",
          },
        ],
      },
      {
        key: "providers",
        type: "group",
        children: "Providers",
        items: [
          {
            href: "/app-size-provider",
            children: "AppSizeProvider",
          },
          {
            href: "/core-providers",
            children: "CoreProvider",
          },
          {
            href: "/ssr-providers",
            children: "SsrProvider",
          },
          {
            href: "/form-theme-providers",
            children: "FormThemeProvider",
          },
          {
            href: "/color-scheme-provider",
            children: "ColorSchemeProvider",
          },
          {
            href: "/link-provider",
            children: "LinkProvider",
          },
          {
            href: "/theme-provider",
            children: "ThemeProvider",
          },
          {
            href: "/user-interaction-mode-provider",
            children: "UserInteractionModeProvider",
          },
          {
            href: "/writing-direction-provider",
            children: "WritingDirectionProvider",
          },
        ],
      },
      {
        key: "transitions",
        type: "group",
        children: "Transitions",
        items: [
          {
            href: "/collapse",
            children: "Collapse",
          },
          {
            href: "/cross-fade",
            children: "CrossFade",
          },
          {
            href: "/css-transition",
            children: "CSSTransition",
          },
          {
            href: "/scale-transition",
            children: "ScaleTransition",
          },
        ],
      },
      {
        key: "utils",
        type: "group",
        children: "Utils",
        items: [
          {
            href: "/button-unstyled",
            children: "ButtonUnstyled",
          },
          {
            href: "/portal",
            children: "Portal",
          },
          {
            href: "/suspense",
            children: "Suspense",
          },
          {
            href: "/sr-only",
            children: "SrOnly",
          },
        ],
      },
    ],
  },
  API_ROUTES,
  {
    href: "/hooks",
    children: "Hooks",
    items: [
      {
        key: "resizing-and-positioning",
        type: "group",
        children: "Resizing and Positioning",
        items: [
          {
            href: "/use-app-size",
            children: "useAppSize",
          },
          {
            href: "/use-media-query",
            children: "useMediaQuery",
          },
          {
            href: "/use-resize-observer",
            children: "useResizeObserver",
          },
          {
            href: "/use-resize-listener",
            children: "useResizeListener",
          },
          {
            href: "/use-window-size",
            children: "useWindowSize",
          },
          {
            href: "/use-intersection-observer",
            children: "useIntersectionObserver",
          },
        ],
      },
      {
        key: "form-state",
        type: "group",
        children: "Form State",
        items: [
          {
            href: "/use-text-field",
            children: "useTextField",
          },
          {
            href: "/use-number-field",
            children: "useNumberField",
          },
          {
            href: "/use-checkbox-group",
            children: "useCheckboxGroup",
          },
          {
            href: "/use-radio-group",
            children: "useRadioGroup",
          },
          {
            href: "/use-slider",
            children: "useSlider",
          },
          {
            href: "/use-range-slider",
            children: "useRangeSlider",
          },
          {
            href: "/use-file-upload",
            children: "useFileUpload",
          },
        ],
      },
      {
        key: "actions",
        type: "group",
        children: "Actions",
        items: [
          {
            href: "/use-async-action",
            children: "useAsyncAction",
          },
          {
            href: "/use-debounced-function",
            children: "useDebouncedFunction",
          },
          {
            href: "/use-throttled-function",
            children: "useThrottledFunction",
          },
        ],
      },
      {
        key: "layout",
        type: "group",
        children: "Layout",
        items: [
          {
            href: "/use-layout-tree",
            children: "useLayoutTree",
          },
          {
            href: "/use-temporary-layout",
            children: "useTemporaryLayout",
          },
          {
            href: "/use-expandable-layout",
            children: "useExpandableLayout",
          },
          {
            href: "/use-resizable-layout",
            children: "useResizableLayout",
          },
          {
            href: "/use-window-splitter",
            children: "useWindowSplitter",
          },
        ],
      },
      {
        key: "ui-and-state",
        type: "group",
        children: "UI and State",
        items: [
          {
            href: "/use-tooltip",
            children: "useTooltip",
          },
          {
            href: "/use-dropzone",
            children: "useDropzone",
          },
          {
            href: "/use-fixed-positioning",
            children: "useFixedPositioning",
          },
          {
            href: "/use-html-class-name",
            children: "useHtmlClassName",
          },
          {
            href: "/use-color-scheme",
            children: "useColorScheme",
          },
          {
            href: "/use-css-variables",
            children: "useCSSVariables",
          },
          {
            href: "/use-scroll-lock",
            children: "useScrollLock",
          },
          {
            href: "/use-toggle",
            children: "useToggle",
          },
          {
            href: "/use-local-storage",
            children: "useLocalStorage",
          },
        ],
      },
      {
        key: "low-level",
        type: "group",
        children: "Low-level",
        items: [
          {
            href: "/use-element-interaction",
            children: "useElementInteraction",
          },
          {
            href: "/use-higher-contrast-children",
            children: "useHigherContrastChildren",
          },
          {
            href: "/use-hover-mode",
            children: "useHoverMode",
          },
          {
            href: "/use-hover-mode-provider",
            children: "useHoverModeProvider",
          },
          {
            href: "/use-draggable",
            children: "useDraggable",
          },
          {
            href: "/use-focus-container",
            children: "useFocusContainer",
          },
        ],
      },
    ],
  },
  {
    href: "/testing",
    children: "Testing",
    items: [
      {
        href: "/jest",
        children: "Jest",
      },
    ],
  },
  {
    href: "/styling",
    children: "Styling",
    items: [
      {
        href: "/class-name-functions",
        children: "Class Name Functions",
      },
      {
        href: "/css-modules",
        children: "CSS Modules",
      },
    ],
  },
  {
    href: "/utils",
    children: "Utils",
    items: [
      {
        key: "lists",
        type: "group",
        children: "Lists",
        items: [
          {
            href: "/alpha-numeric-sort",
            children: "alphaNumericSort",
          },
          {
            href: "/fuzzy-filter",
            children: "fuzzyFilter",
          },
          {
            href: "/case-insensitive-filter",
            children: "caseInsensitiveFilter",
          },
          {
            href: "/loop",
            children: "loop",
          },
          {
            href: "/find-match-index",
            children: "findMatchIndex",
          },
        ],
      },
      {
        key: "numbers",
        type: "group",
        children: "Numbers",
        items: [
          {
            href: "/random-int",
            children: "randomInt",
          },
          {
            href: "/get-percentage",
            children: "getPercentage",
          },
          {
            href: "/nearest",
            children: "nearest",
          },
          {
            href: "/within-range",
            children: "withinRange",
          },
          {
            href: "/parse-css-length-unit",
            children: "parseCssLengthUnit",
          },
        ],
      },
      {
        key: "async",
        type: "group",
        children: "Async",
        items: [
          {
            href: "/wait",
            children: "wait",
          },
        ],
      },
      {
        key: "colors-and-accessibility",
        type: "group",
        children: "Colors and Accessibility",
        items: [
          {
            href: "/hex-to-rgb",
            children: "hexToRGB",
          },
          {
            href: "/get-rgb",
            children: "getRGB",
          },
          {
            href: "/get-luminance",
            children: "getLuminance",
          },
          {
            href: "/get-contrast-ratio",
            children: "getContrastRatio",
          },
          {
            href: "/is-contrast-compliant",
            children: "isContrastCompliant",
          },
          {
            href: "/contrast-color",
            children: "contrastColor",
          },
          {
            href: "/is-element-visible",
            children: "isElementVisible",
          },
        ],
      },
      {
        key: "other",
        type: "group",
        children: "Other",
        items: [
          {
            href: "/bem",
            children: "bem",
          },
          {
            href: "/identity",
            children: "identity",
          },
        ],
      },
    ],
  },
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
