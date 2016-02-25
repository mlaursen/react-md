import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import { Link } from 'react-router';

import Avatar from 'react-md/lib/Avatars';
import Divider from 'react-md/lib/Dividers';
import FontIcon from 'react-md/lib/FontIcons';
import { List, ListItem, ListSubheader } from 'react-md/lib/Lists';
import Sidebar from 'react-md/lib/Sidebars';


import * as components from '../components';
import { hostPrefix, imgPrefix } from '../utils';
import GettingStarted from '../GettingStarted';
import Customization from '../Customization';
import Typography from '../Typography';

const componentLinks = Object.keys(components).map(k => {
  if(!components[k] || !components[k].name) { return; }

  const name = k.split(/(?=[A-Z])/);
  return {
    link: 'components/' + name.map(n => n.toLowerCase()).join('-'),
    label: name.join(' '),
  };
}).filter(l => !!l);

export default class SidebarNav extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    closeSidebar: PropTypes.func.isRequired,
  };

  listItemClassName = (path) => {
    return classnames({ 'active': this.props.pathname === `/${path}` });
  };

  render() {
    const { isOpen, pathname, closeSidebar } = this.props;
    const home = pathname === '/';
    return (
      <Sidebar
        isOpen={isOpen}
        fixed={home}
        overlay={home}
        responsive={!home}
        className="main-sidebar"
        onOverlayClick={closeSidebar}
      >
        <List>
          <ListItem
            component={Link}
            className={this.listItemClassName('')}
            to="/"
            primaryText="Home"
            key="home-link"
            leftIcon={<FontIcon>home</FontIcon>}
          />
          <ListItem
            component={Link}
            className={this.listItemClassName(GettingStarted.path)}
            to={`/${GettingStarted.path}`}
            primaryText="Getting Started"
            key="getting-started"
            leftIcon={<FontIcon>info_outline</FontIcon>}
          />
          <ListItem
            component={Link}
            className={this.listItemClassName(Customization.path)}
            to={`/${Customization.path}`}
            primaryText="Customization"
            key="customization"
            leftIcon={<FontIcon>build</FontIcon>}
          />
          <ListItem
            component={Link}
            className={this.listItemClassName(Typography.path)}
            to={`/${Typography.path}`}
            primaryText="Typography"
            key="typography"
            leftIcon={<FontIcon>text_fields</FontIcon>}
          />
          <ListItem
            component="a"
            primaryText="SASS Doc"
            href={`${hostPrefix}/sassdoc`}
            key="sassdoc"
            leftAvatar={<Avatar src={`${imgPrefix}/sass-icon.png`} alt="SASS Icon" />}
          />
          <Divider />
          <ListSubheader primaryText="Components" />
          {componentLinks.map(({ link, label }) => {
            return (
              <ListItem
                component={Link}
                to={`/${link}`}
                className={this.listItemClassName(link)}
                key={link}
                primaryText={label}
              />
            );
          })}
          <Divider />
          <ListSubheader primaryText="References" />
          <ListItem
            component="a"
            primaryText="React"
            href="https://facebook.github.io/react/"
            key="react"
            leftAvatar={<Avatar src="https://facebook.github.io/react/img/logo.svg" alt="React logo" />}
          />
          <ListItem
            component="a"
            primaryText="Material Design"
            href="https://www.google.com/design/spec/material-design/introduction.html"
            key="material-design"
            leftAvatar={<Avatar src="https://i.ytimg.com/vi/PAKCgvprpQ8/maxresdefault.jpg" alt="Google logo" />}
          />
        </List>
      </Sidebar>
    );
  }
}
