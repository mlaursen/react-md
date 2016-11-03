import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Drawer from 'react-md/lib/Drawers';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Media from 'react-md/lib/Media/Media';
import MediaOverlay from 'react-md/lib/Media/MediaOverlay';
import CardTitle from 'react-md/lib/Cards/CardTitle';

import { fetchProxy } from 'actions/fetch';

import './_mobile-drawer.scss';
import randomInt from 'utils/RandomUtils/randomInt';
import LoremIpsum from 'components/LoremIpsum';
import KebabMenu from 'components/KebabMenu';
import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import ClosePhoneSizeDemoButton from 'components/PhoneSizeDemo/ClosePhoneSizeDemoButton';

const nav = <ClosePhoneSizeDemoButton icon />;
const actions = [
  <Button key="search" icon>search</Button>,
  <Button key="windows?" icon>view_module</Button>,
];
const expandedActions = [
  <Button key="share" icon>person_add</Button>,
  <Button key="delete" icon>delete</Button>,
  <Button key="download" icon>file_download</Button>,
  <KebabMenu key="menu" />,
];
const info = <FontIcon key="info">info</FontIcon>;


export default class MobileRightDrawerExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { images: [], visible: false, stats: null };
    this._visibilityCount = 0;
    this._setRenderNode = this._setRenderNode.bind(this);
    this._fetchImages = this._fetchImages.bind(this);
    this._closeDrawer = this._closeDrawer.bind(this);
    this._openSideDisplay = this._openSideDisplay.bind(this);
    this._handleVisibility = this._handleVisibility.bind(this);
  }

  componentDidMount() {
    this._fetchImages();
  }

  _setRenderNode(renderNode) {
    if (renderNode) {
      this._renderNode = findDOMNode(renderNode).parentNode;
    }
  }

  _closeDrawer() {
    this.setState({ visible: false });
  }

  _fetchImages() {
    fetchProxy('https://unsplash.it/list')
      .then(list => {
        this.setState({ images: list.splice(randomInt({ min: 0, max: list.length - 11 }), 10) });
      });
  }

  _openSideDisplay(stats) {
    this.setState({ visible: true, stats });
  }

  _handleVisibility(visible) {
    if (this._visibilityCount < 2) {
      this._visibilityCount = this._visibilityCount + 1;
    } else {
      this.setState({ visible });
    }
  }

  render() {
    const { visible, stats } = this.state;
    const items = this.state.images.map((stats) => (
      <ListItem
        key={stats.id}
        primaryText={stats.filename}
        secondaryText={stats.author}
        leftAvatar={<Avatar src={`https://unsplash.it/40?image=${stats.id}`} alt={`${stats.author}'s image'`} />}
        rightIcon={info}
        onClick={() => {
          this._openSideDisplay(stats);
        }}
        waitForInkTransition
      />
    ));

    let drawerChildren;
    if (stats) {
      drawerChildren = [
        <Toolbar
          key="toolbar"
          colored
          nav={<Button waitForInkTransition icon onClick={this._closeDrawer}>close</Button>}
          actions={expandedActions}
          title={stats.filename}
          titleStyle={{ position: 'absolute' }}
          prominentTitle
        />,
        <Media aspectRatio="1-1" key="media">
          <img src={`https://unsplash.it/360/520/?image=${stats.id}`} role="presentation" />
          <MediaOverlay>
            <CardTitle
              title={stats.author}
              subtitle={stats.post_url}
            />
          </MediaOverlay>
        </Media>,
        <LoremIpsum key="lorem" style={{ padding: 16 }} />,
      ];
    }

    return (
      <PhoneSizeDemo toolbar={false}>
        <Toolbar
          title={[
            <span key="woop" className="hacked-title">Photos &gt;</span>,
            'Beach',
          ]}
          titleStyle={{ marginLeft: 0, height: 56 }}
          colored
          prominentTitle
          nav={nav}
          actions={actions}
          className="md-toolbar--fixed-phone"
          fixed
          ref={this._setRenderNode}
        />
        <Drawer
          position="right"
          onVisibilityToggle={this._handleVisibility}
          visible={visible}
          renderNode={this._renderNode}
        >
          {drawerChildren}
        </Drawer>
        <Button floating fixed fixedPosition="tl" secondary mini>add</Button>
        <List className="md-toolbar-relative--prominent">
          {items}
        </List>
      </PhoneSizeDemo>
    );
  }
}
