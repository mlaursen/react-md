import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DialogFooter from '../Dialogs/DialogFooter';

/**
 * The `PanelContent` component is for displaying the expanded content
 * for an `ExpansionPanel`. It will display any children in a `md-panel-content`
 * container followed by a `Divider` and the `PanelControls` .
 */
export default class PanelContent extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    footerStyle: PropTypes.object,
    footerClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    children: PropTypes.node,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saveProps: PropTypes.object,
    saveType: PropTypes.string,
    saveLabel: PropTypes.node.isRequired,
    savePrimary: PropTypes.bool,
    saveSecondary: PropTypes.bool,
    cancelProps: PropTypes.object,
    cancelType: PropTypes.string,
    cancelLabel: PropTypes.node.isRequired,
    cancelPrimary: PropTypes.bool,
    cancelSecondary: PropTypes.bool,
    footer: PropTypes.node,
    footerChildren: PropTypes.node,
  };

  render() {
    const {
      style,
      footerStyle,
      footerClassName,
      contentStyle,
      className,
      children,
      onSave,
      onCancel,
      saveProps,
      saveType,
      saveLabel,
      savePrimary,
      saveSecondary,
      cancelProps,
      cancelType,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
      footer,
      footerChildren,
    } = this.props;

    const actions = [{
      type: cancelType,
      label: cancelLabel,
      primary: cancelPrimary,
      secondary: cancelSecondary,
      ...cancelProps,
      onClick: onCancel,
    }, {
      type: saveType,
      label: saveLabel,
      primary: savePrimary,
      secondary: saveSecondary,
      ...saveProps,
      onClick: onSave,
    }];

    let actionFooter = null;
    if (typeof footer === 'undefined') {
      actionFooter = (
        <DialogFooter
          actions={actions}
          style={footerStyle}
          className={cn('md-divider-border md-divider-border--top', footerClassName)}
        >
          {footerChildren}
        </DialogFooter>
      );
    } else if (footer !== null) {
      actionFooter = footer;
    }

    return (
      <div style={style}>
        <div className={cn('md-panel-content', className)} style={contentStyle}>
          {children}
        </div>
        {actionFooter}
      </div>
    );
  }
}
