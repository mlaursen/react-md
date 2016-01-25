### Installation

```bash
$ npm install -S react \
                 react-dom \
                 react-addons-pure-render-mixin \
                 react-addons-transition-group \
                 react-addons-css-transition-group \
                 react-md
```

### Prerequisites

To use this libarary, it is recommended to have previous experience using React
components along with sass/css. In addition, you should use an autoprefixer to
support multiple browsers. The sass files are currently prefix-free. If you are
fine with the default colors and typography, you can use the already compiled
css files in `dist/react-md.css`

If you want to use the `DatePicker` or the `TimePicker` components, you must either
include the [Intl polyfill](https://github.com/andyearnshaw/Intl.js/) or implement
your own if you need to support browsers that do not have it implemented.
[See caniuse](http://caniuse.com/#search=intl).

This project was developed with the [Roboto font](https://www.google.com/fonts/specimen/Roboto)
in mind.  Make sure to include the font library locally or from the cdn (or some font equivalent).

Finally, some form of font icon library should be included. The
defaults for this project are using [material-icons](https://design.google.com/icons/),
but any font library can be used. (Hopefully). There are some mixins
for helping pull these font libraries in from a cdn or locally hosted.

> There are mixins for hosting the font libraries locally.


### Usage

The first step is to use your favorite build tool/bundler.

* [Webpack](https://webpack.github.io/)
* [Browserify](http://browserify.org/)
* [Gulp](http://gulpjs.com/)
* [Grunt](http://gruntjs.com/)
* whatever

Afterwards include `./node_modules/react-md/src/scss/react-md.scss` in some form for the sass files
and make sure to use an autoprefixer.

Finally, use the components as normal.

#### Example

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { Card, CardTitle, CardText } from 'react-md/Cards';

const HelloWorld = () => {
  return (
    <div className="md-card-list">
      <Card>
        <CardTitle title="Hello, World!" />
        <CardText>Lorem ipsum... pretend more...</CardText>
      </Card>
    </div>
  );
};

ReactDOM.render(<HelloWorld />, document.getElementById('app'));
```
