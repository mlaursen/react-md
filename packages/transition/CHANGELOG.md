# v2.0.0-alpha.0

## New Features / Breaking Changes

- It is now possible to have the Collapse component be rendered while collapsed
  and have a min height value set.
- It is now possible to create more advanced collapsible elements with the new
  children render function API.
- No longer uses `react-motion` to animate the height changes with the spring
  animation.
- removed the old Scss selectors for the different types since selectors are
  mostly considered bad practice now as mixins should be used instead.
