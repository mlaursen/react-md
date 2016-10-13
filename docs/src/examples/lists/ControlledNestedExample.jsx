import React, { PureComponent, PropTypes } from 'react';
import { List, ListItem } from 'react-md/lib/Lists';
import Subheader from 'react-md/lib/Subheaders';

const ITEMS = Array.apply(null, new Array(5)).map(() => 'Single-line item');
const NESTED_ITEMS = ['Revealed single-line item', 'Revealed single-line item'];

export default class ControlledNestedExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);


    // Horrible example of nested state.. It's easier to use defaultOpen instead
    // of controlling everything.
    const state = {};
    ITEMS.forEach((_, i) => {
      state[`li${i}`] = {
        checked: false,
        open: false,
      };
    });
    this.state = state;
  }

  toggle = (i, bool) => {
    const key = `li${i}`;
    this.setState({
      [key]: Object.assign({}, this.state[key], {
        [bool]: !this.state[key][bool],
      }),
    });
  };

  toggleExpanded = (i) => {
    this.toggle(i, 'open');
  };

  toggleCheckbox = (i) => {
    this.toggle(i, 'checked');
  };

  render() {
    const items = ITEMS.map((primaryText, i) => (
      <ListItem
        key={i}
        isOpen={this.state[`li${i}`].open}
        onExpanderClick={() => this.toggleExpanded(i)}
        primaryText={primaryText}
        expandOnClick={false}
        nestedItems={NESTED_ITEMS.map((text, i) => <ListItem key={i} primaryText={text} />)}
      />
    ));

    return (
      <List className="example-list">
        <Subheader primary primaryText="A controlled List" />
        {items}
      </List>
    );
  }
}
