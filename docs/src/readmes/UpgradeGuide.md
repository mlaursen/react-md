Table of Contents
=================

* [Upgrading from 0.3.x to 0.4.x](#upgrading-from-0-3-x-to-0-4-x)
  * [SCSS and Styling Changes](#scss-and-styling-changes)
    * [Now vs Previous Versions](#now-vs-previous-versions)
    * [Typography](#typography)
  * [Buttons](#buttons)
  * [Text Fields](#text-fields)
    * [Controllable States](#controllable-states)
    * [Labels](#labels)
  * [Ink](#ink)
* [Upgrading from 0.2.x to 0.3.x](#upgrading-from-0-2-x-to-0-3-x)
  * [NavigationDrawer](#navigationdrawer)
    * [Responsive Drawer Changes](#responsive-drawer-changes)
    * [onDrawerChange](#ondrawerchange)

## Upgrading from 0.3.x to 0.4.x

### SCSS and Styling
The className naming methodology was changed to [BEM](http://getbem.com/) with this release, so if
there were any custom css targeting `.md-` classNames, it is probably broken now. Woo! This change
was done so that custom styling can be done easier. It is now just the order the css is defined, a
media query, one level nesting, one joined selector, or applying a selector to an html element. 

The styles are now not included by default and each component has a mixin for including the css, media
queries, or theming. If you want the old behavior, use the `react-md-everything` mixin and the
`react-md-theme-everything` mixin. Each media query will be included by default when a component's
mixin is called if the `$md-media-included` variable is `true`. If you set this to false, you can
manually call the `react-md-COMPONENT-mobile`, `react-md-COMPONENT-desktop`, or `react-md-COMPONENT-media`
mixin to define them manually.

##### Now vs Previous Versions
```scss
/* v0.4.x */
@import '~react-md/src/scss/react-md';

// set any globals
@include react-md-everything; // all css generated

// or specific components only
@import '~react-md/src/scss/react-md';

@include react-md-text-fields;
@include react-md-dividers;

/* v0.3.x */

// set any globals
@import '~react-md/src/scss/react-md'; // all css generated

// or specific components...

@import '~react-md/src/scss/components/text-fields';
@import '~react-md/src/scss/components/dividers';
```

#### Typography
Typography will now extend the base `html` tags by default when included. You can disable this behavior
be setting the `$md-typography-extended` variable to `false`;

### Buttons
The `FlatButton`, `RaisedButton`, `IconButton`, and `FloatingButton` have been deprecated and will
be removed in the following release. All four types will now be in a single `Button` component. Each
version can be use by passing the correct flag: `flat`, `raised`, `icon`, or `floating`. The `FlatButton`
and `RaisedButton` no longer take in `FontIcon` as children. Instead, they reuse the `children` and `iconClassName`
props similar to the `IconButton` and `FloatingButton`.

```js
/* before */
<RaisedButton label="Hello" />

/* after */
<Button raised label="Hello" />
```


### Text Fields
The `TextField` component got rewritten from the ground up so there is no helpful migration messages.

- The height for the `TextField` is now handled by margins instead of specifically stating the height
for the `.md-text-field`. This allows for password managers (like LastPass) to more accuraly inject the
background image. It was bothering me that it was not placed in the correct spot. But it does overlap
with the password toggle now. Bleh.
- The `multiline TextField` now animates on height change.
- The `id` prop is now required for a11y.
- `icon` prop no longer exists. It got replaced with `leftIcon` and `rightIcon`.
- The `active`, `error`, and `floating` states can be influenced.
- Custom sized text fields were redone. It is now a `customSize` prop and mixin.
- Labels got redone
- New `focus` and `getField` ref methods to either focus the text field or get the `input`/`textarea`
tags easily from the text field.

#### Controllable States
The `active`, `error`, and `floating` states for the text field can be influenced by props. This
will allow the state to either be `true` if the prop is true or the internal state is `true`. Setting
this prop to `false` will have no effect. This allows for additional state helping if clicking on
a text field opens up a dialog for example. The text field should still be `active` at that point.

The `leftIcon` and `rightIcon` can gain the `active` or `error` states when their stateful prop
is set to true (default).

#### Labels
The `floatingLabel` prop is no longer used. if the `label` prop is defined, the `TextField` will
use a floating label. This means if you do not want the floating label `TextField`, you must use
the `placeholder` prop instead. In addition, the `block` styling will need to use the `placeholder`
prop instead of the `label` prop.

### Ink
The `injectInk` HOC no longer injects an `ink` prop into the composed component. It handles the ink
automagically now by injecting in as the first child. So there is a bit less control of where the ink
goes.

### Tooltips
The `injectTooltip` HOC no longer injects a `tooltip` prop into the composed component. It handles the
tooltip automagically now by injeting a container as the first child. There is a bit less controll of
where the tooltip goes. It also requires your main component to have `position: relative;`.

## Upgrading from 0.2.x to 0.3.x

### NavigationDrawer
The `NavigationDrawer` component was redone to respond to different device sizes better.

Some of the required changes:

- `isOpen` - Has been removed.  See [onDrawerChange](#ondrawerchange) for new functionality.
- `style` - Has been renamed to `drawerStyle` to better match existing naming conventions.
- `className` - Has been renamed to `drawerClassName` to better match existing naming conventions.
- `containerStyle` - Has been renamed to `style` to better match existing naming conventions.
- `containerClassName` - Has been renamed to `className` to better match existing naming conventions.
- `title` - Has been renamed to `drawerTitle` to be more specific.
- `openDrawer` - Has been removed. See [onDrawerChange](#ondrawerchange) for new functionality.
- `closeDrawer` - Has been removed. See [onDrawerChange](#ondrawerchange) for new functionality.
- `drawerType` - Has been removed. See [Responsive Drawer Changes](#respnsive-drawer-changes) for new functionality.
- `navHeader` - Has been removed.
- `navHeaderChildren` - Has been renamed to `drawerChildren` for clarity.
- `autoclose` - New boolean prop that will automatically close the drawer on the temporary drawer types when a nav item is clicked if this is set to `true`.

#### Responsive Drawer Changes
The `drawerType` prop has been removed so that there is now a specific drawer type
at different media sizes.

Six props: `mobileDrawerType`, `mobileMinWidth`, `tabletDrawerType`, `tabletMinWidth`, `desktopDrawerType`, and `desktopMinWidth`
have been created to help with the media flows.

The mobile drawer type can only be temporary or temporary mini, while the tablet and desktop
drawer types can be any varient.

The `mobileDrawerType` will be chosen if the `mobileMinWidth` matches in the media query
and the max width is less than `desktopMinWidth - 1`.

The `tabletDrawerType` will be used if the `tabletMinWidth` matches in the media query
and the max width is less than `desktopMinWidth - 1` and the device orientation is `landscape`.
If the device orientation, the `mobileDrawerType` will be used instead.

The `desktopDrawerType` will be used if the media query matches the `desktopMinWidth`.

There is also a new prop: `initialDrawerType` that will help with Server Side Rendering. This should either be `'mobile'`, `'tablet'`, or `'desktop'`. It will then set the drawer type to the corresponding drawer type on initial render. (Before it always rendered the desktop until it was fully mounted). This new prop should be used along with the `initiallyOpen` prop to render the mobile devices correctly without forcing the menu to open and close initially.


#### onDrawerChange

Definition: `onDrawerChange(isDrawerOpen)`

Since the `openDrawer` and `closeDrawer` props were removed, you can get the current
drawer open state by adding a `onDrawerChange` prop. This function will give you
a boolean for the next open state of the drawer. It will be triggered when a media
resize happens that changes the open state, or when the user toggles it for a temporary
or persistent drawer.
