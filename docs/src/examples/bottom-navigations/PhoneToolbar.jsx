import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';

import Button from 'react-md/lib/Buttons';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';

const actionLeft = <Button key="menu" icon>menu</Button>;
const kebab = <Button key="kebab" icon>more_vert</Button>;

export default class PhoneToolbar extends PureComponent {
  static propTypes = {
    inset: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    inset: false,
  };

  render() {
    const { inset } = this.props;
    let actionsRight;
    if (inset) {
      actionsRight = (
        <div className="action-area">
          <TextField placeholder="Search" block id="demoingSearch" />
          {kebab}
        </div>
      );
    } else {
      actionsRight = (
        <div className="action-area">
          <Button key="refresh" icon>refresh</Button>
          {kebab}
        </div>
      );
    }

    return (
      <Toolbar
        primary={false}
        containerClassName={classnames('demoing-toolbar', { inset })}
        actionLeft={actionLeft}
        actionsRight={actionsRight}
      />
    );
  }
}
