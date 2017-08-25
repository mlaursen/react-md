import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import SpriteMaps from './SpriteMaps';
import SpriteMapsRaw from '!!raw-loader!./SpriteMaps.jsx';
import SpriteStylesRaw from '!!raw-loader!./_sprites.scss';
import AddingAccessibility from './AddingAccessibility';
import AddingAccessibilityRaw from './AddingAccessibility/code';

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
        spriteFilename: 'icon-sprites.[hash:8].svg',
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
  code: `/* SpriteMaps.jsx */
${SpriteMapsRaw}
\`\`\`

\`\`\`scss
/* _sprites.scss */
${SpriteStylesRaw}
`,
  children: <SpriteMaps />,
}, {
  title: 'Adding Accessibility',
  description: `
Now you must be wondering:
> "How can I make my SVG icons screen reader accessible? This is my **number one concern** when developing
apps!"

Welp, look no further since I have examples, descriptions, and a solution for you!

### Basic usage
#### Inline SVG
Ok, lets start with the easiest one: Inline SVG Icons. This one will actually have the most native support
since it is the easiest for the screen readers to parse. However, you'll still need to provide the same props
as the other versions. The basic props you'll need to add are \`aria-labelledby\`, \`title\`, and \`desc\`
(The \`title\` and \`desc\` are not required if they are part of the \`children\`, but you won't get the
auto-magic aria-ids). When the \`aria-labelledby\` prop is defined, it will automatically attempt to split
the value with spaces and apply the first id to the \`<title>\` and the second id to the \`<desc>\`. If these
props aren't used, you will manually need to add the ids yourself.

#### External SVGs
When using the \`use\` prop, this can be simplified even more. When the \`title\` and \`desc\` props are provided,
it will automatically parse the \`use\` prop to get the link of the icon and then suffix with \`-title\` and \`-desc\`
as well as creating the \`aria-labelledby\` attribute to provide to the \`<svg>\`.

#### External SVGs with title
When the \`use\` prop is used and each of your icons are created by using a \`<symbol>\` and provide a \`<title>\`, you
can just use the \`titleAttr\` prop to define a title and it will be picked up by screen readers.

### Usage in links
When an icon is used in links, the rules change a little bit for providing accessibility. If the icon is used for
**decoration only**, provide the \`role="presentation"\` prop. The icon will not need the \`titleAttr\` or any other
accessibility props. In all other cases, follow the examples above about adding the required \`title\`, \`desc\`, \`titleAttr\`,
and others. The \`SVGIcon\` defaults to the \`img\` \`role\`.

The example code will also include what the created html is after a jest snapshot test.
  `,
  code: AddingAccessibilityRaw,
  children: <AddingAccessibility />,
}];

const SVGIcons = () => <ExamplesPage description={README} examples={examples} />;
export default SVGIcons;
