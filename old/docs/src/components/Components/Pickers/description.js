export default `
Pickers provide a simple way to select a single value from a pre-determined set. Since
the material design spec requires the pickers to be formatted to the user's locale, the
\`Intl.DateTimeFormat\` is used for formatting. Unfortunately, this means it is kind of
hard to get custom formatting that does not adhere to that spec and that it must be polyfilled
in browsers that do not natively support it. Check out the [Intl Polyfill](/components/pickers/date#intl-polyfill)
example below to see how you can polyfill into when required.
`;
