import React, { PureComponent } from 'react';
import Markdown from 'components/Markdown';
import loremIpsum from 'lorem-ipsum';

import './_typography.scss';

const markdown = `
# Material Design Typography

The typography has been built off of the [typography specs](https://www.google.com/design/spec/style/typography.html).
The default font used in react-md is \`'Roboto'\`. This can be changed by overriding
[$md-font-name](/customization/typography?tab=1#variable-md-font-name) and/or
[$md-font-family](/customization/typography?tab=1#variable-md-font-family) before \`@include react-md-everything\`
or \`@include react-md-typography\`.

The base html tags will be modified by default unless you set the sass variable \`$md-typography-extended\`
to \`false\`. The tags will be implemented as:
- \`h1\` - \`.md-display-1\`
- \`h2\` - \`.md-headline\`
- \`h3\` - \`.md-title\`
- \`h4\` - \`.md-subheading-2\`
- \`h5\` - \`.md-subheading-1\`
- \`h6\` - \`.md-body-2\`
- \`p\` - \`.md-body-1\`
- \`caption\` - \`.md-caption\`


All the class names in order of largest to smallest are:
\`.md-display-4\`, \`.md-display-3\`, \`.md-display-2\`, \`.md-display-1\`, \`.md-headline\`,
\`.md-title\`, \`.md-subheading-2\`, \`.md-subheading-1\`, \`.md-body-2\`, \`.md-body-1\`,
and \`.md-caption\`.

#### Examples
`;

const helperMarkdown = `
If the \`$md-typography-include-utilities\` variable is \`true !default\`, the following utility
class names will be created:

- \`.md-text-left\` - aligns text left
- \`.md-text-center\` - aligns text center
- \`.md-text-right\` - aligns text right
- \`.md-text-justify\`, - aligns text by justify
- \`.md-text-capitalize\` - capitlizes the text
- \`.md-text-uppercase\` - uppercases the text
- \`.md-text-lowercase\` - lowercases the text
- \`.md-text-nowrap\` - does not allow line breaks
- \`.md-text-no-select\` - Does not allow use-select
- \`.md-font-light\` - the material design light font weight (300).
- \`.md-font-regular\` - the material design regular font weight (400).
- \`.md-font-medium\` - the material design medium font weight (500).
- \`.md-font-semibold\` - the semibold font weight used by some Google fonts (600).
- \`.md-font-bold\` - the material design bold font weight (700).

If the \`$md-typography-include-text-container\` variable is \`true !default\`, a \`md-text-container\`
class name will be created to position text in the center of the page and keep the line length within
the \`$md-typography-max-line-length\` value.
`;

export default class Typography extends PureComponent {
  render() {
    return (
      <main className="md-grid">
        <div className="md-cell md-cell--12">
          <section className="md-text-container typography-container">
            <Markdown markdown={markdown} component="article" />
            <h1 className="md-display-4">md-display-4</h1>
            <h2 className="md-display-3">md-display-3</h2>
            <h3 className="md-display-2">md-display-2</h3>
            <h4 className="md-display-1">md-display-1</h4>
            <h5 className="md-headline">md-headline</h5>
            <h6 className="md-title">md-title</h6>
            <h6 className="md-subheading-2">md-subheading-2</h6>
            <h6 className="md-subheading-1">md-subheading-1</h6>
            <p className="md-body-2">md-body-2: {loremIpsum({ count: 1, units: 'paragraphs' })}</p>
            <p className="md-body-1">md-body-1: {loremIpsum({ count: 1, units: 'paragraphs' })}</p>
            <table style={{ width: '100%' }}>
              <caption className="md-caption md-text-left">md-caption: {loremIpsum({ count: 1, units: 'paragraphs' })}</caption>
            </table>
            <h2>Helper Classes</h2>
            <Markdown markdown={helperMarkdown} component="article" />
          </section>
        </div>
      </main>
    );
  }
}
