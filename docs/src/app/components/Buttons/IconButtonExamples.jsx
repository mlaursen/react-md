import React from 'react';
import { IconButton } from 'react-md/lib/Buttons';

import { githubHref } from '../../utils';

export default function IconButtonExamples() {
  return (
    <div>
      <IconButton>chat_bubble_outline</IconButton>
      <IconButton>home</IconButton>
      <IconButton disabled>accessible</IconButton>
      <IconButton href={githubHref} className="fa fa-github" />
    </div>
  );
}
