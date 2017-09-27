import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import DialogContainer from 'react-md/lib/Dialogs';
import Toolbar from 'react-md/lib/Toolbars';

import ControlledFixedTablePagination from './ControlledFixedTablePagination';

export default class FixedTablePaginationDemo extends PureComponent {
  state = { visible: false };
  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button raised primary onClick={this.show}>Open the demo</Button>
        <DialogContainer
          id="demo-dialog"
          visible={visible}
          fullPage
          closeOnEsc={false}
          aria-labelledby="demo-title"
          className="data-tables__fixed-example"
        >
          <Toolbar
            id="demo-toolbar"
            themed
            nav={<Button onClick={this.hide} icon>arrow_back</Button>}
            title="Fixed Table Pagination"
            titleId="demo-title"
            zDepth={2}
          />
          <ControlledFixedTablePagination />
        </DialogContainer>
      </div>
    );
  }
}
