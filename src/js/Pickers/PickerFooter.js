import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FlatButton from '../Buttons/FlatButton';

/**
 * The `PickerFooter` component is a dialog footer for the `Picker` components.
 * It renders an ok and cancel button.
 */
export default class PickerFooter extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    okLabel: PropTypes.string.isRequired,
    okPrimary: PropTypes.bool.isRequired,
    onOkClick: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    cancelPrimary: PropTypes.bool.isRequired,
    onCancelClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      className,
      okLabel,
      okPrimary,
      onOkClick,
      cancelLabel,
      cancelPrimary,
      onCancelClick,
    } = this.props;

    return (
      <footer className={classnames('md-dialog-footer', className)}>
        <FlatButton
          primary={cancelPrimary}
          secondary={!cancelPrimary}
          label={cancelLabel}
          onClick={onCancelClick}
        />
        <FlatButton
          primary={okPrimary}
          secondary={!okPrimary}
          label={okLabel}
          onClick={onOkClick}
        />
      </footer>
    );
  }
}
