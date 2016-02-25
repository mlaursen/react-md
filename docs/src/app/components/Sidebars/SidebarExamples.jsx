import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { setOverflow } from 'react-md/lib/utils';
import Avatar from 'react-md/lib/Avatars';
import { IconButton, RaisedButton } from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';
import Sidebar from 'react-md/lib/Sidebars';

import Markdown from '../../Markdown';
import { randomImage } from '../../utils';

const markdown = `
The sidebar is responsive by default. This means that when it
matches whatever media query you have for mobile, the sidebar
will be displayed with an overlay and the sidebar will be the
top most element on the screen. If does not match the mobile
query, the sidebar will be displayed below a fixed toolbar.

The default behavior can be overridden by setting \`fixed={true} overlay={true}\`.
This will make the overlay always visible and the sidebar to always be the top most
element on the screen.

Since the sidebar is a fully controlled component, you must pass a function
that closes the sidebar to \`onOverlayClick\` if you want it to close when
the overlay is clicked.
`;

const items = Array.apply(null, new Array(4)).map((_, i) => ({
  primaryText: `Item ${i + 1}`,
  key: i,
})).concat([{
  divider: true,
  key: 'divider1',
}, {
  subheader: true,
  primaryText: 'Subheader',
  key: 'subheader1',
}]).concat(Array.apply(null, new Array(5)).map((_, i) => ({
  leftAvatar: <Avatar src={randomImage({ width: 40, time: Date.now() + i })} alt="Some random image" />,
  primaryText: `Some Avatar Item ${i + 1}`,
  key: `avatar-${i}`,
}))).concat([{
  divider: true,
  key: 'divider2',
}, {
  subheader: true,
  primaryText: 'Another Subheader',
  primary: true,
  key: 'subheader2',
}]);

export default class SidebarExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false, align: 'left' };
  }

  static propTypes = {
    marked: PropTypes.func.isRequired,
  };

  componentWillUpdate(nextProps, nextState) {
    if(this.state.isOpen === nextState.isOpen) { return; }
    setOverflow(nextState.isOpen);
  }

  toggleOpenLeft = () => {
    this.setState({ isOpen: !this.state.isOpen, align: 'left' });
  };

  toggleOpenRight = () => {
    this.setState({ isOpen: !this.state.isOpen, align: 'right' });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, align } = this.state;

    const header = (
      <Toolbar
        secondary
        actionLeft={<IconButton onClick={this.close}>arrow_back</IconButton>}
        title="Hello, World!"
      />
    );
    return (
      <div>
        <Markdown markdown={markdown} marked={this.props.marked} />
        <RaisedButton label="Toggle Fixed Sidebar" onClick={this.toggleOpenLeft} />
        <RaisedButton label="Toggle Fixed Sidebar Right" onClick={this.toggleOpenRight} />
        <Sidebar
          isOpen={isOpen}
          fixed={true}
          overlay={true}
          responsive={false}
          onOverlayClick={this.close}
          align={align}
          header={header}
          items={items}
        >
          <p className="md-body-2 sidebar-example-ipsum">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus turpis velit, vitae pretium purus feugiat nec. Nunc sed dapibus augue, in varius mi. Proin tristique quam sed cursus lacinia. Phasellus in commodo elit. Vestibulum porta nulla sit amet accumsan fringilla. Vivamus vel mattis lectus, non convallis nulla. Phasellus suscipit tincidunt enim, iaculis convallis est sollicitudin et. Suspendisse ultrices nisi sed consectetur placerat. In eget purus ac dui euismod imperdiet. Nulla at vulputate enim.</p>
          <p className="md-body-1 sidebar-example-ipsum">Phasellus pellentesque varius ipsum pellentesque euismod. Praesent convallis auctor rhoncus. In eu iaculis purus. Maecenas dapibus at nunc sit amet semper. Fusce vel eleifend eros, eu volutpat purus. Duis pharetra odio mi, et fringilla lectus fermentum sed. Quisque eros eros, pellentesque vel rhoncus id, euismod quis nisi. Nullam pellentesque massa consequat erat euismod hendrerit ut vitae est. Donec dictum magna ultrices, lobortis ex vel, consequat nisi. Praesent egestas dignissim lobortis. Vestibulum leo justo, mollis ac mi suscipit, euismod malesuada dolor. Integer tempor dictum orci at pharetra. Cras condimentum nunc est, ac tempus felis dignissim ac. Donec et ex ac sem convallis egestas. In scelerisque molestie tempus.</p>
        </Sidebar>
      </div>
    );
  }
}
