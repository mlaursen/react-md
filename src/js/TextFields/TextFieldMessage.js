import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

/**
 * The `TextFieldMessage` component is used for rendering a help or error text message
 * under a `TextField`. It can also be used to display a counter of remaining characters.
 */
export default class TextFieldMessage extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    message: PropTypes.string,
    maxLength: PropTypes.number,
    error: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    helpOnFocus: PropTypes.bool,
    className: PropTypes.string,
  };

  render() {
    const { value, message, maxLength, error, active, helpOnFocus, className } = this.props;
    const isMessageVisible = !!message && (!helpOnFocus || active);

    return (
      <CSSTransitionGroup
        component="div"
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
        className={classnames('md-text-field-message', className, {
          error,
          'count-only': !message || !isMessageVisible,
        })}
      >
        {isMessageVisible && <span key="message">{message}</span>}
        {maxLength &&
        <span className="md-text-field-counter">
          {`${value.length} / ${maxLength}`}
        </span>
        }
      </CSSTransitionGroup>
    );
  }
}
