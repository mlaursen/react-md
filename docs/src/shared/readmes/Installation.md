# Installation
react-md is available as an [npm package](https://www.npmjs.com/package/react-md).

You can install with:

```bash
$ npm install -S react \
                 react-dom \
                 react-addons-transition-group \
                 react-addons-css-transition-group \
                 react-md
```

Once installed, the components can be accessed by `react-md` or `react-md/lib` and the styles from `react-md/src/scss/_react-md.scss`.

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
@import '~react-md/src/scss/react-md';

// Include all components
@include react-md-everything;

// Or only a few
@include react-md-typography;
@include react-md-grid;
@include react-md-buttons;
```

### UMD
react-md is also available as a UMD bundle. This can either be found in the `dist` folder or from [unpkg](https://unpkg.com).

```js
/* index.js */
import { Card, CardTitle, CardText, CardActions, Button } from ReactMD;

class App extends React.Component {
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

ReactDOM.render(document.getElementById('app'), <App />);
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head><link rel="stylesheet" href="https://unpkg.com/react-md/dist/react-md.indigo-pink.min.css"></head>
  <body>
    <script src="https://unpkg.com/react/dist/react.min.js"></script>
    <script src="https://unpkg.com/react-dom/dist/react-dom.min.js"></script>
    <script src="https://unpkg.com/react-addons-css-transition-group/dist/react-addons-css-transition-group.min.js"></script>
    <script src="https://unpkg.com/react-addons-transition-group/dist/react-addons-transition-group.min.js"></script>
    <script src="https://unpkg.com/react-md/dist/react-md.min.js"></script>
    <script src="/bundle.js"></script>
  </body>
</html>
```
