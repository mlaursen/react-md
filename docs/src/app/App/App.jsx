import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import { githubHref, hostPrefix, imgPrefix } from '../utils';
import * as components from '../components';
import Toolbar, { ActionArea } from 'react-md/lib/Toolbars';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import { IconButton } from 'react-md/lib/Buttons';
import Sidebar from 'react-md/lib/Sidebars';
import { List, ListItem, ListSubheader } from 'react-md/lib/Lists';
import Divider from 'react-md/lib/Dividers';
import { isMobile } from 'react-md/lib/utils';

import GettingStarted from '../GettingStarted';
import Customization from '../Customization';

import './_app.scss';
import '../Documentation/_markdown.scss';
import '../Documentation/_prop-types.scss';
import '../Documentation/_documentation.scss';

const componentLinks = Object.keys(components).map(k => {
  if(!components[k] || !components[k].name) { return; }

  const name = k.split(/(?=[A-Z])/);
  return {
    link: 'components/' + name.map(n => n.toLowerCase()).join('-'),
    label: name.join(' '),
  };
}).filter(l => !!l);

export default class App extends Component {
  constructor(props) {
    super(props);

    // Not home and not a media device
    const isOpen = props.location.pathname !== '/' && !isMobile;
    this.state = { isOpen };
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object, // from react-router
  };

  componentWillUpdate({ location }, { isOpen }) {
    const { pathname } = this.props.location;
    if(pathname === location.pathname) { return; }

    const isRoot = location.pathname === '/';
    if(!isRoot && !isOpen && !isMobile) {
      this.setState({ isOpen: true });
    } else if(isRoot && isOpen || isMobile) {
      setTimeout(() => {
        this.setState({ isOpen: false });
      }, 150);
    }
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const pathname = this.props.location.pathname;
    let pageTitle;
    switch(pathname) {
      case `/${GettingStarted.path}`:
        pageTitle = 'Getting Started';
        break;
      case `/${Customization.path}`:
        pageTitle = 'Customization';
        break;
      case '/':
        pageTitle = 'react-md';
        break;
      default:
        pageTitle = 'Components';
    }

    return (
      <div className="react-md-docs">
        <Toolbar
          primary
          fixed
          title={pageTitle}
          className="react-md-docs-toolbar"
          actionLeft={<IconButton onClick={this.toggleMenu}>menu</IconButton>}
          actionsRight={(
            <ActionArea>
              <IconButton href={githubHref} iconClassName="fa fa-github" />
            </ActionArea>
          )}
        />
        <Sidebar isOpen={this.state.isOpen} className="main-sidebar">
          <List>
            <ListItem
              component={Link}
              className={classnames({ 'active': '/' === pathname })}
              to="/"
              primaryText="Home"
              key="home-link"
              leftIcon={<FontIcon>home</FontIcon>}
            />
            <ListItem
              component={Link}
              className={classnames({ 'active': pathname === `/${GettingStarted.path}` })}
              to={`/${GettingStarted.path}`}
              primaryText="Getting Started"
              key="getting-started"
              leftIcon={<FontIcon>info_outline</FontIcon>}
            />
            <ListItem
              component={Link}
              className={classnames({ 'active': pathname === `/${Customization.path}` })}
              to={`/${Customization.path}`}
              primaryText="Customization"
              key="customization"
              leftIcon={<FontIcon>build</FontIcon>}
            />
            <Divider />
            <ListSubheader primaryText="References" />
            <ListItem
              component="a"
              primaryText="SASS Doc"
              href={`${hostPrefix}/sassdoc`}
              key="sassdoc"
              leftAvatar={<Avatar src={`${imgPrefix}/sass-icon.png`} alt="SASS Icon" />}
            />
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
            <Divider />
            <ListSubheader primaryText="Components" />
          </List>
          <List>
            {componentLinks.map(({ link, label }) => {
              return (
              <ListItem
                component={Link}
                to={`/${link}`}
                className={classnames({ 'active': `/${link}` === pathname })}
                key={link}
                primaryText={label}
              />
              );
            })}
          </List>
        </Sidebar>
        <main className={classnames({ 'active': this.state.isOpen })}>
          {React.cloneElement(this.props.children, { key: pathname })}
        </main>
      </div>
    );
  }
}
