import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import FlatButton from '../Buttons/FlatButton';

/**
 * The `PanelControls` component is used for rendering the two buttons
 * below the expanded content for the panel.
 */
export default class PanelControls extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saveLabel: PropTypes.string.isRequired,
    savePrimary: PropTypes.bool,
    saveSecondary: PropTypes.bool,
    saveType: PropTypes.string,
    cancelLabel: PropTypes.string.isRequired,
    cancelPrimary: PropTypes.bool,
    cancelSecondary: PropTypes.bool,
    cancelType: PropTypes.string,
  };

  render() {
    const {
      className,
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
      <div className={cn('md-panel-controls', className)}>
        <FlatButton
          type={cancelType}
          label={cancelLabel}
          onClick={onCancel}
          primary={cancelPrimary}
          secondary={cancelSecondary}
        />
        <FlatButton
          type={saveType}
          label={saveLabel}
          onClick={onSave}
          primary={savePrimary}
          secondary={saveSecondary}
        />
      </div>
    );
  }
}
