import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { FlatButton } from '../Buttons';

export default class Toast extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    toast: PropTypes.shape({
      text: PropTypes.string.isRequired,
      action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          onClick: PropTypes.func.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ]),
    }).isRequired,
    dismiss: PropTypes.func.isRequired,
    multiline: PropTypes.bool,
  };

  render() {
    const { className, toast, dismiss, multiline, ...props } = this.props;
    const { text, action } = toast;
    let btnProps = action;
    if(typeof action === 'string') {
      btnProps = {
        label: action,
        onClick: dismiss,
      };
    }

    return (
      <section
        className={classnames('md-snackbar', className, {
          'multiline': multiline,
        })}
        {...props}
        >
        <p>{text}</p>
        {action && <FlatButton {...btnProps} />}
      </section>
    );
  }
}
