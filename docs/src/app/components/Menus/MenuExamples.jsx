import React from 'react';

import Menu from 'react-md/lib/Menus';
import { ListItem } from 'react-md/lib/Lists';

const MenuExamples = () => {
  return (
    <div className="static-examples">
      <Menu isOpen={true}>
        <ListItem primaryText="Maps" />
        <ListItem primaryText="Books" />
        <ListItem primaryText="Flights" />
        <ListItem primaryText="Apps" />
      </Menu>
      <Menu isOpen={true}>
        <ListItem primaryText="Untitled" />
        <ListItem primaryText="Using the z-axis to Solve Design Challenges" />
        <ListItem primaryText="An Extensive History of Dimensionality: the Abridged Edition" />
      </Menu>
      <Menu isOpen={true}>
        <ListItem primaryText="Untitled" />
        <ListItem primaryText="Using the z-axis to Solve Design Challenges" />
        <ListItem primaryText="An Extensive History of Dimensionality" />
      </Menu>
      <Menu isOpen={true} cascading>
        <ListItem primaryText="Bold" />
        <ListItem primaryText="Italic" />
        <ListItem primaryText="Underline" />
        <ListItem primaryText="Strikethrough" />
        <ListItem primaryText="Superscript" />
      </Menu>
    </div>
  );
};

export default MenuExamples;
