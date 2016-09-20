import React, { PureComponent } from 'react';
import Menu from 'react-md/lib/Menus/Menu';
import ListItem from 'react-md/lib/Lists/ListItem';
import Divider from 'react-md/lib/Dividers';

const command = <span>&#x2318;</span>;

const noop = () => {};

export default class MenuExamples extends PureComponent {
  render() {
    return (
      <div>
        <Menu isOpen className="menu-example menu-example--static" onClose={noop}>
          <ListItem primaryText="Undo" />
          <ListItem primaryText="Redo" disabled />
          <Divider />
          <ListItem primaryText="Cut" disabled />
          <ListItem primaryText="Copy" disabled />
          <ListItem primaryText="Paste" />
        </Menu>
        <Menu isOpen cascading className="menu-example menu-example--static" onClose={noop}>
          <ListItem primaryText="Bold" rightIcon={<div>{command}B</div>} />
          <ListItem primaryText="Italic" rightIcon={<div>{command}I</div>} />
          <ListItem primaryText="Underline" rightIcon={<div>{command}U</div>} />
          <ListItem primaryText="Strikethrough" rightIcon={<div>Alt+Shift+5</div>} />
          <ListItem primaryText="Superscript" rightIcon={<div>{command}.</div>} />
          <ListItem primaryText="Subscript" rightIcon={<div>{command},</div>} />
          <Divider />
          <ListItem
            primaryText="Format"
            nestedItems={[
              <ListItem primaryText="Single" key={0} />,
              <ListItem primaryText="1.15" key={1} />,
              <ListItem primaryText="Double" key={2} />,
              <ListItem primaryText="Custom: 1.2" key={3} />,
            ]}
          />
        </Menu>
      </div>
    );
  }
}
