import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';

import RoutingExample from './RoutingExample';

const RoutingExampleDialog = () => (
  <Dialog
    id="navigation-drawer-routing-example-dialog"
    visible
    fullPage
    initialFocus="navigation-drawer-routing-example-dialog"
    aria-label="Drawer Routing Example"
    closeOnEsc={false}
  >
    <RoutingExample />
    <Button
      floating
      fixed
      secondary
      to="/components/navigation-drawers#react-router-example"
      component={Link}
      tooltipLabel="Return to drawer examples"
      tooltipPosition="left"
    >
      arrow_back
    </Button>
  </Dialog>
);

export default RoutingExampleDialog;
