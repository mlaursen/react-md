import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import { githubHref, mainLinks } from '../utils';
import * as components from '../components';
import { AppBar, IconButton, Sidebar, List, ListItem, ListDivider, ListSubheader } from 'react-md';

import './_app.scss';

const componentLinks = Object.keys(components).map(k => {
  if(!components[k] || !components[k].name) { return; }

  const name = k.split(/(?=[A-Z])/);
  return {
    link: name.map(n => n.toLowerCase()).join('-'),
    label: name.join(' '),
  };
}).filter(l => !!l);

export default class App extends Component {
  constructor(props) {
    super(props);

    // Not home and not a media device
    const isOpen = props.location.pathname !== '/' && !App.isMobile();
    this.state = { isOpen };
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object, // from react-router
  };

  static isMobile() {
    return window.matchMedia('(max-width: 600px)').matches;
  }

  componentWillUpdate({ location }, { isOpen }) {
    const { pathname } = this.props.location;
    if(pathname === location.pathname) { return; }

    const isRoot = location.pathname === '/';
    if(!isRoot && !isOpen && !App.isMobile()) {
      this.setState({ isOpen: true });
    } else if(isRoot && isOpen || App.isMobile()) {
      this.setState({ isOpen: false });
    }
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const pathname = this.props.location.pathname;
    return (
      <div className="react-md-docs">
        <AppBar
          title="react md"
          className="react-md-docs-app-bar"
          leftNode={<IconButton onClick={this.toggleMenu}>menu</IconButton>}
          rightNode={<IconButton href={githubHref} iconClassName="fa fa-github" />}
        />
        <Sidebar isOpen={this.state.isOpen} className="main-sidebar">
          <List>
            {mainLinks.map(({ link, ...props }) => (
              <ListItem
                component={Link}
                className={`/${link}` === pathname ? 'active' : null}
                to={`/${link}`}
                key={link || 'home-link'}
                {...props}
              />
            ))}
            <ListDivider />
            <ListSubheader primaryText="Components" />
          </List>
          <List className="scrollable">
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
          {this.props.children}
        </main>
      </div>
    );
  }
}
