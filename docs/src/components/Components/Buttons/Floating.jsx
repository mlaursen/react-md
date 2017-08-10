import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import SVGIcon from 'react-md/lib/SVGIcons';

import redo from 'icons/redo.svg';

const Floating = () => (
  <div className="buttons__group">
    <h5>Theme Examples</h5>
    <Button floating>home</Button>
    <Button floating primary>share</Button>
    <Button floating secondary iconClassName="fa fa-star-o" />
    <Button floating secondary svg><SVGIcon use={redo.url} /></Button>
    <h5>Mini Examples</h5>
    <Button floating mini>home</Button>
    <Button floating primary mini>share</Button>
    <Button floating secondary iconClassName="fa fa-star-o" mini />
    <Button floating secondary svg mini><SVGIcon use={redo.url} /></Button>
    <h5>Disabled Examples</h5>
    <Button floating primary disabled>favorite</Button>
    <Button floating secondary disabled>close</Button>
    <h5>Theme Swapped Examples</h5>
    <Button floating primary swapTheming>favorite</Button>
    <Button floating secondary swapTheming>favorite</Button>
  </div>
);

export default Floating;
