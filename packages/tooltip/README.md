# @react-md/tooltip
Accessible tooltips for react-md following the [tooltip interactions](https://www.w3.org/TR/wai-aria-practices/#tooltip) specification from www.w3.org.

Tooltips are hooked up to other elements by connecting an `id` prop of the tooltip to an `aria-describedby` attribute on the container element for screenreader accessibility. If the tooltip can not find an element on the page with an `aria-describedby="TOOLTIP_ID"`, the tooltip will not work and an error will be thrown. For keyboard accessibility, make sure that your tooltip's container element is also focusable by tabbing (normally using a form control or adding `tabIndex={0}` should work) otherwise keyboard users will not be able to view tooltips.

The source code of this package can be found at: https://github.com/mlaursen/react-md/tree/release/2.0.x/packages/tooltip

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  * [Components](#components)
    + [Tooltip Example](#tooltip-example)
    + [MagicTooltip Example](#magictooltip-example)
    + [BaseTooltip Example](#basetooltip-example)
  * [Styles](#styles)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
    + [Including Styles](#including-styles)
    + [Overriding default styles](#overriding-default-styles)
      - [Updating Default Variables](#updating-default-variables)
- [Prop Types](#prop-types)
  * [Tooltip](#tooltip)
  * [BaseTooltip](#basetooltip)
  * [MagicTooltip](#magictooltip)

<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/tooltip
```

Live examples and full documentation are yet to come. You can view the old documentation and examples at [the current documentation site](https://react-md.mlaursen.com/components/tooltips).

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
    {/* add tabindex so keyboard users can still view the tooltip */}
    <div id="div-1" aria-describedby="div-1-tooltip" role="button" tabIndex={0} style={buttonStyle}>
      Lorem ipsum ... adipiscing elit.
      <Tooltip id="div-1-tooltip" position="left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Tooltip>
    </div>
  </main>
);
```

#### MagicTooltip Example
The `MagicTooltip` component is a wrapper for the `Tooltip` component that is helpful for automagically determining the "best" location to render the tooltip relative to the viewport and the containing element. In addition, it should be used when there are overflow issues.

Unlike the `Tooltip` component, the container element **does not** need `position: relative` since the tooltip is `position: fixed` within the page.

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
    <div id="div-1" aria-describedby="div-1-tooltip" role="button" tabIndex={0} style={{ overflow: "hidden", width: 100, height: 100 }}>
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

> Note: Even though it is possible to put the `MagicTooltip` anywhere in the DOM, it is still considered _best practice_ to have the `MagicTooltip` as a direct descendant/child of the container
for logical grouping and sanity.

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

#### Including Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-tooltip`:

```scss
// This import will generate styles by default.
@import '@react-md/tooltip/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/tooltip/dist/tooltip';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-tooltip;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/tooltip/dist/tooltip';

// Any custom styles that use the utilities
```

#### Overriding default styles
It is possible to override the default styles by either:
- overriding the default variables
- excluding the `@include react-md-tooltip` mixin and defining all styles manually


##### Updating Default Variables
It is possible to update _some_ of the default styles for tooltips with the following variables:
- `$md-tooltip-background-color`
- `$md-tooltip-text-color`
- `$md-tooltip-transition-time`
- `$md-tooltip-z-index`
- `$md-tooltip-font-size`
- `$md-tooltip-min-height`
- `$md-tooltip-lr-padding`
- `$md-tooltip-line-wrap-tb-padding`
- `$md-tooltip-spacing`
- `$md-tooltip-dense-font-size`
- `$md-tooltip-dense-min-height`
- `$md-tooltip-dense-lr-padding`
- `$md-tooltip-dense-line-wrap-tb-padding`
- `$md-tooltip-dense-spacing`

These overrides **must** be defined before importing the `@react-md/tooltip/dist/styles` or `@react-md/tooltip/dist/toolip` files.

Example:

```scss
$md-tooltip-background-color: orange;
$md-tooltip-text-color: black;

@import '@react-md/tooltip/dist/tooltip';

@include react-md-tooltip;
```

<!-- PROPS_START -->
## Prop Types
### Tooltip


> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
<tr>
</thead>
<tbody>
<tr>
<td>children</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
The contents of the tooltip to display. This can be any renderable element, but this is normally
just text.
</td>
</tr>
<tr>
<td>id *</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An id for the tooltip. This is required for accessibility and finding an element to attach
event listeners to show and hide the tooltip.
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style to apply to the tooltip.
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional class name to apply to the tooltip.
</td>
</tr>
<tr>
<td>delay</td>
<td><code>number</code></td>
<td><code>0</code></td>
<td>
An optional delay before showing the tooltip when the user focuses or moves the mouse into the tooltip's container.
</td>
</tr>
<tr>
<td>dense</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the dense styles for tooltips should be displayed.
</td>
</tr>
<tr>
<td>lineWrap</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the tooltip should allow line wrapping. This is disabled by default since the tooltip
will display weirdly when its container element is small in size. It is advised to only enable
line wrapping when there are long tooltips or the tooltips are bigger than the container element.
<br /><br />
Once line wrapping is enabled, you will most likely need to set some additional padding and widths.
</td>
</tr>
</tbody>
</table>


### BaseTooltip
The `BaseTooltip` component is just used to display the tooltip whenever the visible prop is enabled.
It will add the event listeners to the tooltip's container and conditionally call the `onShow` and
`onHide` props when needed. This should really only be used internally, but can also be used for custom
tooltip implementations.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
<tr>
</thead>
<tbody>
<tr>
<td>children</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
The contents of the tooltip to display. This can be any renderable element, but this is normally
just text.
</td>
</tr>
<tr>
<td>visible *</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the tooltip should be visible or not. When this prop changes state, the tooltip animation
for entering or leaving will start.
</td>
</tr>
<tr>
<td>onShow *</td>
<td><code>(container: HTMLElement) => void</code></td>
<td><code>null</code></td>
<td>
A function that will update the <code>visible</code> prop to <code>true</code>.
</td>
</tr>
<tr>
<td>onHide *</td>
<td><code>() => void</code></td>
<td><code>null</code></td>
<td>
A function that will update the <code>visible</code> prop to be <code>false</code>.
</td>
</tr>
<tr>
<td>position</td>
<td><code>"top" | "right" | "bottom" | "left"</code></td>
<td><code>bottom</code></td>
<td>
The position of the tooltip to use.
</td>
</tr>
<tr>
<td>id *</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An id for the tooltip. This is required for accessibility and finding an element to attach
event listeners to show and hide the tooltip.
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style to apply to the tooltip.
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional class name to apply to the tooltip.
</td>
</tr>
<tr>
<td>delay</td>
<td><code>number</code></td>
<td><code>0</code></td>
<td>
An optional delay before showing the tooltip when the user focuses or moves the mouse into the tooltip's container.
</td>
</tr>
<tr>
<td>dense</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the dense styles for tooltips should be displayed.
</td>
</tr>
<tr>
<td>lineWrap</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the tooltip should allow line wrapping. This is disabled by default since the tooltip
will display weirdly when its container element is small in size. It is advised to only enable
line wrapping when there are long tooltips or the tooltips are bigger than the container element.
<br /><br />
Once line wrapping is enabled, you will most likely need to set some additional padding and widths.
</td>
</tr>
</tbody>
</table>


### MagicTooltip
The `MagicTooltip` component is a helpful wrapper of the `Tooltip` component that will automagically determine
the "best" `position` to render the tooltip in based on the current position of the tooltip's container. In addition,
it will create a portal for the tooltip to be rendered in so that the tooltips will not be hidden by overflow issues.

This will be a little bit less performant than the `Tooltip` component since it will have to do run-time calculations
to position, but it isn't _too_ bad. It is still preferred to use the `Tooltip` component in most cases.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
<tr>
</thead>
<tbody>
<tr>
<td>children</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
The contents of the tooltip to display. This can be any renderable element, but this is normally
just text.
</td>
</tr>
<tr>
<td>spacing</td>
<td><code>string | number</code></td>
<td><code>1.5rem</code></td>
<td>
The spacing between the tooltip and the tooltip's container element. This should be the value
of <code>$md-tooltip-spacing</code> set in SCSS.
</td>
</tr>
<tr>
<td>denseSpacing</td>
<td><code>string | number</code></td>
<td><code>0.875</code></td>
<td>
The spacing between the tooltip and the tooltip's container element when the <code>dense</code> prop is enabled.
This should be the value of <code>$md-tooltip-dense-spacing</code>.
</td>
</tr>
<tr>
<td>isDenseBasedOnMediaQuery</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
You might want to update the <code>Tooltip</code> so that it automatically becomes <code>dense</code> when viewing the website
on desktop deisplays using media queries. To help position the tooltip "automagically", this flag will need
to be enabled to calculate the current spacing of a tooltip.
<br /><br />
This is a little bit less performant than enabling the <code>dense</code> spec through props since it will need to create
a temporary tooltip on the page to calculate the spacing before rendering the tooltip.
</td>
</tr>
<tr>
<td>viewportThreshold</td>
<td><code>number</code></td>
<td><code>0.03</code></td>
<td>
This prop is to help position the <code>Tooltip</code> within the viewport based on the tooltip's container element. When this
value is less than <code>1</code>, it will be used as a viewport multiplier. If it is greater than <code>1</code>, it will be <code>x</code> number
of pixels from the edge of the viewport.
<br /><br />

Multiplier Example:
```js
const viewportThreshold = 0.03;
const isOutOfBoundsLeft = container.left < (viewportWidth * viewportThreshold);
const isOutOfBoundsBottom = container.top < (viewportHeight = (viewportHeight * viewportThreshold));
```

Pixel Example:
```js
const viewportThreshold = 20;
const isOutOfBoundsLeft = container.left < viewportThreshold;
const isOutOfBoundsBottom = container.top < (viewportHeight - viewportThreshold);
```
</td>
</tr>
<tr>
<td>portalContainerId</td>
<td><code>string</code></td>
<td><code>tooltip-container</code></td>
<td>
To help with automation testing(like Selenium) and to make the DOM "prettier", all the tooltips will be rendere
within a container element instead of the default last child in the <code>document.body</code>. If an element does not exist
in the DOM with this id, it will be created <b>client side only</b>.
</td>
</tr>
<tr>
<td>id *</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An id for the tooltip. This is required for accessibility and finding an element to attach
event listeners to show and hide the tooltip.
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style to apply to the tooltip.
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional class name to apply to the tooltip.
</td>
</tr>
<tr>
<td>delay</td>
<td><code>number</code></td>
<td><code>0</code></td>
<td>
An optional delay before showing the tooltip when the user focuses or moves the mouse into the tooltip's container.
</td>
</tr>
<tr>
<td>dense</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the dense styles for tooltips should be displayed.
</td>
</tr>
<tr>
<td>lineWrap</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the tooltip should allow line wrapping. This is disabled by default since the tooltip
will display weirdly when its container element is small in size. It is advised to only enable
line wrapping when there are long tooltips or the tooltips are bigger than the container element.
<br /><br />
Once line wrapping is enabled, you will most likely need to set some additional padding and widths.
</td>
</tr>
</tbody>
</table>


<!-- PROPS_END -->
