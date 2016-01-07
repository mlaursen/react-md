import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { githubHref, mainLinks } from '../utils';
import { AppBar, IconButton, Sidebar, List, ListItem, ListDivider } from 'react-md';

import './_app.scss';

export default class App extends Component {
  constructor(props) {
    super(props);

    // Not home and not a media device
    const isOpen = props.location.pathname !== '/' && !window.matchMedia('(max-width: 600px)').matches;
    this.state = { isOpen };
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object, // from react-router
  };

  componentWillUpdate({ location }, { isOpen }) {
    const { pathname } = this.props.location;
    if(pathname === location.pathname) { return; }

    if(location.pathname === '/' && isOpen) {
      this.setState({ isOpen: false });
    } else if(location.pathname !== '/' && !isOpen) {
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
        <Sidebar isOpen={this.state.isOpen}>
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
          </List>
        </Sidebar>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}
