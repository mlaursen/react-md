import React from 'react';
import Button from 'react-md/lib/Buttons';
import { GITHUB_LINK } from 'constants/application';

const IconButtonExamples = () => (
  <div className="btn-example">
    <p>
      Icon buttons can not be unstyled or styled with the primary/secondary color.
      However, they can use any font-icon library just like any other <code>FontIcon</code>
    </p>
    <Button icon primary>favorite</Button>
    <Button icon secondary iconClassName="fa fa-star-o" />
    <Button icon>aspect_ratio</Button>

    <p>
      When an icon button is disabled, any styling will be overridden and they
      will not be clickable.
    </p>
    <Button icon disabled>favorite</Button>
    <Button icon disabled>accessible</Button>

    <p>
      An icon <code>Button</code> can be rendered as a link. Tooltips
      are also built in. They will appear on hover or touch hold.
    </p>
    <Button icon href={GITHUB_LINK} iconClassName="fa fa-github" />
    <Button icon tooltipLabel="Click to favorite something imaginary">
      favorite
    </Button>
  </div>
);

export default IconButtonExamples;
