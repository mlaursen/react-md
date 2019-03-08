# Text Buttons

Text buttons are generally used when an action is less important or should not
be the user's main focus. Good places for these types of buttons can be
[dialogs](/packages/dialog) are [cards](/packages/card).

# Outlined Buttons

Outline buttons have a bit more emphasis than text buttons since they have an
additional outline color. They should generally be used in places that aren't
the primary action in the app, but should still be noticeable.

# Contained Buttons

Contained buttons have high emphasis as they have an entire color fill and
shadow. Note that the `clear` prop still works for a contained button but looks
extremely out of place most of the time since it just gains the `surface` theme
background color. It is generally recommended to not use the `clear` theme for
contained buttons or add a custom theme override for it instead.

# Icon Buttons

Icon Buttons are great when you have limited space and an icon that is well
known/self-describing. Common places for icon buttons are within the #app-bar or
as expansion toggles. You will need to install the #icon and include the styles
for icons for these types of buttons. It is also recommended to install the
#material-icons package for all the material icons pre-built as React
components.

Unfortunately, icon buttons are not ass accessible out of the box for screen
readers as they normally do not have text within them.
[Material Icons](https://design.google.com/icons/) is an exemption to this since
their font icons are rendered based on the text content, but other font icon
libraries or SVG icons normally do not have text for a screen reader to read. In
these cases, you should apply an `aria-label`, `aria-labelledby`, `title`, or
use a #tooltip.

# Text Buttons with Icons

When you have the additional room, it is also possible to render icons with text
within buttons.

# Custom Button Theme

Since it might not be desired to have the same material design theme for your
app, it is possible to update the base button theme by updating the different
button SCSS variables before importing and including the button styles. If you
have not done so, please read the pretty good write up in the
[theme documentation](/packages/theme#custom-theme) for all the detailed theming
information. It's also recommended to read the
[states documentation](/packages/states) to read about disable the ripple effect
or custom interaction states as well.
