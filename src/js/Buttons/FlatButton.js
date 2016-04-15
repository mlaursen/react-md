import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Button from './Button';

/**
 * Any other props such as style or event listeners will also
 * be applied to the button.
 */
export default class FlatButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * The label to display in the button.
     */
    label: PropTypes.string.isRequired,

    /**
     * An optional className to apply to the button.
     */
    className: PropTypes.string,

    /**
     * Boolean if the icon should be displayed before the label.
     */
    iconBefore: PropTypes.bool,

    /**
     * A `FontIcon` to display in the button. It can be placed before
     * or after the label.
     */
    children: PropTypes.node,

    /**
     * The button type.
     */
    type: PropTypes.string,

    /**
     * Boolean if the button should be styled with the primary color.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the button should be styled with the secondary color.
     */
    secondary: PropTypes.bool,

    /**
     * Boolean if the button is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional href to convert the button into a link button.
     */
    href: PropTypes.string,

    /**
     * An optional function to call when the button is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional label to use if you would like a tooltip to display
     * on hover or touch hold.
     */
    tooltipLabel: PropTypes.string,

    /**
     * The position that the tooltip should be displayed relative to
     * the button.
     */
    tooltipPosition: PropTypes.oneOf(['left', 'right', 'bottom', 'left']),
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
    tooltipPosition: 'bottom',
  };

  render() {
    const { className, ...props } = this.props;
    return <Button {...props} className={classnames('md-flat-btn', className)} />;
  }
}
