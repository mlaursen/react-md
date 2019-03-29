Icon Buttons are great when you have limited space and an icon that is well
known/self-describing. Common places for icon buttons are within the
[app bar](/packages/app-bar) or as expansion toggles. You will need to install
the [@react-md/icon](/packages/icon) and include the styles for icons for these
types of buttons. It is also recommended to install the
[@react-md/material-icons](/packages/material-icons) package for all the
material icons pre-built as React components.

Unfortunately, icon buttons are not as accessible out of the box for screen
readers as they normally do not have text within them.
[Material Icons](https://design.google.com/icons/) is an exemption to this since
their font icons are rendered based on the text content, but other font icon
libraries or SVG icons normally do not have text for a screen reader to read. In
these cases, you should apply an `aria-label`, `aria-labelledby`, `title`, or
use a [tooltip](/packages/tooltip).
