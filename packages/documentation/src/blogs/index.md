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
[examples folder]({{GITHUB_URL}}/tree/master/examples) to show how you can use
`react-md` along with other build tools such as
[Create React App](https://create-react-app.dev/),
[Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org), and others.
These examples can be used to spin up boilerplate projects by following the
following steps:

First download the specific example:

```sh
# replace EXAMPLE_NAME with the specific example you want to use
curl https://codeload.github.com/mlaursen/react-md/tar.gz/master | tar -xz --strip=2 react-md-master/examples/EXAMPLE_NAME
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
