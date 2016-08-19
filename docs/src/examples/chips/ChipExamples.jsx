import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Avatar from 'react-md/lib/Avatars';
import Chip from 'react-md/lib/Chips';

export default class ChipExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { removed: false, removed2: false };
  }

  componentWillUnmount() {
    if (this.state.timeout) { clearTimeout(this.state.timeout); }
    if (this.state.timeout2) { clearTimeout(this.state.timeout2); }
  }

  handleRemove = (avatar) => {
    const suffix = avatar ? 2 : '';
    this.setState({
      [`removed${suffix}`]: true,
      [`timeout${suffix}`]: setTimeout(() => {
        this.setState({
          [`removed${suffix}`]: false,
          [`timeout${suffix}`]: null,
        });
      }, 1200),
    });
  };

  render() {
    const removableChips = [];
    if (!this.state.removed) {
      removableChips.push(
        <Chip
          key="removable"
          label="Freddy Kruger"
          remove={() => this.handleRemove(false)}
        />
      );
    }

    if (!this.state.removed2) {
      removableChips.push(
        <Chip
          key="removable2"
          label="Rick Astley"
          remove={() => this.handleRemove(true)}
        >
          <Avatar random>R</Avatar>
        </Chip>
      );
    }

    return (
      <CSSTransitionGroup
        component="div"
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
        className="chip-list"
      >
        <Chip label="Example Chip">
          <Avatar random>A</Avatar>
        </Chip>
        {removableChips}
      </CSSTransitionGroup>
    );
  }
}
