import React, { PureComponent } from 'react';
import Markdown from 'components/Markdown';
import loremIpsum from 'lorem-ipsum';

import TypographyRaw from '!!raw!react-md/src/scss/_typography.scss';
import sassdoc from '../../sassdocs/typography.json';
import SassDoc from 'components/SassDoc';

const markdown = `
# Material Design Typography

The typography has been built off of the [typography specs](https://www.google.com/design/spec/style/typography.html).
The base html tags will be modified by default unless you set the sass variable \`$md-typography-extended\`
to \`false\`.

The tags will be implemented as:
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
There have also been some other utlity classes added.

- \`.md-text-left\` - aligns text left
- \`.md-text-center\` - aligns text center
- \`.md-text-right\` - aligns text right
- \`.md-text-justify\`, - aligns text by justify
- \`.md-text-capitalize\` - capitlizes the text
- \`.md-text-uppercase\` - uppercases the text
- \`.md-text-lowercase\` - lowercases the text
- \`.md-text-nowrap\` - does not allow line breaks
- \`.md-text-no-select\` - Does not allow use-select
- \`.md-font-light\` - the material design light font weight.
- \`.md-font-regular\` - the material design regular font weight.
- \`.md-font-medium\` - the material design medium font weight.
- \`.md-font-bold\` - the material design bold font weight.


In addition, a \`md-text-container\` class has been created. This class will
center any text and prevent lines from extending the \`md-typography-max-line-length\`
value.
`;

export default class Typography extends PureComponent {
  render() {
    return (
      <main className="md-grid">
        <div className="md-cell md-cell--12">
          <section className="md-text-container">
            <Markdown markdown={markdown} component="article" />
            <h1 className="md-display-4">Lorem</h1>
            <h2 className="md-display-3">Ipsum</h2>
            <h3 className="md-display-2">Cras sed</h3>
            <h4 className="md-display-1">Phasellus</h4>
            <h5 className="md-headline">Ut convallis</h5>
            <h6 className="md-title">Proin quis cursus purus. Fusce.</h6>
            <h6 className="md-subheading-2">In in augue tincidunt, rhoncus.</h6>
            <h6 className="md-subheading-1">Vivamus elementum ligula vel justo.</h6>
            <p className="md-body-2">{loremIpsum({ count: 1, units: 'paragraphs' })}</p>
            <p className="md-body-1">{loremIpsum({ count: 1, units: 'paragraphs' })}</p>
            <table style={{ width: '100%' }}>
              <caption className="md-caption md-text-left">{loremIpsum({ count: 1, units: 'paragraphs' })}</caption>
            </table>
            <h2>Helper Classes</h2>
            <Markdown markdown={helperMarkdown} component="article" />
          </section>
        </div>
        <SassDoc rawFile={TypographyRaw} sassdoc={sassdoc} />
      </main>
    );
  }
}
