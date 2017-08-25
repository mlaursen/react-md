import React from 'react';
import Dialog from 'react-md/lib/Dialogs';

import BackButton from 'components/BackButton';
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
    <BackButton />
  </Dialog>
);

export default RoutingExampleDialog;
