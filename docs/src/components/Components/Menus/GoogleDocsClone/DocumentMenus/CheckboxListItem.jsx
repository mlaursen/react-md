import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FontIcon, ListItemControl, Checkbox } from 'react-md';

export default class CheckboxListItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rightIcon: PropTypes.node,
  };

  state = { hover: false };

  handleMouseOver = () => {
    this.setState({ hover: true });
  };

  handleMouseLeave = () => {
    this.setState({ hover: false });
  };

  render() {
    const { hover } = this.state;
    const { label, rightIcon, ...props } = this.props;
    return (
      <ListItemControl
        primaryText={label}
        primaryAction={
          <Checkbox
            {...props}
            checkedIcon={<FontIcon>check</FontIcon>}
            uncheckedIcon={null}
            inkDisabled
          />
        }
        rightIcon={rightIcon}
        className={cn({ 'md-list-tile--active': hover })}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}
