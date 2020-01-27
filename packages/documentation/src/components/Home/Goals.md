This project's goal is to create fully accessible React components following the
accessibility guidelines from [www.w3.org] that will also be easily customizable
with sensible defaults following the [Material Design] principals. The
components are created to feel like "extension of the DOM and native HTML
Elements" meaning using a `<Button>` component from `react-md` should behave the
same as using a `<button>` element.

The styles can be configured both compile-time and run-time by the configurable
SCSS variables and the usage of [CSS Variables] as well as ensuring that the
last defined styles take precedence. In addition, since accessibility is a focus
for this library, the theming will automatically attempt to fix color contrast
ratios for you to meet at least the [AA requirements] along with right to left
language support.

[www.w3.org]: https://www.w3.org
[material design]: https://material.io/design/
[aa requirements]: https://webaim.org/articles/contrast/#sc143
[css variables]:
  https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
