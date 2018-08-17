/* tslint:disable max-line-length */
import * as React from "react";

import { MarkdownPage } from "components/Markdown";

const markdown = `# Installing @react-md/a11y

## Table of Contents
- [Installing](#installing)

## Installing
\`\`\`sh
$ npm install --save @react-md/a11y
\`\`\`

or with \`yarn\`

\`\`\`sh
$ yarn add @react-md/a11y
\`\`\`
`;

const Installation = () => <MarkdownPage markdown={markdown} />;

export default Installation;
