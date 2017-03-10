import React, { PureComponent } from 'react';
import cn from 'classnames';
import LastEditTooltip from './LastEditTooltip';

export default class LastEdit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { hover: false };
  }

  _setHover = () => {
    this.setState({ hover: true });
  };

  _setNoHover = () => {
    this.setState({ hover: false });
  };

  render() {
    const { hover } = this.state;
    return (
      <LastEditTooltip
        className={cn('last-edit', {
          'last-edit--hover': hover,
        })}
        onMouseEnter={this._setHover}
        onMouseLeave={this._setNoHover}
        tooltipDelay={300}
        tooltipLabel="Every change you make is automatically saved to the drive."
      />
    );
  }
}
