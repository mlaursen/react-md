import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Portal from '../Helpers/Portal';

export default class Overlay extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
    renderNode: PropTypes.object,
    onClick: PropTypes.func,
  };

  static childContextTypes = {
    isInPortal: PropTypes.bool,
  };

  getChildContext() {
    // Always want the overlay to render in a separate subtree until 1.1.0
    return { isInPortal: false };
  }

  render() {
    const { active, visible, renderNode, onClick } = this.props;
    return (
      <Portal visible={visible} renderNode={renderNode}>
        <div
          className={cn('md-overlay md-overlay--drawer md-pointer--hover', {
            'md-overlay--active': active,
          })}
          onClick={onClick}
        />
      </Portal>
    );
  }
}
