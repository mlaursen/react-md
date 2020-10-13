# CDN Links

ReactMD is available over a CDN. Add one of the following to your app:

```html
<!-- ReactMD without any icons -->
<script
  crossorigin
  src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md.development.js"
></script>
```

```html
<!-- ReactMD with font icons -->
<script
  crossorigin
  src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md-with-font-icons.development.js"
></script>
```

```html
<!-- ReactMD with svg icons -->
<script
  crossorigin
  src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md-with-svg-icons.development.js"
></script>
```

The links above are only meant for development, and are not suitable for
production. Minified and optimized production versions of ReactMD are available
at:

```html
<!-- ReactMD without any icons -->
<script
  crossorigin
  src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md.production.min.js"
></script>
```

```html
<!-- ReactMD with font icons -->
<script
  crossorigin
  src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md-with-font-icons.production.min.js"
></script>
```

```html
<!-- ReactMD with SVG icons -->
<script
  crossorigin
  src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md-with-svg-icons.production.min.js"
></script>
```

To choose a specific version, replace `{{RMD_VERSION}}` in the urls with the
specific version.

> Head on over to the
> [advanced installation guide](/guides/advanced-installation) for more
> information about
> [using the CDN hosted UMD bundle of react-md](/guides/advanced-installation#using-the-cdn-hosted-umd-bundle-of-react-md).

## Pre-compiled Themes

Unfortunately the pre-compiled css bundles and themes are not included
automatically with the UMD bundles, but they are available through the
[jsDelivr](https://www.jsdelivr.com/) CDN. Unlike the UMD bundles, there are no
development versions of the pre-compiled css bundles and only minified
production versions are provided.

Each theme will follow the naming pattern of:

- `react-md.{PRIMARY}-{SECONDARY}-{SECONDARY_WEIGHT}-{LIGHT|DARK}.min.css`

So a few examples are:

- `react-md.indigo-pink-200-dark.min.css`
- `react-md.indigo-pink-200-light.min.css`
- `react-md.light_blue-deep_orange-200-light.min.css`
- `react-md.light_blue-deep_orange-700-dark.min.css`
- `react-md.purple-pink-200-dark.min.css`
- `react-md.purple-pink-200-light.min.css`
- `react-md.teal-pink-200-dark.min.css`
- `react-md.teal-pink-200-light.min.css`

To include a pre-compiled theme in your app, update your `index.html` to include
a new `<link>` tag:

```html
<link
  crossorigin
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/mlaursen/react-md@{{RMD_VERSION}}/themes/react-md.teal-pink-200-dark.min.css"
/>
```

Replace any of the theme colors in the `href` for your specific theme and
replace `{{RMD_VERSION}}` for a specific version of ReactMD.

> The pre-compiled themes used to be published with the base `react-md` package,
> but the tarball ended up being too large so package managers and other CDNs
> rejected it. The themes are compiled and committed with each tagged version of
> ReactMD, but removed before pushing the commit to `main`.
