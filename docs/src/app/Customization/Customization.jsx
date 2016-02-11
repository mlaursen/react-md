import React from 'react';

import Markdown from '../Markdown';
import theme from '!!raw!react-md-scss/_theme.scss';
import media from '!!raw!react-md-scss/_media-queries.scss';

const fonts = `
#### Fonts

The default font for material design is the [Roboto font](https://www.google.com/fonts/specimen/Roboto). You can include
this font (or any other fonts) by using the [webfontloader](https://github.com/typekit/webfontloader), locally hosting them,
or noraml \`<link>\` tags in your html.

If you would like to locally host fonts, there are two sass mixins for generating the needed \`font-face\`.

See [host-google-font](https://mlaursen.github.io/react-md/sassdoc/#undefined-mixin-host-google-font)
and [host-material-icons](https://mlaursen.github.io/react-md/sassdoc/#undefined-mixin-host-material-icons)
for more information.
`;

const colors = `
#### Colors

This project has been set up for using the [Material design color palette](https://www.google.com/design/spec/style/color.html#color-color-palette).
You can access all these colors with a sass function \`get-md-color($primary, $hue, $secondary)\`.
There is a good write-up at [the sass documentation](http://mlaursen.github.io/react-md/sassdoc/#undefined-function-get-md-color).

##### tl;dr

\`primary\` should be one of the colors from the color palette as a color string. ie: indigo

\`hue\` should be a number from 1-10 for what the hue should be. Defaults to 6 (the -500 suffix).

\`secondary\` - boolean if this is an accent color, so uses a range of 1-4.
`;

const theming = `
#### Theming

The initial theme is the one you see for this documentation website.

\`\`\`scss
$md-primary-color: indigo !default;
$md-secondary-color: pink !default;
$md-secondary-hue: 2 !default;
\`\`\`

You can override these variables to style your app very quickly.

If you would like more control, there are mixins with the prefix \`md-theme-\` that you can use
to specifically style one component. The default theme is created from the
[\_themes.scss](../master/src/scss/_theme.scss).

Some components are joined with the their parent class, while others are not.
`;

const defaultTheme = `
#### Default theme

\`\`\`scss
${theme}
\`\`\`
`;

const mediaQueries = `
#### Media Queries

The sass is currently set up to have very basic media queries to figure out if it is
mobile or desktop. The current breakpoint is just at \`600px\`.

If there is a component that has different mobile/desktop versions, there is a mixin in the form
of \`md-component-name-desktop\` or \`md-component-name-mobile\` that you can use.
`;

const defaultMedia = `
#### Default Media Queries

\`\`\`scss
${media}
\`\`\`
`;

const Customization = (props) => (
  <section className="documentation text-container">
    <h3 id="customization">Customization</h3>
    <Markdown {...props} markdown={fonts} />
    <Markdown {...props} markdown={colors} />
    <Markdown {...props} markdown={theming} />
    <Markdown {...props} markdown={defaultTheme} />
    <Markdown {...props} markdown={mediaQueries} />
    <Markdown {...props} markdown={defaultMedia} />
  </section>
);
Customization.path = 'customization';

export default Customization;
