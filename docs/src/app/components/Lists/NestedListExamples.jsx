import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { IconButton } from 'react-md/lib/Buttons';
import { List, ListItem, ListSubheader } from 'react-md/lib/Lists';
import Paper from 'react-md/lib/Papers';

import { randomAvatars } from '../../utils';

const avatars = randomAvatars(2);

export default class NestedListExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isOpen: [true, false],
      isNestedOpen: [false, false],
      checkedStates: [false, false, false, false],
    };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  toggleOpen = (i) => {
    const isOpen = this.state.isOpen.slice();
    isOpen[i] = !isOpen[i];
    this.setState({ isOpen });
  };

  toggleNestedOpen = (i) => {
    const isNestedOpen = this.state.isNestedOpen.slice();
    isNestedOpen[i] = !isNestedOpen[i];
    this.setState({ isNestedOpen });
  };

  toggleCheckedState = (i) => {
    const checkedStates = this.state.checkedStates.slice();
    checkedStates[i] = !checkedStates[i];
    this.setState({checkedStates });
  };

  render() {
    return (
      <div className="paper-container">
        <Paper>
          <List>
            <ListSubheader primaryText="An uncontrolled list" />
            {this.state.checkedStates.map((checked, i) => (
              <ListItem
                key={i}
                primaryText="Single-line item"
                leftIcon={<IconButton onClick={this.toggleCheckedState.bind(this, i)}>{checked ? 'check_box' : 'check_box_outline_blank'}</IconButton>}
                nestedItems={[
                  <ListItem key={1} primaryText="Revealed single-line item" />,
                ]}
              />
            ))}
          </List>
        </Paper>
        <Paper>
          <List>
            <ListSubheader primaryText="A controlled list" />
            <ListItem
              primaryText="Single-line item"
              leftAvatar={avatars[0]}
              isOpen={this.state.isOpen[0]}
              rightIcon={<IconButton onClick={this.toggleOpen.bind(this, 0)}>keyboard_arrow_down</IconButton>}
              nestedItems={[
                <ListItem
                  key={1}
                  isOpen={this.state.isNestedOpen[0]}
                  primaryText="Revealed single-line item"
                  onExpanderClick={this.toggleNestedOpen.bind(this, 0)}
                  nestedItems={[
                    <ListItem key={1} primaryText="Even this far.." />,
                  ]}
                />,
              ]}
            />
            <ListItem
              primaryText="Single-line item"
              leftAvatar={avatars[1]}
              isOpen={this.state.isOpen[1]}
              rightIcon={<IconButton onClick={this.toggleOpen.bind(this, 1)}>keyboard_arrow_down</IconButton>}
              nestedItems={[
                <ListItem
                  key={1}
                  isOpen={this.state.isNestedOpen[1]}
                  primaryText="Revealed single-line item"
                  onExpanderClick={this.toggleNestedOpen.bind(this, 1)}
                  nestedItems={[
                    <ListItem key={1} primaryText="Even this far.." />,
                  ]}
                />,
              ]}
            />
          </List>
        </Paper>
      </div>
    );
  }
}
