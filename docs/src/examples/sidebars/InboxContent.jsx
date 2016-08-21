import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';

import LoremIpsum from 'components/LoremIpsum';

const InboxContent = (isOpen) => (
  <section className={cn('some-content', { 'md-sidebar-relative': isOpen })}>
    <Card className="container">
      <CardTitle
        title="Click the menu button to toggle the responsive sidebar"
        subtitle="The overlay will appear on mobile devices"
      />
      <CardText component={LoremIpsum} count={5} />
    </Card>
  </section>
);

InboxContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default InboxContent;
