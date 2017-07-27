import React from 'react';
import { MarkdownPage } from 'components/Markdown';

import markdown from './README.md';

const Prerequisites = () => <MarkdownPage markdown={markdown} />;
export default Prerequisites;
