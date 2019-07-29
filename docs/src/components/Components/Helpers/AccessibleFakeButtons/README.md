The `AccessibleFakeButton` is just a simple component that adds some event listeners and
attributes to any html tag or React component for accessibility.

The button will be able to be focused via normal tab behavior, update it's role to be a `button`
when it is not rendered as a link, and keep an `aria-pressed` state up to date.

There is also an `AccessibleFakeInkedButton` if you want to use ink with the button.
