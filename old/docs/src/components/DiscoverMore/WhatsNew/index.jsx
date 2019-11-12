import React from 'react';
import { MarkdownPage } from 'components/Markdown';

import markdown from './README.md';

const WhatsNew = () => <MarkdownPage markdown={markdown} />;
export default WhatsNew;
