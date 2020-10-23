Title: react-md 2.4.2

Date: 10/23/2020

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/menu:** fixed DropdownMenu not being able to provide style and
  className to Menu (7823fea), closes #989

---

Title: react-md 2.4.1

Date: 10/17/2020

Summary:

Republished the v2.4.0 release to ensure that all 2300 themes are available
through CDNs after upgrading my build script.

---

Title: react-md 2.4.0

Date: 10/17/2020

Summary:

This release implemented better default behavior to ensure that the "better"
contrast ratio is chosen instead of choosing the first color that meets the
minimal contrast ratio. This is enabled by default going forward, but can be
disabled by setting `$rmd-theme-better-contrast-ratios: false`

##### Bug Fixes<!-- no-margin -->

- **@react-md/table:** table border color uses hex values to fix chrome colSpan
  rendering issue #982 (2138284)

##### Features<!-- no-margin -->

- **@react-md/theme:** Better Contrast Colors by Default and dev-utils refactor
  #955 (519b128)

##### Documentation<!-- no-margin -->

- the documentation site now allows for code examples and sandboxes to
  conditionally use JavaScript instead of TypeScript

---

Title: react-md 2.3.1

Date: 09/14/2020

Summary:

I released `v1.18.0` today but didn't realize that npm uses `--tag` while
`lerna` uses `--dist-tag` so `v1.18.0` was released under `latest` instead of
`previous`. This release is only to ensure that `v2` is set to `latest` and has
no other changes.

---

Title: react-md 2.3.0

Date: 09/10/2020

Summary:

This release is kind of a breaking change since the base `react-md` package no
longer has a `dist/css` folder for all the pre-compiled themes due to CDNs and
package managers rejecting this package for being too big. All the pre-compiled
themes will now be available through [jsDelivr](https://cdn.jsdelivr.net)
instead. Check out the [CDN Links](/guides/cdn-links) for more info.

This release also changed the `ResizeObserver` to use a subscription model to
slightly increase performance when multiple `ResizeObserver`s are used on a
single page as well as fix some errors related to the
`ResizeObserver loop has been exceeded`. The `useResizeObserver` has been
updated to use the new API which requires `ref`s, but is still backwards
compatible. Due to this change, the `ResizeObserver` component has been
**deprecated** in favor of the `useResizeObserver` hook implementation.

Otherwise, there were a few new features added to the #button, #progress, and
#tree packages that you can reference below.

##### Documentation<!-- no-margin -->

- created a new example for the `@react-md/form` package to show how to use
  [react-hook-form](https://react-hook-form.com/) with `react-md` for form
  validation. Check out the new example
  [here](/packages/form/demos#with-react-hook-form).
- updated sandboxes to use new CDN for pre-compiled themes (e83f47e)
- added documentation about using [CDN Links](/guides/cdn-links)
- added a simple umd example to show
  [CDN usage]({{GITHUB_FILE_URL}}/examples/umd) (ed6b62e)

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** added missing scss variables (ec8d675)
- **@react-md/states:** fixed `usePressedStates` to pass `onClick` like other
  state hooks (82cd676)

##### Features<!-- no-margin -->

- **@react-md/alert:** created and exported the default timeout and classnames
  (32bacc9)
- **@react-md/button:** added built-in support for rendering `CircularProgress`
  (c6c616b)
- **@react-md/button:** added support for disabled theme without disabling
  button (6a647e2)
- **@react-md/form:** updated `TextArea` to use the new `useResizeObserver` API
  (2c2dd27)
- **@react-md/overlay:** created and exported the default timeout and classnames
  (48cd9d5)
- **@react-md/progress:** added a `small` state to the `CircularProgress`
  (6884a3a)
- **@react-md/tabs:** updated tabs to use the new resize observer API (052b3f2)
- **@react-md/tree:** updated `defaultTreeItemRenderer` for class names
  (3c61f3c), closes #920
- **@react-md/utils:** improved `LabelRequiredForA11y` type definition (b7aa4fa)
- **@react-md/utils:** added `Dir` component to help determine current writing
  direction (a929e04)
- **@react-md/utils:** added `useGridList` hook (56ecc19)
- **@react-md/utils:** added `useIsomorphicLayoutEffect` from `react-redux`
  (deacf1c)
- **@react-md/utils:** created a new `useResizeObserver` implementation
  (dc3f4df)
- **@react-md/utils:** more verbose `useAppSize` usage error message (2c81982)
- **@react-md/utils:** added hook to access grid list size (a448816)
- **@react-md/utils:** added new `cloneStyles` prop so grid styles can be
  applied to any child (ca913e7)

---

Title: react-md 2.2.2

Date: 09/02/2020

Summary:

This release was a re-publish of `v2.2.0` attempting to fix a publishing error.
Unfortunately, the base `react-md` package had to drop support for the
pre-compiled themes and now need use [jsDelivr](https://cdn.jsdelivr.net)
instead.

Check out the new [CDN Links](/guides/cdn-links) for more info.

---

Title: react-md 2.2.1

Date: 09/02/2020

Summary:

This release was just a re-publish of `v2.2.0` to try fixing a publishing error.

---

Title: react-md 2.2.0

Date: 08/11/2020

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** `Listbox` render `0` as a valid display value
  ([d02b7a9](https://github.com/mlaursen/react-md/commit/d02b7a9042786e4d4c4a46d286b62e6d80afc621))

##### Features<!-- no-margin -->

- **@react-md/avatar:** Added ability to pass props to `<img>` (11848ee), closes
  #908
- **@react-md/form:** Added props to style `Checkbox` and `Radio` input element
  (b6d2318)
- **@react-md/form:** Updated toggle inactive and active colors to be
  configurable (49319e6)

Note: The `Checkbox` and `Radio` components have updated their default inactive
color to be the `rmd-theme-var(text-secondary-on-background)` instead of
`rmd-theme-var(secondary)` to better match the v1 styles.

See
[\$rmd-toggle-inactive-color](/packages/form/sassdoc#form-variable-rmd-toggle-inactive-color)
and
[\$rmd-toggle-active-color](/packages/form/sassdoc#form-variable-rmd-toggle-active-color).

---

Title: react-md 2.1.2

Date: 08/01/2020

Summary:

This release was mostly internal changes and documentation updates including a
new [Writing Tests guide](/guides/writing-tests), but also fixed the `Layout`
component to allow for the `useCrossFade` hook to transition the `<main>`
content on `pathname` changes.

##### Bug Fixes<!-- no-margin -->

- **@react-md/transition:** useCSSTransition now correctly forwards refs
  (36f832f)

---

Title: Added Examples Folder

Date: 07/28/2020

Summary:

The GitHub repo has been updated to now include an
[examples folder]({{GITHUB_URL}}/tree/main/examples) to show how you can use
`react-md` along with other build tools such as
[Create React App](https://create-react-app.dev/),
[Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org), and others.
These examples can be used to spin up boilerplate projects by following the
following steps:

First download the specific example:

```sh
# replace EXAMPLE_NAME with the specific example you want to use
curl https://codeload.github.com/mlaursen/react-md/tar.gz/main | tar -xz --strip=2 react-md-main/examples/EXAMPLE_NAME
cd EXAMPLE_NAME
```

Next, install any dependencies:

```sh
npm install
# or with yarn
yarn
```

Next, initialize the git repository and add the first commit:

```sh
git init
git add .
git commit -m "Initial commit"
```

Finally, follow any instructions in the `README.md` about how to run the
specific example.

---

Title: react-md 2.1.1

Date: 07/21/2020

Summary:

##### Bug Fixes<!-- no-margin -->

- **theme:** Fixed `rmd-theme-get-swatch` to loop over all `rmd-theme-colors`
  instead of the primaries only (353de23), closes #884

---

Title: react-md 2.1.0

Date: 07/11/2020

Read More: #880

Summary:

This release added a new and improved dark mode that can be used by enabling a
new `$rmd-theme-dark-mode-elevation` variable.

##### Bug Fixes<!-- no-margin -->

- `AppBar` text color now defaults to
  `rmd-theme-var(text-primary-on-background)` (2c3ea5e)
- Booleans in dist/scssVariables (f6d43a3)
- ListItem disabled states (7b37292)
- Scroll active element into view while focusing (a9a0902)
- Tree focused index after expanding all with asterisk (8547629)
- Tree keyboard movement for child items that are expanded (fadddc7)
- Tree scrolling elements into view (eef48dc)

##### Features<!-- no-margin -->

- Added new mixin for optional css-modules (28ba828)
- Exported the `useAutoComplete` hook (cac5cd1)
- Improved Dark Mode using Raising Elevation (547877c), closes #860
- Render non-searchable items in AutoComplete (e7a82ac)

---

Title: react-md 2.0.4

Date: 07/10/2020

Summary:

This is a very small release that just fixed adding #form as a dependency to
#layout (e83b296)

---

Title: react-md 2.0.3

Date: 07/07/2020

Summary:

This release fixed a few styling issues for the #form package and correctly
passing the `disabled` prop to the `TextField`'s `<input>` element:

- **form:** Select disabled styling (d79d007)
- **form:** TextArea disabled styles (ef118bf)
- **form:** TextField and Select disabled behavior (e8f2c57)

---

Title: react-md 2.0.2

Date: 06/30/2020

Read More: #877

Summary:

This release focused on fixing bundle sizes with webpack as well as increasing
build performance with the `sideEffects` field for each `package.json`. For more
information, check out the v2.0.2 release PR #877 which goes into details about
build time and sizing changes.

This release also includes the following changes:

- **LICENSE:** Removed the time range from license since it was incorrect
  (50c9021)
- Added unpkg url for base react-md package (d0efc59)
- Updated the changelogs to be updated by
  [conventional commits](https://www.conventionalcommits.org/) which allows for
  a combined root [CHANGELOG.md]({{GITHUB_FILE_URL}}/CHANGELOG.md) (46f4e26)

---

Title: react-md 2.0.1

Date: 06/17/2020

Summary:

This is _technically_ a breaking change for the UMD bundle since this splits the
material-icon component wrappers into separate bundles to minimize the library's
size. I'm going with a patch bump though since it's only been two days since the
v2 release and it's highly doubtful that consumers of the library have fully
upgraded to v2 or even using the UMD bundle to begin with.

react-md will now be available as these bundles:

- Base `ReactMD` library:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md.production.min.js
- `ReactMD` with `*FontIcon` components:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md-with-font-icons.production.min.js
- `ReactMD` with `*SVGIcon` components:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md-with-svg-icons.production.min.js

The
[advanced installation guide](/guides/advanced-installation#react-md--material-icons-umd-bundle)
and the [library size notes](/about#what39s-the-library-size) have been updated
for this information.

---

Title: react-md 2.0.0

Date: 06/15/2020

Read More: v2-release

Summary:<!-- bullets -->

The v2 release is a complete re-write of react-md to address the majority of
problems encountered while using v1. Unfortunately, this took a **lot** longer
than I had hoped since I ended up using this project to learn
[Typescript](https://www.typescriptlang.org/) as well as the new
[React hooks API](https://reactjs.org/docs/hooks-intro.html). Even though there
are some missing components from v1, I think the new functionality outweighs it
and the components are scoped for a later release.

The 2.0.0 release of react-md features:

- Rewrite to Typescript
- New Behavior for Determining the Current Application Size
- New Theme API
- New Utility SCSS Functions and Mixins
- SCSS Variables and Default Values in JavaScript
- Automatic Color fixes for Accessible Contrast Ratios
- Improved Typography and CSS Reset
- Improved User Interaction States
- Improved Accessibility and Keyboard Movement
- Right to left Language Support
- Convenience Configuration and Context Provider Components
- Around 50 new Components and 40 hooks
- All Material Icons Available as Components
- Scoped Packages
- New Documentation Site
