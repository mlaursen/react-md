import React from 'react';
import { MarkdownPage } from 'components/Markdown';

import testing from '!!raw-loader!utils/testing.js';
import preview from '!!raw-loader!components/Customization/Themes/ThemeBuilder/__tests__/Preview.jsx';
import search from '!!raw-loader!components/Search/__tests__/index.jsx';

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

There are a couple of ways to work arount this:
- mock the \`react-md\` components that fail
  > The problem with mocking out the \`react-md\` components is that it becomes difficult if you want some reasonable
  > markup after mocking. It will basically be the entire component from \`react-md\`, but without some of the
  > lifecycle methods and ref callbacks.
- use a different renderer for the snapshots
  > A downside with this is that the snapshots have a little bit less information than the \`react-test-renderer\`
  > snapshots.
- snapshot something other than the html

Out of these three, I prefer using a different renderer for the snapshots and this is how this documentation site is tested.

### Helper Utils
I normally create a test helper file for re-use across tests. Here is the one I use for this website:

\`\`\`jsx
${testing}
\`\`\`

### In Action
Here are a couple of tests that use the utility functions.

\`\`\`jsx
/* src/components/Customization/Customization/Themes/ThemeBuilder/__tests__/Preview.jsx */
${preview}
\`\`\`

\`\`\`jsx
/* src/components/Search/__tests__/index.jsx */
${search}
\`\`\`
`;

const Testing = () => <MarkdownPage markdown={markdown} />;
export default Testing;
