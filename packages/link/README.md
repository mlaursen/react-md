# @react-md/link
A small package for rendering links within react-md with sensible default styles. This should plug-and-play with
any routing library that you decide to use with your application.

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/link

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
  * [With React Router](#with-react-router)
  * [With @reach/router](#with-reachrouter)
  * [No Routing Library](#no-routing-library)
- [Prop Types](#prop-types)
  * [Link](#link)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/link
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/link`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

#### webpack
```diff
 {
   test: /.scss$/,
   use: [{
     loader: 'style-loader',
     options: { sourceMap: true },
   }, {
     loader: 'css-loader',
     options: { sourceMap: true, importLoaders: 2 },
   }, {
     loader: 'postcss',
     options: { sourceMap: true },
   }, {
     loader: 'sass-loader',
     options: {
       sourceMap: true,
+      includePaths: [
+        './node_modules', // or whatever relative path it is to node_modules
+      ],
     },
   }],
 }
```

#### create-react-app and node-sass-chokidar
```diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-csss && npm run build-css -- --watch --recursive"
   }
```

### Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-link`:

```scss
// This import will generate styles by default.
@import "@react-md/link/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/link/dist/link";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-link;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/link/dist/link";

// Any custom styles that use the utilities
```


## Usage
### With React Router
If you want to use [react-router](https://github.com/ReactTraining/react-router) as your routing library,
you can use the `component` prop to render as react-router's `Link` component, but with the styles from
react-md.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Link as RRLink, LinkProps as RRLinkProps } from "react-router-dom";
import { Link as RMDLink, ILinkProps as RMDLinkProps } from "@react-md/link"

type LinkProps = RRLinkProps & RMDLinkProps;
const Link: React.SFC<LinkProps> = props => <RMDLink component={RRLink} {...props} />;

const Home: React.SFC<{}> = () => <h1>Home</h1>;
const Hello: React.SFC<{}> = () = <h1>Hello</h1>;

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/hello">Hello</Link>
      </nav>
      <main>
        <Route path="/" exact={true} component={Home} />
        <Route path="/hello" component={Hello} />
      </main>
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement
);
```

### With @reach/router
If you want to use [@reach/router](https://github.com/reach/router) as your routing library, you can
use the `component` prop (just like with react-router) to render as @reach/router's `Link` component,
but with the styles from react-md.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Link as RRLink } from "react-router-dom";
import { Link as RMDLink, ILinkProps as RMDLinkProps } from "@react-md/link"

type LinkProps = RMDLinkProps;
const Link: React.SFC<LinkProps> = props => <RMDLink component={RRLink} {...props} />;

interface RouteComponentProps {
  path: string;
}

const Home: React.SFC<RouteComponentProps> = () => <h1>Home</h1>;
const Hello: React.SFC<RouteComponentProps> = () = <h1>Hello</h1>;

ReactDOM.render(
  <React.Fragment>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/hello">Hello</Link>
    </nav>
    <main>
      <Router>
        <Home path="/" />
        <Hello path="hello" />
      </Router>
    </main>
  </React.Fragment>,
  document.getElementById("root") as HTMLElement
);
```

### No Routing Library
Finally, if you just want to use regular links, you can just use the base `Link` component with an
`href` string prop.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "@react-md/link"

const Home: React.SFC<{}> = () => <h1>Home</h1>;
const Hello: React.SFC<{}> = () = <h1>Hello</h1>;

ReactDOM.render(
  <main>
    This is a link to <Link href="https://google.com">google.com</Link>, but this
    link is <Link href="">current disabled</Link> because there was no href provided.
    Finally, this link <Link href="#">is a hash</Link> link to match an optional id on
    the page.
  </main>,
  document.getElementById("root") as HTMLElement
);
```

<!-- PROPS_START -->
## Prop Types
### Link


> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
Any optional class name to apply to the link.
<br /><br />
</td>
</tr>
<tr>
<td>component *</td>
<td><code>string | ComponentClass<any, ComponentState> | StatelessComponent<any></code></td>
<td><code>null</code></td>
<td>
An optional component to render as. This should really only be used if you are using a router library
like [react-router](https://github.com/ReactTraining/react-router) or
[@reach/router](https://github.com/reach/router). This will call <code>React.createElement</code> with this value
and provide all props and class name.
<br /><br />
</td>
</tr>
<tr>
<td>href</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional href to apply to the link. If this value is set to the empty string and the <code>component</code> prop is
not provided, the link will basically be disabled.
<br /><br />
</td>
</tr>
<tr>
<td>target *</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional target for the link to be opened in. It is recommended to keep this undefined in most cases. If
this is not <code><i>blank</code>, <code></i>parent</code>, <code>_self</code>, or <code>_top</code>, it should be the frame name that the link should
be rendered in if using frames.
<br /><br />
</td>
</tr>
<tr>
<td>rel</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional <code>rel</code> to apply to the link. This should be a combination of 1 to many of:
- &#34;alternate&#34;
- &#34;author&#34;
- &#34;bookmark&#34;
- &#34;external&#34;
- &#34;help&#34;
- &#34;license&#34;
- &#34;next&#34;
- &#34;nofollow&#34;
- &#34;noreferrer&#34;
- &#34;noopener&#34;
- &#34;prev&#34;
- &#34;search&#34;
- &#34;tag&#34;
<br /><br />
This is really just used to override the default behavior of the <code>preventMaliciousTarget</code> prop.
<br /><br />
</td>
</tr>
<tr>
<td>preventMaliciousTarget</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the link should automatically be updated to apply `rel=noopener noreferrer` when the <code>target</code> prop
is set to <code>&#34;_blank&#34;</code>. This is recommended to have enabled by default, but can be disabled by setting this prop
to <code>false</code> or specificying a <code>rel</code> prop yourself. You can read more about the reason for this
[here](https://mathiasbynens.github.io/rel-noopener/).
<br /><br />
</td>
</tr>
<tr>
<td>flexCentered</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the Link should be positioned with a flexbox and align the items centered. This is disabled by default
but can be useful when rendering icons within the link.
<br /><br />
</td>
</tr>
</tbody>
</table>


<!-- PROPS_END -->


<!-- SASSDOC_START -->
## SassDoc

### Mixins

<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>react-md-link</code></td>
<td>Creates the styles for links within react-md. Please note that there are <b>no disabled styles</b> unless you
set the href to an empty string. This is intentional. If you want to disable a link, you should remove set
the href to an empty string instead.
<br /><br />

</td>
</tr>
</tbody>
</table>


### Variables
<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>rmd-link-visited-color</code></td>
<td>The color to use for links that have been visited. This will default to using the primary theme color but
with an swatch of 200 instead of 500. If you are using a non-material design color, this value <b>must</b> be
updated with your own implementation as compilation will fail.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-link-hover-color</code></td>
<td>The color to use for links that are being hovered.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-link-transition-time</code></td>
<td>The transition time for links to change color.
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

