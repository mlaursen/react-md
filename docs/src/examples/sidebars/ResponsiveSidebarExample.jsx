import React, { PureComponent } from 'react';
import Sidebar from 'react-md/lib/Sidebars';

import './_sidebar-responsive.scss';
import FullPageDemo from 'components/FullPageDemo';
import InboxHeader from './InboxHeader';
import InboxList from './InboxList';
import InboxContent from './InboxContent';

export default class ResponsiveSidebarExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  _toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  _close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <FullPageDemo title="Responsive Sidebar" onClick={this._toggle}>
        <Sidebar
          isOpen={isOpen}
          onOverlayClick={this._close}
          className="list-dialog-fix"
          header={<InboxHeader />}
        >
          <InboxList />
        </Sidebar>
        <InboxContent isOpen={isOpen} />
      </FullPageDemo>
    );
  }
}
