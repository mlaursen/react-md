import React from 'react';
import Button from 'react-md/lib/Buttons';
import SVGIcon from 'react-md/lib/SVGIcons';
import { GITHUB_URL } from 'constants/application';

import deleteIcon from 'icons/delete.svg';

const IconButtonExamples = () => (
  <div className="buttons__group">
    <h5>Theme Examples</h5>
    <Button icon primary>favorite</Button>
    <Button icon secondary iconClassName="fa fa-star-o" />
    <Button icon>aspect_ratio</Button>
    <Button icon><SVGIcon use={deleteIcon.url} /></Button>
    <h5>Disabled Examples</h5>
    <Button icon disabled>favorite</Button>
    <Button icon disabled primary>close</Button>
    <h5>As Link Examples</h5>
    <Button icon href={GITHUB_URL} iconClassName="fa fa-github" />
    <Button icon tooltipLabel="Click to favorite something imaginary">
      favorite
    </Button>
    <h5>Theme Swapped Examples</h5>
    <Button icon primary swapTheming>favorite</Button>
    <Button icon secondary swapTheming>favorite</Button>
  </div>
);

export default IconButtonExamples;
