import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TabsContainer, Tabs, Tab } from 'react-md';

import Markdown from 'components/Markdown';

import testing from '!!raw-loader!utils/testing.js';

import Preview from '!!raw-loader!components/Customization/ThemeBuilder/Preview.jsx';
import PreviewTest from '!!raw-loader!components/Customization/ThemeBuilder/__tests__/Preview.jsx';
import Search from '!!raw-loader!components/Search/index.jsx';
import SearchTest from '!!raw-loader!components/Search/__tests__/index.jsx';

import './_styles.scss';

const markdown = `
# Testing with react-md
Right now you _should_ be able to test most your application using your favorite test runner. The
problems you will run into are when components use the \`ResizeObserver\` or you use a snapshotting
feature like [jest's snapshot testing](https://facebook.github.io/jest/docs/snapshot-testing.html).

### resize-observer-polyfill
Some of the components use the \`ResizeObserver\` component to handle positioning calculations. Since it uses the
[resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill) behind the scenes, you _might_
run into an error:

\`\`\`bash
ReferenceError: SVGElement is not defined
  at ~/code/your-repo/node_modules/resize-observer-polyfill/dist/ResizeObserver.js:651:57
\`\`\`

This error occurs since jsdom has not implemented the \`SVGElement\` and when running tests, the \`resize-observer-polyfill\`
does an _unsafe_
[check](https://github.com/que-etc/resize-observer-polyfill/blob/b0fb530f16666030577c5f252f84c95598af7330/dist/ResizeObserver.js#L641-L652)
for determining if the element is an SVG. You can do a "hack" before your test to get your tests working:

\`\`\`js
global.SVGElement = Element;
\`\`\`

This should allow your tests to work as expected and not crash.

## Snapshot Testing
Some of my components use \`findDOMNode\` behind the scenes to be able to do calculations for positioning and other
things, but this doesn't work with [react-test-renderer](https://github.com/facebook/react/issues/7371#issuecomment-260946945).
Another problem that happens is that the \`CSSTransitionGroup\` can not read \`willComponentMount\` of \`null\`.

There are a couple of ways to work around this:
- mock the \`react-md\` components that fail
  > The problem with mocking out the \`react-md\` components is that it becomes difficult if you want some reasonable
  > markup after mocking. It will basically be the entire component from \`react-md\`, but without some of the
  > lifecycle methods and ref callbacks.
- use a different renderer for the snapshots
  > A downside with this is that the snapshots have a little bit less information than the \`react-test-renderer\`
  > snapshots.
- snapshot something other than the html

Out of these three, I prefer using a different renderer for the snapshots and this is how this documentation site is tested.
The \`enzyme\` renderer works quite well as long as you also install the
[enzyme-to-json](https://github.com/adriantoine/enzyme-to-json#serializer) package to create the snapshots as well.

### Helper Utils
I normally create a test helper file for re-use across tests. Here is the one I use for this website:

\`\`\`jsx
${testing}
\`\`\`

### In Action
Here are a couple of tests that use the utility functions.
`;

const Testing = ({ mobile }) => (
  <section className="md-grid md-grid--stacked testing">
    <Markdown markdown={markdown} component="div" className="md-cell md-cell--12 md-text-container" />
    <TabsContainer colored className="md-text-container source-code">
      <Tabs tabId="source-code" mobile={mobile} overflowMenu>
        <Tab label="Preview.jsx">
          <Markdown markdown={`\`\`\`jsx\n${Preview}\n\`\`\``} />
        </Tab>
        <Tab label="Preview.test.jsx">
          <Markdown markdown={`\`\`\`jsx\n${PreviewTest}\n\`\`\``} />
        </Tab>
        <Tab label="Search.jsx">
          <Markdown markdown={`\`\`\`jsx\n${Search}\n\`\`\``} />
        </Tab>
        <Tab label="Search.test.jsx">
          <Markdown markdown={`\`\`\`jsx\n${SearchTest}\n\`\`\``} />
        </Tab>
      </Tabs>
    </TabsContainer>
  </section>
);

Testing.propTypes = {
  mobile: PropTypes.bool,
};

export default connect(({ media: { mobile, tablet } }) => ({ mobile: mobile || tablet }))(Testing);
