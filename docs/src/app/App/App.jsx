import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import classnames from 'classnames';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Divider from 'react-md/lib/Dividers';
import { ListItem, ListSubheader } from 'react-md/lib/Lists';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';

import './_app.scss';
import '../Documentation/_markdown.scss';
import '../Documentation/_prop-types.scss';
import '../Documentation/_documentation.scss';

import GettingStarted from '../GettingStarted';
import Customization from '../Customization';
import Typography from '../Typography';
import { hostPrefix, imgPrefix, toDashedName, toTitle } from '../utils';

import * as components from '../components';
const componentLinks = Object.keys(components).map(k => {
  if(!components[k] || !components[k].name) { return; }

  return {
    to: 'components/' + toDashedName(k),
    primaryText: toTitle(k),
  };
}).filter(l => !!l);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
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

  openDrawer = () => {
    this.setState({ isOpen: true });
  };

  closeDrawer = () => {
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

  mapToListItem = ({ icon, to, leftIcon, leftAvatar, component, subheader, divider, ...props }, i) => {
    if(divider) {
      return <Divider key={i} />;
    } else if(subheader) {
      return <ListSubheader {...props} key={i} />;
    }

    const pathname = this.props.location.pathname;
    const home = pathname === '/';
    const isHomeLink = to === '';
    // can't use activeClassName because doesn't update correctly with PureRenderMixin
    let className;
    if((isHomeLink && home) || (!isHomeLink && !home && pathname.indexOf(to) !== -1)) {
      className = 'active';
    }

    let left;
    if(icon) {
      left = <FontIcon>{icon}</FontIcon>;
    } else if(leftAvatar) {
      left = <Avatar {...leftAvatar} className="fake-icon" />;
    }
    return (
      <ListItem
        {...props}
        key={i}
        to={`/${to}`}
        component={component || Link}
        className={className}
        leftIcon={left}
      />
    );
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
        break;
      default:
        pageTitle = 'Components';
    }

    const navItems = [{
      to: '',
      primaryText: 'Home',
      icon: 'home',
    }, {
      to: GettingStarted.path,
      primaryText: 'Getting Started',
      icon: 'info_outline',
    }, {
      to: Customization.path,
      primaryText: 'Customization',
      icon: 'color_lens',
    }, {
      to: Typography.path,
      primaryText: 'Typography',
      icon: 'text_fields',
    }, {
      component: 'a',
      primaryText: 'SASS Doc',
      href: `${hostPrefix}/sassdoc`,
      leftAvatar: { src: `${imgPrefix}/sass-icon.png`, alt: 'SASS icon' },
    }, {
      component: 'div',
      primaryText: 'Components',
      initiallyOpen: pathname.indexOf('components') !== -1,
      nestedItems: componentLinks.map(this.mapToListItem),
      icon: 'build',
    }, { divider: true }, {
      subheader: true,
      primaryText: 'References',
    }, {
      component: 'a',
      primaryText: 'React',
      href: 'https://facebook.github.io/react/',
      leftAvatar: { src: 'https://facebook.github.io/react/img/logo.svg', alt: 'React logo' },
    }, {
      component: 'a',
      primaryText: 'Material Design',
      href: 'https://www.google.com/design/spec/material-design/introduction.html',
      leftAvatar: { src: 'https://i.ytimg.com/vi/PAKCgvprpQ8/maxresdefault.jpg', alt: 'Google logo' },
    }, {
      component: 'a',
      primaryText: 'Material Icons',
      href: 'https://design.google.com/icons/',
      leftAvatar: { src: 'https://i.ytimg.com/vi/PAKCgvprpQ8/maxresdefault.jpg', alt: 'Google logo' },
    }].map(this.mapToListItem);

    return (
      <NavigationDrawer
        className={classnames('react-md-docs', this.mapPathToTheme())}
        title="react-md"
        toolbarTitle={pageTitle}
        isOpen={this.state.isOpen}
        navItems={navItems}
        openDrawer={this.openDrawer}
        closeDrawer={this.closeDrawer}
      >
        <main>
          {React.cloneElement(this.props.children, { key: pathname, marked })}
        </main>
      </NavigationDrawer>
    );
  }
}
