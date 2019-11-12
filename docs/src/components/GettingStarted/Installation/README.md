# Installation
react-md is available as an [npm package](https://www.npmjs.com/package/react-md).

You can install with:

```bash
$ npm install -S react react-dom react-md
```

Once installed, the components can be accessed by `react-md` or `react-md/lib` and the styles from `react-md/src/scss/_react-md.scss`.

### Fonts
The [Roboto font](https://www.google.com/fonts/specimen/Roboto) and 
[material-icons](https://design.google.com/icons/) should be included as well
(or some equivalent). These fonts can be included via [WebFontLoader](https://github.com/typekit/webfontloader)
or by locally hosting and using the provided Sass mixins to include them. See [host-material-icons](/customization/typography?tab=1#mixin-host-material-icons)
and [host-google-font](/customization/typography?tab=1#mixin-host-google-font) for more details.

### Examples
Please see the [examples folder](https://github.com/mlaursen/react-md/tree/v1/examples) for example project setups using
[create-react-app](https://github.com/facebook/create-react-app), [next.js](https://github.com/zeit/next.js/), webpack,
and others.

### UMD
react-md is also available as a UMD bundle. This can either be found in the `dist` folder or from [unpkg](https://unpkg.com).

```js
/* index.js */
const { Card, CardTitle, CardText, CardActions, Button } = window.ReactMD;

class App extends React.Component {
  render() {
    return (
      <div className="md-grid">
        <Card className="md-cell">
          <CardTitle title="Hello, World!" />
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
