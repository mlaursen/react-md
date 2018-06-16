import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Route } from 'react-router-dom';
import { Avatar, FontIcon, ListItem } from 'react-md';

import { routeRef, scrollIntoView } from './scrollIntoView';

const Link = ({ label, to, exact, icon, href, avatar, routes }) => (
  <Route path={to} exact={exact} ref={routeRef}>
    {({ match }) => {
      let leftIcon;
      let component;
      let nestedItems;
      if (href) {
        component = 'a';
      } else if (to && !routes) {
        component = RouterLink;
      }

      if (icon) {
        leftIcon = <FontIcon>{icon}</FontIcon>;
      }

      if (avatar) {
        leftIcon = <Avatar {...avatar} iconSized />;
      }

      if (routes) {
        nestedItems = routes.map(route => <Link {...route} key={route.to || route.label} />);
      }

      const active = !!match && !href;

      return (
        <ListItem
          key={href || to}
          href={href}
          component={component}
          active={active}
          to={to}
          rel={href && 'noopener noreferrer'}
          primaryText={label}
          leftIcon={leftIcon}
          nestedItems={nestedItems}
          defaultVisible={routes && !!match}
          ref={active && !routes && scrollIntoView}
        />
      );
    }}
  </Route>
);

Link.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  exact: PropTypes.bool,
  icon: PropTypes.node,
  href: PropTypes.string,
  avatar: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  routes: PropTypes.arrayOf(PropTypes.object),
};
export default Link;
