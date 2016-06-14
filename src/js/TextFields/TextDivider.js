import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * The `TextDivider` component renders the divider below the `TextField` component.
 */
export default class TextDivider extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    active: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    icon: PropTypes.bool.isRequired,
  };

  render() {
    const { lineDirection, active, error, icon } = this.props;
    const className = classnames('md-text-divider', `from-${lineDirection}`, {
      active,
      error,
      'icon-offset': icon,
    });
    return (
      <div className={className} />
    );
  }
}
