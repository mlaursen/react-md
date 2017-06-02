import React from 'react';
import Button from 'react-md/lib/Buttons';
import { GITHUB_LINK } from 'constants/application';

const IconButtonExamples = () => (
  <div className="btn-example">
    <h5>Theme Examples</h5>
    <Button icon primary>favorite</Button>
    <Button icon secondary iconClassName="fa fa-star-o" />
    <Button icon>aspect_ratio</Button>
    <h5>Disabled Examples</h5>
    <Button icon disabled>favorite</Button>
    <Button icon disabled primary>close</Button>
    <h5>As Link Examples</h5>
    <Button icon href={GITHUB_LINK} iconClassName="fa fa-github" />
    <Button icon tooltipLabel="Click to favorite something imaginary">
      favorite
    </Button>
    <h5>Theme Swapped Examples</h5>
    <Button icon primary swapTheming>favorite</Button>
    <Button icon secondary swapTheming>favorite</Button>
  </div>
);

export default IconButtonExamples;
