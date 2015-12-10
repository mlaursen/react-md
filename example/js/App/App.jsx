import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { fuzzyFilter } from '../../../src/js/utils/PropUtils';
import { AppBar, IconButton, Sidebar } from '../../../src/js/index';

import { componentLinks, mainLinks, sublinks } from '../utils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isNavOpen: props.location.pathname !== '/', filteredLinks: componentLinks };
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object, // from react-router
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.location.pathname === nextProps.location.pathname) {
      return;
    }

    if(nextProps.location.pathname === '/' && nextState.isNavOpen) {
      this.setState({ isNavOpen: false });
    } else if(nextProps.location.pathname !== '/' && !nextState.isNavOpen){
      this.setState({ isNavOpen: true });
    }
  }

  toggleSidebar = () => {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  filterLinks = (e) => {
    this.setState({ filteredLinks: fuzzyFilter(componentLinks, e.target.value, 'label') });
  }

  toRouterLink = ({ link, label, ...props }) => {
    return {
      component: Link,
      className: `/${link}` === this.props.location.pathname ? 'active' : null,
      to: `/${link}`,
      primaryText: label,
      key: link || 'home-link',
      ...props,
    };
  }

  render() {
    return (
      <div className="react-md">
        <AppBar
          title="react md"
          className="react-md-app-bar"
          leftNode={<IconButton onClick={this.toggleSidebar}>menu</IconButton>}
          rightNode={<IconButton href="https://github.com/mlaursen/react-md" iconClassName="fa fa-github" />}
        />
        <Sidebar
          isOpen={this.state.isNavOpen}
          items={mainLinks.map(this.toRouterLink).concat(sublinks).concat(this.state.filteredLinks.map(this.toRouterLink))}
        />
        <main className={this.props.location.pathname === '/' ? 'react-md-home-container' : null}>
          {this.props.children}
        </main>
      </div>
    );
  }
}
