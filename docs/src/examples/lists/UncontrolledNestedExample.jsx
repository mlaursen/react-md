import React from 'react';
import { List, ListItem } from 'react-md/lib/Lists';
import Subheader from 'react-md/lib/Subheaders';

export default () => {
  const uncontrolledItems = Array.apply(null, new Array(5)).map((_, i) => {
    return (
      <ListItem
        key={i}
        initiallyOpen={i === 0}
        primaryText="Single-line item"
        nestedItems={[
          <ListItem key={i} primaryText="Revealed single-line item" />,
          <ListItem key={i + 1} primaryText="Revealed single-line item" />,
        ]}
      />
      );
  });

  return (
    <List className="example-list">
      <Subheader primaryText="An uncontrolled list" />
      {uncontrolledItems}
    </List>
  );
};
