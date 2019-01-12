# react-md documentation

This is the documentation site for react-md.

## Props

- props should be sorted alphabetically by default
- when component props have inheritance, there should be a floating and moving
  panel to toggle the display of interited types or interfaces.
- all react-md type inheritance should be shown by default
- props that are required should have an asterisk next to their name
- props that were inherited should gain a different color? or have a second line
  referencing its inheritance
- the prop types should be converted into "human readable" definitions. Probably
  harder for the more complex types, maybe for those reference the full type
  definition for more details?
- default values should be converted to "human readable" definitions or
  reference the more complex types as needed.

## Static Class Properties and Enums

This would be stuff like the `AppBar.offsetClassName` and `TooltipPosition`
enum.

## Interfaces

- same rules as props

## Types

- name - value table but value is in human readable terms. Also links to union
  type definitions if needed.

## Scrolling

- the props table headers should be fixed to the top of the screen below the
  main toolbar until the next section is scolled into view.
- the inheritance floating and moving panel should move with the page.
