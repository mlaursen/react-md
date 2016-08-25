import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import PanelControls from './PanelControls';
import Divider from '../Dividers';

/**
 * The `PanelContent` component is for displaying the expanded content
 * for an `ExpansionPanel`. It wil display any children in a `md-panel-content`
 * container followed by a `Divider` and the `PanelControls` .
 */
export default class PanelContent extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
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

    return (
      <div>
        <div className={cn('md-panel-content', className)} style={style}>
          {children}
        </div>
        <Divider className="md-panel-divider" />
        <PanelControls
          onSave={onSave}
          onCancel={onCancel}
          saveType={saveType}
          saveLabel={saveLabel}
          savePrimary={savePrimary}
          saveSecondary={saveSecondary}
          cancelType={cancelType}
          cancelLabel={cancelLabel}
          cancelPrimary={cancelPrimary}
          cancelSecondary={cancelSecondary}
        />
      </div>
    );
  }
}
