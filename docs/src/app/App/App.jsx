import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import classnames from 'classnames';
import Toolbar, { ActionArea } from 'react-md/lib/Toolbars';
import { IconButton } from 'react-md/lib/Buttons';
import { isMobile } from 'react-md/lib/utils';

import './_app.scss';
import '../Documentation/_markdown.scss';
import '../Documentation/_prop-types.scss';
import '../Documentation/_documentation.scss';
import SidebarNav from './SidebarNav';

import { githubHref } from '../utils';
import GettingStarted from '../GettingStarted';
import Customization from '../Customization';
import Typography from '../Typography';

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

  componentWillMount() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code, lang) => require('highlight.js').highlight(lang, code).value, // eslint-disable-line no-undef
    });
  }

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

  closeSidebar = () => {
    this.setState({ isOpen: false });
  };

  listItemClassName = (path) => {
    return classnames({ 'active': this.props.location.pathname === `/${path}` });
  };

  mapPathToTheme = () => {
    switch(this.props.location.pathname) {
      case `/${GettingStarted.path}`:
        return 'getting-started-theme';
      case `/${Customization.path}`:
        return 'customization-theme';
      case `/${Typography.path}`:
        return 'typography-theme';
      default:
        return null;
    }
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
      case `/${Typography.path}`:
        pageTitle = 'Typography';
        break;
      case '/':
        pageTitle = 'react-md';
        break;
      default:
        pageTitle = 'Components';
    }

    return (
      <div className={classnames('react-md-docs', this.mapPathToTheme())}>
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
        <SidebarNav
          isOpen={this.state.isOpen}
          pathname={pathname}
          closeSidebar={this.closeSidebar}
        />
        <main className={classnames({ 'md-sidebar-relative': !isMobile && this.state.isOpen && pathname !== '/' })}>
          {React.cloneElement(this.props.children, { key: pathname, marked })}
        </main>
      </div>
    );
  }
}
