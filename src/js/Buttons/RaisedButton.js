import React, { PureComponent, PropTypes } from 'react';

import deprecated from '../utils/PropTypes/componentDeprecated';
import Button from './Button';

export default class RaisedButton extends PureComponent {
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

    deprecated: deprecated(
      'The behavior of the `RaisedButton` can be achieved with the `Button` component ' +
      'without the additional bundle size. Switch to the `Button` compnent and add a ' +
      'prop `raised`.'
    ),
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
  };

  render() {
    return <Button {...this.props} raised />;
  }
}
