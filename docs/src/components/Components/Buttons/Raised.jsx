import React from 'react';
import { Button, SVGIcon } from 'react-md';

import copyright from 'icons/copyright.svg';

const Raised = () => (
  <div className="buttons__group">
    <h5>Theme Examples</h5>
    <Button raised>Hello, World!</Button>
    <Button raised primary iconClassName="fa fa-hand-spock-o">Spock</Button>
    <Button raised secondary iconBefore={false} iconClassName="fa fa-hand-paper-o">
      Paper
    </Button>
    <Button raised primary iconEl={<SVGIcon use={copyright.url} />}>react-md</Button>
    <Button raised secondary iconBefore={false} iconEl={<SVGIcon use={copyright.url} />}>
      react-md
    </Button>
    <h5>Disabled Examples</h5>
    <Button raised disabled>Disabled Button</Button>
    <Button raised disabled iconChildren="close">Disabled Button</Button>
    <h5>Theme Swapped Examples</h5>
    <Button raised primary swapTheming>Hello</Button>
    <Button raised secondary swapTheming>World</Button>
  </div>
);

export default Raised;
