---
"@react-md/core": patch
---

This release was focused around the `Autocomplete` and the "better" API for it. There's a lot more functionality built
in by default and should behave much more like other libraries. I might add a few more features in before calling it complete, but not sure yet.

Check out the <https://next.react-md.dev/components/autocomplete> page to see the latest demos.

Fixes:

- Updated all styles to fix issues around the new [Sass Mixed Declarations](https://sass-lang.com/documentation/breaking-changes/mixed-decls/)
- Updated most function declarations on interfaces to be arrow functions instead of methods to prevent `this` pollution
- No longer unmount the dialog component when switching between full-page and other dialog types
- Updated the nested Dialog behavior when a full-page dialog is included
- Fixed some missing accessibility props for the `Navigation` components

Features:

- Updated the `Navigation` components to be controlled for the collapsed state and added a `useNavigationExpansion` hook to help control the state
- Added the `objectFit` utility class generator
- Added `isColorScheme` and `isColorSchemeMode` type assertion helpers
- Added support for `Dialog` widths
- Only apply base styles to the `body` element instead of `html`
- Updated the `Card` component to extend the `Box` component
- Added support to `disableRipple` on the component level instead of global only
- Added `useReadonlySet` hook
- Added `disabled` support to the `useFixedPositioning` hook and related components
- Added the missing `--rmd-scrollbar-size` type definition to the `CSSProperties` interface
- Added a simple `debounce` helper for usage outside of react components

Other changes:

- Updated `.mouse-mode`, `.keyboard-mode`, and `.touch-mode` to be prefixed with `rmd-` like all other classes
- Started adding SCSS documentation back since I'm working on the sassdoc-parser/sass-lsp
- Renamed `ResponsiveItemContainer` to `ResponsiveItem`
- Split some files so they they don't all need to be considered client components
- Updated the `NativeSelect` styling to match other components that use the `TextFieldContainer` and `FormMessageContainer` components
- Fixed the height for nested Menu Item Dropdowns
- Stopped using deprecated browser APIs
- Renamed `useImmediateRaf` to `testImmediateRaf` so it isn't considered a hook

Documentation:

- Added Dark Mode docs
- Added Breakpoints docs
- Added Color Palette docs
- Added additional `Dialog` demos
- Added `Form` docs
- Added `WindowSplitter` docs
- Added `ResponsiveItem` docs

Internal:

- Updated to use `eslint@9.x.x`
