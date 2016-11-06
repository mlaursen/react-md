# Prerequisites
To use this library, it is recommended to have previous experience using React
and styling with sass or css. 

#### Sass
The sass is currently prefix-free, so you will need to use an [autoprefixer](https://github.com/postcss/autoprefixer)
to include vendor prefixes. There are multiple pre-compiled themes available either from the `dist` folder or from [unpkg](https://unpkg.com).
They can be included by using the `react-md.${PRIMARY}-${ACCENT.min}.css`. There are no development versions available.

- `dist/react-md.indigo-pink.min.css` - Production version
- `https://unpkg.com/react-md/dist/react-md.indigo-pink.min.css` - Production version


#### Javascript
To start using the components, you can either use the UMD build or use your favorite build tool/bundler.

The UMD build is available either from `unpkg` or the `dist` folder.

- `dist/react-md.js` - Development version
- `https://unpkg.com/react-md/dist/react-md.js` - Development version
- `dist/react-md.min.js` - Production version
- `https://unpkg.com/react-md/dist/react-md.min.js` - Production version

If the `DatePicker` or the `TimePicker` components will be used, the [Intl polyfill](https://github.com/andyearnshaw/Intl.js/)
or a custom implementation must be included for cross-browser support. This can be skipped if you do
not need to support one of the browsers from [caniuse](http://caniuse.com/#search=intl)


#### Fonts
Material design was designed to be used with either the [Roboto](https://www.google.com/fonts/specimen/Roboto)
or [Noto](https://www.google.com/get/noto/) font. You can use whichever font you prefer though. In additiona,
icons can either be included by your favorite SVG library or a font icon library such as 
[material-icons](https://design.google.com/icons/) or [FontAwesome](http://fontawesome.io/). react-md uses
`material-icons` as a default for all icons beceause it is has consistent sizes. If you use another font icon libary,
you may need to enforce equal width and height to get a consistent look.
