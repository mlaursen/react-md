# @react-md/tooltip
Accessible tooltips for react-md following the [tooltip interactions](https://www.w3.org/TR/wai-aria-practices/#tooltip) specification from www.w3.org.

Tooltips are hooked up to other elements by connecting an `id` prop of the tooltip to an `aria-describedby` attribute on the container element for screenreader accessibility. If the tooltip can not find an element on the page with an `aria-describedby="TOOLTIP_ID"`, the tooltip will not work and an error will be thrown. For keyboard accessibility, make sure that your tooltip's container element is also focusable by tabbing (normally using a form control or adding `tabIndex={0}` should work) otherwise keyboard users will not be able to view tooltips.

The source code of this package can be found at: https://github.com/mlaursen/react-md/tree/release/2.0.x/packages/tooltip

## Installation
```sh
$ npm install --save @react-md/tooltip
```

## Usage
### Components
The `@react-md/tooltip` package exports 3 components:
- [Tooltip](#tooltip-example)
- [MagicTooltip](#magictooltip-example)
- [BaseTooltip](#basetooltip-example)

#### Tooltip Example
The `Tooltip` component is going to be the most used component within the package. It relies on the container element having `position: relative` set and can be positioned to the `top`, `right`, `bottom`, or `left` of it's container element with props.

```jsx
import { Tooltip } from '@react-md/tooltip';

const buttonStyle = { position: 'relative' };

const Examples = () => (
  <main role="main">
    <button id="button-1" aria-describedby="button-1-tooltip" type="button" style={buttonStyle}>
      Button
      <Tooltip id="button-1-tooltip">
        Amazing tooltip!
      </Tooltip>
    </button>
    {/* add tab-index so keyboard users can still view the tooltip */}
    <div tabIndex={0} id="div-1" aria-describedby="div-1-tooltip">
      Lorem ipsum ... adipiscing elit.
      <Tooltip id="div-1-tooltip" position="left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Tooltip>
    </button>
  </main>
);
```

#### MagicTooltip Example
The `MagicTooltip` component is a wrapper for the `Tooltip` component that is helpful for automagically determining the "best" location to render the tooltip relative to the viewport and the containing element. In addition, it should be used when there are overflow issues.

Unlike the `Tooltip` component, the container element *does not* need `position: relative` since the tolltip is `position: fixed` within the page.

```jsx
const Examples = () => (
  <main role="main">
    <div id="scroll-area" style={{ maxHeight: 200, height: 100000, overflow: 'auto', width: 180 }}>
      <button id="button-1" aria-describedby="button-1-tooltip" type="button">
        Button
        {/* A normal tooltip might not appear correctly in here because the scroll area has `overflow: auto` which will hide elements that appear outside of it will be hidden */}
        <MagicTooltip id="button-1-tooltip">
          Amazing tooltip!
        </MagicTooltip>
      </button>
    </div>
    <div tabIndex={0} id="div-1" aria-describedby="div-1-tooltip" style={{ overflow: "hidden", width: 100, height: 100 }}>
      Lorem ipsum ... adipiscing elit.
      {/* A normal Tooltip would not display here since there is `overflow: hidden` on the container element */}
      <MagicTooltip id="div-1-tooltip">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </MagicTooltip>
    </div>
  </main>
);
```

Since tooltips are based off of `aria-describedby` and `MagicTooltip`s are rendered in a separate DOM element, `MagicTooltip`s *do not* have to be direct children of the container element.

```jsx
const Example = () => (
  <main role="main">
    <div>Some content...</div>
    <div>
      Some more content with other stuff..
      <button id="button-1" aria-describedby="button-1-tooltip" type="button">
        Button
      </button>
    </div>
    <div>Some more content....</div>
    <MagicTooltip id="button-1-tooltip">
      Tooltip for button 1!
    </MagicTooltip>
  </main>
);
```

> Note: Even though it is possible to put the `MagicTooltip` anywhere in the DOM, it is still considered _best practice_ to have the `MagicTooltip` as a direct descendant of the container element to help debug.

#### BaseTooltip Example
If the two components above somehow do not meet your use cases, you can use the `BaseTooltip` component itself that will just handle rendering the tooltip based on the `visible` boolean prop and conditionally calling `onShow` and `onHide` when it determines that a tooltip should be shown.

```jsx
class Example extends React.Component {
  state = { visible: false };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <main role="main">
        <button id="button-1" role="button" onClick={this.toggle}>
          Show button-2's tooltip
        </button>
        <button id="button-2" type="button" aria-describedby="button-2-tooltip">
          Button 2
          <BaseTooltip
            id="button-2-tooltip"
            visible={this.state.visible}
            onShow={this.show}
            onHide={this.hide}
          >
            A tooltip that appears when button-1 is clicked or by normal tooltip behavior for button-2.
          </BaseTooltip>
        </button>
      </main>
    );
  }
}
```

### Styles
#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/tooltip`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

#### webpack
```diff
 {
   test: /\.scss$/,
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

Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-tooltip`:

#### Including Styles
```scss
// This import will generate styles by default.
@import '@react-md/tooltip/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/tooltip/dist/typography';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-tooltip;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/typography/dist/tooltip';

// Any custom styles that use the utilities
```
