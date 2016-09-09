# Prerequisites
To use this library, it is recommended to have previous experience using React
and styling with sass or css. This is *not* a layout or grid system framework.
You will need to style the positioning of elements with your own implementation.

#### Sass
The sass is currently prefix-free, so you will need to use an [autoprefixer](https://github.com/postcss/autoprefixer)
to include vendor prefixes. If all the components will be used and the default theme
works for your application, you can use the compiled and prefixed from the `lib` folder.

- `lib/react-md.css` - Development version
- `lib/react-md.min.css` - Production version


#### Javascript
To start using the components, it is required to have experience using a build tool/bundler
to include all your files.

If the `DatePicker` or the `TimePicker` components will be used, the [Intl polyfill](https://github.com/andyearnshaw/Intl.js/)
or a custom implementation must be included for cross-browser support. This can be skipped if you do
not need to support one of the browsers from [caniuse](http://caniuse.com/#search=intl)


#### Fonts
Material design was developed with the [Roboto font](https://www.google.com/fonts/specimen/Roboto)
in mind. The font library or some equivalent should be included in your project. Some form of a
font library should be included as well. The defaults for this project use
[material-icons](https://design.google.com/icons/), but any font library can be used. There are
some mixins for helping pull these font libraries in from a cdn or locally hosted.

