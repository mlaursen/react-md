## Table of Contents
- [v2.0.0-alpha-1](#v200-alpha-1)
    + [Breaking Changes](#breaking-changes)
    + [Styling Changes](#styling-changes)
    + [New Features](#new-features)
    + [Removed Props](#removed-props)

# v2.0.0-alpha-1
The `Button` component was re-written from the ground up in typescript as well as adapting to the "newer"
material design specs for theming. This means that no additional props are required to render a button with
basic styles.

Quick example:
```diff
-<Button flat primary>Flat Button</Button>
+<Button>Flat Button</Button>
```

```diff
-<Button raised secondary>Raised Button</Button>
+<Button theme="secondary" themeType="contained">Raised Button</Button>
```

```diff
-<Button icon><FontIcon>home</FontIcon></Button>
+<Button theme="clear" btnType="icon"><FontIcon>home</FontIcon></Button>
```

```diff
-<Button floating primary><FontIcon>add</FontIcon></Button>
+<Button theme="primary" btnType="icon" themeType="contained"><FontIcon>add</FontIcon></Button>
```

### Breaking Changes
Buttons no longer have any of the `primary`, `secondary`, `flat`, `raised`, `floating`, or `icon` props; instead
the new styling props are `btnType`, `theme`, and `themeType`. In addition, buttons will now have a default state
of being rendered as text buttons so additional props are not required to get a styled button rendered.

Buttons no longer support rendering as links using the `href` prop. Instead, you should install
[@react-md/link](https://github.com/mlaursen/react-md/tree/next/packages/link) and use the new `Button.theme` function
to apply buttons styles to a link.

```tsx
import * as React from "react";
import { Buttom } from "@react-md/button";
import { Link, ILinkProps } from "@react-md/link";

const LinkButton: React.SFC<ILinkProps> = props => <Link {...props} className={Button.theme(props)} />;
export default LinkButton;
```

Buttons no longer use media queries to dynamically update the size for dense layouts. If you want to update your app to
be automatically "dense" on desktop, you should either use the `dense` prop on the component

Buttons no longer use the `injectInk` and `injectTooltip` higher order components. So if you were using refs before, you
won't need to do `ref.getComposedComponent().getComposedComponent()`.

### Styling Changes
Buttons were changed to be `display: inline-flex` instead of `display: inline-block`. This allows for easier positioning
by just using `align-items: center` and not require positioning with padding calculations. Because of this change, buttons
do not have top and bottom padding anymore.

Text buttons are now `36px` tall instead of `48px` because the min-width and height is accesible enough for touch devices
without the need for additional height.

### New Features
Buttons now can be rendered with an [outline spec](https://material.io/design/components/buttons.html#outlined-button)
as well as a new prop that will allow the button to be rendered as a `<div>` instead of a `<button>` when you need to
create more complex buttons that have `<div>`s in the children (this previously required the `AccessibleFakeButton` component).

The button now has four build in themes: "clear", "primary", "secondary", and "default" where only **one** can be enabled.
If you were using react-md in the past, "clear" is the equivalent of not enabling the `primary` and `secondary` props
while "primary" is equivalent to enabling the `primary` prop and "secondary" to enabling the `secondary` prop.

To help apply the button theme to other components (like links), the button how has a static `theme` function that accepts
the button props and returns the correct `className` to apply to an element.

### Removed Props
The `iconClassName`, `iconChildren`, `iconEl`, `forceIconSize`, `forceIconFontSize` and `svg` were removed. If you want to include
icons within the button, you should either set the `btnType="icon"` and use the `FontIcon`/`SVGIcon` component as a child or set
the `btnType="text"` and provide the `FontIcon`/`SVGIcon` as the `icon` prop to render an icon before or after the text.

The `iconBefore` prop was changed to be `iconAfter`. This will have the same default value of having the icon display before the
text.

The `component` prop was removed. If you want to render an element with button styles, you should use the `Button.theme` function on
your custom component instead.

The `swapTheming` was removed. The use case for this prop has been removed now that there is an outline spec and the new theming
props.

The `tooltipLabel`, `tooltipDelay`, and `tooltipPosition` were removed. Instead you should use [@react-md/tooltip](https://github.com/mlaursen/react-md/tree/next/packages/tooltip)
and manually include the `<Tooltip>` component yourself. This is because of the new support for "magic" tooltips that should only be
opt-in.

The `fixed` and `fixedPosition` props were removed for right now. Will be added back before v2 release.

The `mini` prop was removed for now. This will eventually be changed to be `dense` to match the naming scheme for other components.

