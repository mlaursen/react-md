import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import DialogFooter from '../Dialogs/DialogFooter';

/**
 * The `PanelContent` component is for displaying the expanded content
 * for an `ExpansionPanel`. It wil display any children in a `md-panel-content`
 * container followed by a `Divider` and the `PanelControls` .
 */
export default class PanelContent extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    contentStyle: PropTypes.object,
    children: PropTypes.node,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saveType: PropTypes.string,
    saveLabel: PropTypes.string.isRequired,
    savePrimary: PropTypes.bool,
    saveSecondary: PropTypes.bool,
    cancelType: PropTypes.string,
    cancelLabel: PropTypes.string.isRequired,
    cancelPrimary: PropTypes.bool,
    cancelSecondary: PropTypes.bool,
  };

  render() {
    const {
      style,
      contentStyle,
      className,
      children,
      onSave,
      onCancel,
      saveType,
      saveLabel,
      savePrimary,
      saveSecondary,
      cancelType,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
    } = this.props;

    const actions = [{
      type: cancelType,
      label: cancelLabel,
      onClick: onCancel,
      primary: cancelPrimary,
      secondary: cancelSecondary,
    }, {
      type: saveType,
      label: saveLabel,
      onClick: onSave,
      primary: savePrimary,
      secondary: saveSecondary,
    }];

    return (
      <div style={style}>
        <div className={cn('md-panel-content', className)} style={contentStyle}>
          {children}
        </div>
        <DialogFooter actions={actions} className="md-divider-border md-divider-border--top" />
      </div>
    );
  }
}
