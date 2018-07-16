# @react-md/listeners
This package is for handling resize events either for the entire page or elements within the page. The exported
two components are the `ResizeListener` and the `ResizeObserver` where the `ResizeListener` is used to create
throttled window resize events that also fixes some of the [mobile inconsistencies](https://www.quirksmode.org/dom/events/resize_mobile.html) and
the `ResizeObserver` is used to listen to a single element's resizing.

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/resize

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  * [ResizeListener](#resizelistener)
    + [Using onResize](#using-onresize)
    + [Using children](#using-children)
  * [ResizeObserver](#resizeobserver)
    + [Using onResize](#using-onresize-1)
    + [Using children](#using-children-1)
- [Prop Types](#prop-types)
  * [ResizeListener](#resizelistener-1)
  * [ResizeObserver](#resizeobserver-1)
  * [EventListener](#eventlistener)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/listeners
```

## Usage
### ResizeListener
The `ResizeListener` is mostly used to handle full viewport updates or layout changes. The biggest example would be
to determine if your app is running in mobile, tablet, or desktop view.

#### Using onResize
```tsx
import * as React from "react";
import { ResizeListener } from "@react-md/listeners";

export interface ILayoutState = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

export default class Layout extends React.Component<{}, ILayoutState> {
  constructor() {
    // "mobile first" . . . . (ha ha)
    this.state = { mobile: true, tablet: false, desktop: false };
  }

  determineLayoutType = () => { ... };

  handleResize = () => {
    const { mobile, tablet, desktop } = this.determineLayoutType();
    if (mobile !== this.state.mobile || tablet !== this.state.tablet || desktop !== this.state.desktop) {
      this.setState({ mobile, tablet, desktop });
    }
  }

  render() {
    const { mobile, tablet, desktop } = this.props;
    return (
      <React.Fragment>
        <ResizeListener onResize={this.determineLayoutType} />
        {mobile && <MobileOnlyView />}
        {tablet && <TabletOnlyView />}
        {desktop && <DesktopOnlyView />}
      </React.Fragment>
    );
  }
}
```

#### Using children
```tsx
import * as React from "react";
import { ResizeListener } from "@react-md/listeners";

export interface ILayoutState = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

function determineLayoutType(): ILayoutState { ... }

const Layout: React.SFC<any> = () => (
  <ResizeListener>
    {() => {
      const { mobile, tablet, desktop } = determineLayoutType();
      return (
        <React.Fragment>
          {mobile && <MobileOnlyView />}
          {tablet && <TabletOnlyView />}
          {desktop && <DesktopOnlyView />}
        </React.Fragment>
      )
    }}
  </ResizeListener>
);

export default Layout;
```

### ResizeObserver
The `ResizeObserver` is used to listen to specific element resizing and then doing additional logic. The following example will just watch
a div's width change and output those changes into a table.

#### Using onResize
```tsx
import * as React from "react";
import { ResizeObserver } from "@react-md/listeners";

export interface IExampleState {
  style: React.CSSProperties;
}

export default class Example extends React.Component<{}, IExampleState> {
  private el: null | Element;
  private interval?: number;

  constructor(props) {
    super(props);

    this.state = {
      style: { maxHeight: 100, maxWidth: 150 },
      height: 100,
      width: 150,
    };
    this.el = null;
  }

  public componentDidMount() {
    this.interval = window.setInterval(this.createRandomSize, 3000);
  }

  public componentWillUnmount {
    window.clearInterval(this.interval);
  }

  public render() {
    const { style, height, width } = this.state;

    return (
      <div id="example-container" style={style}>
        <ResizeObserver target="example-container" onResize={this.handleResize}>
        <table>
          <tbody>
            <tr>
              <th scope="row">height:</th>
              <td>{height}</td>
            </tr>
            <tr>
              <th scope="row">width:</th>
              <td>{width}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  private createRandomSize = () => {
    // random size between 100px and 500px
    const maxHeight = Math.floor(Math.random() * 500) + 100;
    // random size between 100px and 500px (or element's parent's max width)
    const maxWidth = Math.floor(Math.random() * this.el ? this.el.parentElement.offsetWidth : 500) + 100;

    this.setState({ style: { maxHeight, maxWidth } });
  };

  private handleResize = ({ height, width, el }) => {
    this.el = el;

    this.setState({ height, width });
  };
}
```

#### Using children
```tsx
import * as React from "react";
import { ResizeObserver } from "@react-md/listeners";

export interface IExampleState {
  style: React.CSSProperties;
}

export default class Example extends React.Component<{}, IExampleState> {
  private el: null | Element;
  private interval?: number;

  constructor(props) {
    super(props);

    this.state = {
      style: { maxHeight: 100, maxWidth: 150 },
    };
    this.el = null;
  }

  public componentDidMount() {
    this.interval = window.setInterval(this.createRandomSize, 3000);
  }

  public componentWillUnmount {
    window.clearInterval(this.interval);
  }

  public render() {
    const { style, height, width } = this.state;

    return (
      <div id="example-container" style={style}>
        <ResizeObserver target="example-container">
        {({ height, width, el }) => {
          this.el = el;

          return (
            <table>
              <tbody>
                <tr>
                  <th scope="row">height:</th>
                  <td>{height}</td>
                </tr>
                <tr>
                  <th scope="row">width:</th>
                  <td>{width}</td>
                </tr>
              </tbody>
            </table>
          );
        }}
        </ResizeObserver>
      </div>
    );
  }

  private createRandomSize = () => {
    // random size between 100px and 500px
    const maxHeight = Math.floor(Math.random() * 500) + 100;

    // random size between 100px and 500px (or element's parent's max width)
    const maxWidth = Math.floor(Math.random() * this.el ? this.el.parentElement.offsetWidth : 500) + 100;

    this.setState({ style: { maxHeight, maxWidth } });
  };
}
```


<!-- PROPS_START -->
## Prop Types
### ResizeListener


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
<td>children *</td>
<td><code>(() => ReactNode) | (string & (() => ReactNode)) | (number & (() => ReactNode)) | (true & (() => ...</code></td>
<td><code>null</code></td>
<td>
An optional children callback function that will be called after each successful resize event.
This method isn&#39;t quite as preferred as using the <code>onResize</code> prop, but it can be done.
<br /><br />
Either the <code>onResize</code> or <code>children</code> prop is required, but both should <b>not</b> be used at the same time.
<br /><br />
</td>
</tr>
<tr>
<td>onResize *</td>
<td><code>((e: Event) => void) | ((event: Event) => void)</code></td>
<td><code>null</code></td>
<td>
The function to call when the throttled resize event has been triggered. Either this or a children
callback function is required to work, but this is the &#34;preferred&#34; way of handling resizes since you
might need to do additional checks before re-rendering children.
<br /><br />
Either the <code>onResize</code> or <code>children</code> prop is required, but both should <b>not</b> be used at the same time.
<br /><br />
</td>
</tr>
<tr>
<td>touchDelay *</td>
<td><code>number</code></td>
<td><code>800</code></td>
<td>
This is the duration between a touchmove event and a resize event that will consider the
resize event valid. Some mobile browsers will incorrectly trigger a resize event when the user
touches the page and scrolls because fixed toolbars move within the viewport.
<br /><br />
</td>
</tr>
<tr>
<td>scrollDelay *</td>
<td><code>number</code></td>
<td><code>800</code></td>
<td>
This is the duration between a scroll event and a resize event that will consider the
resize event valid. Some mobile browsers will incorrectly trigger a resize event when
the page scrolls because the fixed toolbars move within the viewport.
<br /><br />
</td>
</tr>
<tr>
<td>fixTouches *</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if the resize listener should also be updated so that it is not triggered incorrectly
by iOS devices when the user scrolls the page.
<br /><br />
</td>
</tr>
<tr>
<td>fixScrolls *</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if the resize listener should also be updated so that it does not trigger incorrectly
by page scrolls.
<br /><br />
</td>
</tr>
</tbody>
</table>


### ResizeObserver


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
<td>children *</td>
<td><code>((options: IResizeObserverResizeOptions) => ReactNode) | (string & ((options: IResizeObserverResi...</code></td>
<td><code>null</code></td>
<td>
An optional render function to call when the target element resizes. This will only be called
once the sizing of the element changes, so this might block child updates.
<br /><br />
Either the <code>onResize</code> or <code>children</code> prop is required, but both should <b>not</b> be used at the same time.
<br /><br />
</td>
</tr>
<tr>
<td>onResize *</td>
<td><code>((options: IResizeObserverResizeOptions) => void) | ((options: IResizeObserverResizeOptions) => v...</code></td>
<td><code>null</code></td>
<td>
An optional function to call when the target element resizes. The callback will
include the new dimensions of the target element as well as the target element itself.
<br /><br />
NOTE: It is possible for this to be called with a <code>null</code> element and all dimensions set to <code>0</code>,
so make sure to check for &#34;valid&#34; values before updating elements with these sizes. It <i>should</i> only
be <code>null</code> and <code>0</code> before a correct <code>target</code> is initialized.
<br /><br />
Either the <code>onResize</code> or <code>children</code> prop is required, but both should <b>not</b> be used at the same time.
<br /><br />
</td>
</tr>
<tr>
<td>watchHeight *</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if the height should be watched for the resize target.
<br /><br />
</td>
</tr>
<tr>
<td>watchWidth *</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if the width should be watched for the resize target.
<br /><br />
</td>
</tr>
<tr>
<td>target *</td>
<td><code>string | Element | null</code></td>
<td><code>null</code></td>
<td>
The target for the resize observer. This can either a <code>document.querySelector</code> string,
an <code>Element</code>, or <code>null</code>. If the target is <code>null</code>, the resize observer will not be started
until it is switched to a valid <code>Element</code> or query selector.
<br /><br />
</td>
</tr>
</tbody>
</table>


### EventListener


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

</tbody>
</table>


<!-- PROPS_END -->

