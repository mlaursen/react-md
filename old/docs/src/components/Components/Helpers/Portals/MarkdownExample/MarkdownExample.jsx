import React from 'react';
import Markdown from 'components/Markdown';

const markdown = `
This markdown example will show how you can use the \`Portal\` to create some more
advanced components like the \`<ColorPreviewer />\` used throughout the website
to get the color previews when hoving over Sass/Scss code. This component works
by checking the page for any code blocks related to Sass/Scss and adding event
listeners so that when the mouse is over a color hex code or a Sass color variable,
a small color preview box will appear over the color to help see what that value
really is.

The \`<ColorPreviewer />\` does some cool things behind the scenes as well. In each
code block, it will automatically update the variables within the scrope of the code
block. So if a code block defined \`$md-primary-color: $md-blue-500;\` anywhere in
the file, all instances of that \`$md-primary-color\` in that code block will now
also reference \`$md-blue-500\`. I have no updated it to allow local scoping within
mixins or functions though, so that is still missing. Unfortunately this feature
has only been implemented on desktop, so you'll have to preview this example on one.

Anyways, let's create a few code blocks to see the \`<ColorPreviewer />\` in action!

#### Code Block One
\`\`\`scss
@import '~globals';

$md-primary-color: $md-light-blue-500;
$md-secondary-color: $md-deep-purple-a-200;

@mixin some-mixin($background: $md-primary-color, $color: $md-white-base) {
  .some-class {
    background: $background;
    color: $color;
  }
}
\`\`\`

#### Code Block Two
\`\`\`scss
@import '~globals';

$md-primary-color: #f39c12;
$md-secondary-color: #e74c3c;

$rgba-color-1: rgba($md-blue-a-200, .54);
$rgba-color-2: rgba($md-black-base, .12);
$rgba-color-3: rgba(#f39c12, .87);
\`\`\`
`;

const MarkdownExample = () => <Markdown markdown={markdown} />;
export default MarkdownExample;
