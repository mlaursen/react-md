import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import HOCUsage from './HOCUsage';
import HOCUsageRaw from './HOCUsage/code';
import SimpleGridList from './SimpleGridList';
import SimpleGridListRaw from '!!raw-loader!./SimpleGridList.jsx';

import './_styles.scss';

const examples = [{
  title: 'Simple',
  description: `
This example showcases some of the very simple sizing that can be applied to grids. Resize
the page to see how the grid resizes and positions itself based on media size.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'HOC Usage (Higher order component)',
  description: `
Since it can be undesired to have additional divs just for creating a layout system, the
\`Grid\` and \`Cell\` components can act as higher order components and return a \`className\`
to apply to a child component instead of rendering as a \`div\`. To get this functionality,
you just need to create a callback function as the \`children\` of the \`Grid\` or \`Cell\`
that accepts an object containing \`style\` (optional) and \`className\`. You can then apply
these class names to whichever child component you would like.

In addition, the \`Grid\` and \`Cell\` components have a static function named \`getClassName\`
that can be used instead. It is basically the same as the HOC version except that it is not a
renderable component.

\`\`\`jsx
// These two are equivalent
<Cell size={1}>{({ className }) => <div className={className} />}</Cell>
<div className={Cell.getClassName({ size: 1 })} />
\`\`\`

This example also showcases how you can use the [react-md-make-grid-container](/components/grids?tab=2#mixin-react-md-make-grid-container)
and [react-md-make-custom-grid](/components/grids?tab=2#mixin-react-md-make-custom-grid) to make a grid that has different
max widths based on media sizes and only allowing 3 columns in the grid for all media sizes.
  `,
  code: HOCUsageRaw,
  children: <HOCUsage />,
}, {
  title: 'Simple Grid List',
  description: `
Since there are times that a grid will have equal sized cells and just reapplying the same class names over
and over again, a \`GridList\` component has been made to easily apply styles. This component will wrap the
\`className\` functionality from both \`Grid\` and \`Cell\` into a single API and then clone the correct
\`className\` into each child component in the \`GridList\`. All of the components within \`react-md\` will
work with this by default, but if you create a custom component, you **must** correctly apply the \`className\`
prop to your child element.

This example will be the same as the example above, but just using the \`GridList\` component instead to showcase
the boilerplate it removes.
  `,
  code: SimpleGridListRaw,
  children: <SimpleGridList />,
}];

const Grids = () => <ExamplesPage description={README} examples={examples} />;

export default Grids;
