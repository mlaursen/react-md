import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import AccessibleFakeButton from '../Helpers/AccessibleFakeButton';
import Layover from '../Helpers/Layover';
import Dialog from '../Dialogs/Dialog';

export default class EditDialog extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    textFieldId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    dialogStyle: PropTypes.object,
    dialogClassName: PropTypes.string,
    dialogContentStyle: PropTypes.object,
    dialogContentClassName: PropTypes.string,
    children: PropTypes.node,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    placeholder: PropTypes.bool,
    title: PropTypes.node,
    large: PropTypes.bool,
    actions: Dialog.propTypes.actions,
    dialogZDepth: PropTypes.number,
  };

  render() {
    const {
      id,
      dialogStyle,
      dialogClassName,
      dialogContentStyle,
      dialogContentClassName,
      textFieldId,
      visible,
      onOpen,
      children,
      label,
      title,
      large,
      actions,
      placeholder,
      dialogZDepth,
      ...props
    } = this.props;

    const field = (
      <AccessibleFakeButton
        className={cn('md-edit-dialog__label', {
          'md-text--secondary': placeholder,
        })}
        noFocusOutline={visible}
        onClick={onOpen}
        onFocus={onOpen}
      >
        {label}
      </AccessibleFakeButton>
    );

    return (
      <Layover
        {...props}
        id={`${id}-layover`}
        toggle={field}
        visible={visible}
        block
      >
        <Dialog
          id={id}
          aria-labelledby={!large ? textFieldId : undefined}
          style={dialogStyle}
          className={cn('md-background md-edit-dialog', dialogClassName)}
          contentStyle={dialogContentStyle}
          contentClassName={cn('md-edit-dialog__content', dialogContentClassName)}
          title={large ? title : null}
          focusOnMount
          containFocus={large}
          paddedContent={false}
          actions={large ? actions : null}
          zDepth={dialogZDepth}
        >
          {children}
        </Dialog>
      </Layover>
    );
  }
}
