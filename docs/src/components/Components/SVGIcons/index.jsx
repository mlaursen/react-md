import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import SpriteMaps from './SpriteMaps';
import SpriteMapsRaw from '!!raw-loader!./SpriteMaps.jsx';

const examples = [{
  title: 'Simple Example',
  description: `
This example will show how you can use the \`SVGIcon\` component to create inline SVG icons and showcase
some of the styling and sizing props.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Using Sprite Maps',
  description: `
One of the problems with inline SVGs is that all your icons are not cacheable and reusable. If this is your goal,
you can end up using the \`use\` prop instead of \`children\` to define your icons.

To get SVGIcons working for this documentation site, I am using the [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)
and this additional webpack config:

\`\`\`js
  }, {
    test: /\\.svg$/,
    include: path.join(src, 'icons'),
    use: [{
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        spriteFilename: 'icon-sprites.svg',
      },
    }, {
      loader: 'svgo-loader',
    }],
  }, {
\`\`\`

This allows any svg that I import from \`src/icons\` to be converted to an external url with a direct link to the SVG I want to use.
If your app needs to support IE11 or Edge < 12, you will need to also polyfill the \`<use>\` in SVG with
[svgxuse](https://github.com/Keyamoon/svgxuse) or [svg4everybody](https://github.com/jonathantneal/svg4everybody) since they do not
support \`<use xlink:href>\` and external SVG sprite maps. It is most likely simpler to not use the \`extract\` options when using
the \`extract\` option when IE11 and Edge < 12 need to be supported. Check out the source code below for some more info.
  `,
  code: SpriteMapsRaw,
  children: <SpriteMaps />,
}];

const SVGIcons = () => <ExamplesPage description={README} examples={examples} />;
export default SVGIcons;
