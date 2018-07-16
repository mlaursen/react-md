# @react-md/a11y
This package is for adding accessibility helper components to match specific specs from W3C.

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/a11y

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  * [KeyboardClickable](#keyboardclickable)
- [Prop Types](#prop-types)
  * [KeyboardClickable](#keyboardclickable-1)
  * [ListRole](#listrole)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/a11y
```

## Usage
### KeyboardClickable
```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { KeyboardClickable, IKeyboardClickableProps } from "@react-md/a11y";

type IKeyboardClickableDivProps = IKeyboardClickableProps & React.HTMLAttributes<HTMLDivElement>;

const KeyboardClickableDiv: React.SFC<IKeyboardClickableDivProps> = ({
  className,
  tabIndex,
  onKeyUp,
  onBlur,
  onFocus,
  onClick,
  onMouseUp,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  ...props
}) => (
  <KeyboardClickable
    className={className}
    tabIndex={tabIndex}
    onKeyUp={onKeyUp}
    onBlur={onBlur}
    onFocus={onFocus}
    onClick={onClick}
    onMouseUp={onMouseUp}
    onMouseDown={onMouseDown}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    {(clickableProps) => <div {...props} {...clickableProps} />}
  </KeyboardClickable>
);

const App = () => (
  <main>
    <KeyboardClickableDiv onClick={() => console.log("I was clicked!")}>
      This div can be clicked and keyboard focused.
    </KeyboardClickableDiv>
    <KeyboardClickableDiv onClick={() => console.log("I was clicked!")} disabled={true} />
      This div cannot be clicked and keyboard focused until the disabled prop is set to false.
    </KeyboardClickableDiv>
  </main>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```

<!-- PROPS_START -->
## Prop Types
### KeyboardClickable


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
<td><code>((options: IKeyboardClickableChildrenOptions) => ReactNode) | (string & ((options: IKeyboardClick...</code></td>
<td><code>null</code></td>
<td>
A children renderer function that takes in the &#34;new&#34; props and applies them to the correct element that
should gain the clickable events and role.
<br /><br />
</td>
</tr>
<tr>
<td>disabled</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the clickable element is disabled. When this is enabled, the keydown event handler and
tabIndex will be updated to be <code>undefined</code> to prevent focus or clicks.
<br /><br />
</td>
</tr>
<tr>
<td>tabIndex</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
The tab index for the clickable element. This needs to be a number greater than or equal to <code>0</code> if
the element should be focusable by the <code>Tab</code> key. If this element is only focusable by &#34;programmatic&#34;
events, this value should be <code>-1</code>.
<br /><br />
</td>
</tr>
<tr>
<td>role</td>
<td><code>"button" | "menuitem" | "option"</code></td>
<td><code>button</code></td>
<td>
The role that the clickable element should take on. This defaults to a &#34;button&#34; role.
<br /><br />
</td>
</tr>
<tr>
<td>onKeyDown</td>
<td><code>KeyboardClickableKeyboardListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>keydown</code> event handler. This will be called when the built-in <code>keydown</code> handler is called.
<br /><br />
</td>
</tr>
<tr>
<td>onKeyUp</td>
<td><code>KeyboardClickableKeyboardListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>keyup</code> event listener. Nothing within the <code>KeyboardClickable</code> component uses this function, but
it can be provided so that when <code>disabled</code>, this will be <code>undefined</code> so it is not applied to the
child element when disabled.
<br /><br />
</td>
</tr>
<tr>
<td>onBlur</td>
<td><code>KeyboardClickableFocusListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>blur</code> event listener. Nothing within the <code>KeyboardClickable</code> component uses this function, but
it can be provided so that when <code>disabled</code>, this will be <code>undefined</code> so it is not applied to the
child element when disabled.
<br /><br />
</td>
</tr>
<tr>
<td>onFocus</td>
<td><code>KeyboardClickableFocusListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>focus</code> event listener. Nothing within the <code>KeyboardClickable</code> component uses this function, but
it can be provided so that when <code>disabled</code>, this will be <code>undefined</code> so it is not applied to the
child element when disabled.
<br /><br />
</td>
</tr>
<tr>
<td>onMouseDown</td>
<td><code>KeyboardClickableMouseListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>mousedown</code> event listener. Nothing within the <code>KeyboardClickable</code> component uses this function, but
it can be provided so that when <code>disabled</code>, this will be <code>undefined</code> so it is not applied to the
child element when disabled.
<br /><br />
</td>
</tr>
<tr>
<td>onMouseUp</td>
<td><code>KeyboardClickableMouseListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>mouseup</code> event listener. Nothing within the <code>KeyboardClickable</code> component uses this function, but
it can be provided so that when <code>disabled</code>, this will be <code>undefined</code> so it is not applied to the
child element when disabled.
<br /><br />
</td>
</tr>
<tr>
<td>onClick</td>
<td><code>KeyboardClickableMouseListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>click</code> event listener. Nothing within the <code>KeyboardClickable</code> component uses this function, but
it can be provided so that when <code>disabled</code>, this will be <code>undefined</code> so it is not applied to the
child element when disabled.
<br /><br />
</td>
</tr>
<tr>
<td>onTouchStart</td>
<td><code>KeyboardClickableTouchListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>touchstart</code> event listener. Nothing within the <code>KeyboardClickable</code> component uses this function, but
it can be provided so that when <code>disabled</code>, this will be <code>undefined</code> so it is not applied to the
child element when disabled.
<br /><br />
</td>
</tr>
<tr>
<td>onTouchEnd</td>
<td><code>KeyboardClickableTouchListener</code></td>
<td><code>null</code></td>
<td>
An optional <code>touchend</code> event listener. Nothing within the <code>KeyboardClickable</code> component uses this function, but
it can be provided so that when <code>disabled</code>, this will be <code>undefined</code> so it is not applied to the
child element when disabled.
<br /><br />
</td>
</tr>
</tbody>
</table>


### ListRole


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

