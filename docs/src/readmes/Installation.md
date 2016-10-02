# Installation
react-md is available as an [npm package](https://www.npmjs.com/package/react-md).

You can install with:

```bash
$ npm install -S react \
                 react-dom \
                 react-addons-transition-group \
                 react-addons-css-transition-group \
                 react-addons-pure-render-mixin \
                 react-md
```

Once installed, the compiled versions are accessibile from `react-md/lib` and the
uncompiled are in `react-md/src/js`.

### Fonts
The [Roboto font](https://www.google.com/fonts/specimen/Roboto) and 
[material-icons](https://design.google.com/icons/) should be included as well
(or some equivalent). These fonts can be included via [WebFontLoader](https://github.com/typekit/webfontloader)
or by locally hosting and using the provided sass mixins to include them. The
example below will include the fonts with the WebFontLoader.


### Webpack Example

```js
/* index.jsx */
import React, { Component } from 'react';
import { render } from 'react-dom';
import WebFontLoader from 'webfontloader';

import 'index.scss';
import { Card, CardTitle, CardText, CardActions } from 'react-md/lib/Cards';
import Button from 'react-md/lib/Buttons';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

class App extends Component {
  render() {
    return (
      <div className="md-grid">
        <Card className="md-cell">
          <CardTitle title="Hello, World!"  />
          <CardText>
            Lorem ipsum... pretend more ...
          </CardText>
          <CardActions>
            <Button flat label="Action 1" />
            <Button flat label="Action 2" />
          </CardActions>
        </Card>
      </div>
    );
  }
}

render(document.getElementById('app'), <App />);
```

```scss
// index.scss
@import '~normalize.css';

// Include all components and defaults
@import '~react-md/src/scss/react-md';

// If you want to reduce bundle size, you can include specific components instead:
@import '~react-md/src/scss/helpers/all';
@import '~react-md/src/scss/typography';
@import '~react-md/src/scss/components/cards';
@import '~react-md/src/scss/components/buttons';
@import '~react-md/src/scss/components/inks';

@import '~react-md/src/scss/media-queries';

.md-primary {
  @include md-theme-buttons($md-primary-color);
}
```
